package com.example.system.serviceImplement;

import com.example.system.dto.combodto.ComboRequestDto;
import com.example.system.dto.combodto.ComboResponseDto;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.combo.ComboDetail;
import com.example.system.model.combo.Material;
import com.example.system.repository.combo.ComboBuildingRepository;
import com.example.system.repository.combo.ComboDetailRepository;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.service.combobuilding.ComboDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComboDetailServiceImp implements ComboDetailService {
    private final MaterialRepository materialRepository;
    private final ComboDetailRepository comboDetailRepository;
    private final ComboBuildingRepository comboBuildingRepository;

    @Override
    public boolean createComboDetail(ComboBuilding newComboBuilding, ComboRequestDto comboRequestDto) {
        try {
            ComboDetail newComboDetail;
            if (newComboBuilding != null) {
                for (String materialId : comboRequestDto.getMaterialIdList()) {
                    Material material = materialRepository.findById(Long.valueOf(materialId))
                            .orElseThrow(
                                    () -> new IllegalStateException("material with id " + materialId + " does not exists"));
                    newComboDetail = new ComboDetail();
                    newComboDetail.setComboBuilding(newComboBuilding);
                    newComboDetail.setMaterial(material);
                    comboDetailRepository.save(newComboDetail);
                }
                Long price = comboDetailRepository.calculateTotalUnitPriceByComboBuilding(newComboBuilding);
                newComboBuilding.setUnitPrice(price);
                comboBuildingRepository.save(newComboBuilding);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateComboDetail(String comboBuildingName, ComboRequestDto comboRequestDto) {
        try {

            List<ComboDetail> oldComboDetail = comboDetailRepository.findAllByComboBuildingName(comboBuildingName);
            comboDetailRepository.deleteAll(oldComboDetail);
            ComboBuilding comboBuilding = comboBuildingRepository.findByComboBuildingName(comboBuildingName);
            //update list material for combo
            ComboDetail updateComboDetail;
            for (String materialId : comboRequestDto.getMaterialIdList()) {
                Material material = materialRepository.findById(Long.valueOf(materialId))
                        .orElseThrow(
                                () -> new IllegalStateException("material with id " + materialId + " does not exists"));
                updateComboDetail = new ComboDetail();
                updateComboDetail.setComboBuilding(comboBuilding);
                updateComboDetail.setMaterial(material);
                comboDetailRepository.save(updateComboDetail);
            }
            //update combobuilding
            Long price = comboDetailRepository.calculateTotalUnitPriceByComboBuilding(comboBuilding);
            comboBuilding.setUnitPrice(price);
            comboBuilding.setComboBuildingName(comboRequestDto.getComboBuildingName());
            comboBuilding.setStatus(comboRequestDto.isStatus());
            comboBuilding.setType(comboRequestDto.getType());
            comboBuildingRepository.save(comboBuilding);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public ComboResponseDto getComboDetailById(String comboBuildingName) {
        ComboResponseDto comboResponseDto = new ComboResponseDto();
        ComboBuilding comboBuilding = comboBuildingRepository.findByComboBuildingName(comboBuildingName);
        comboResponseDto.setComboBuildingName(comboBuilding.getComboBuildingName());
        comboResponseDto.setType(comboBuilding.getType());
        comboResponseDto.setUnitPrice(comboBuilding.getUnitPrice());
        comboResponseDto.setStatus(comboBuilding.isStatus());
        List<ComboDetail> comboDetailList = comboDetailRepository.findAllByComboBuildingName(comboBuildingName);
        List<Material> materialList = new ArrayList<>();
        for (ComboDetail c : comboDetailList) {
            materialList.add(c.getMaterial());
        }
        comboResponseDto.setMaterialList(materialList);
        return comboResponseDto;
    }
}
