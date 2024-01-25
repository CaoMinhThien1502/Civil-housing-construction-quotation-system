package com.example.system.serviceImplement;

import com.example.system.dto.combodto.ComboResponseDto;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.combo.ComboDetail;
import com.example.system.model.combo.Material;
import com.example.system.model.combo.MaterialType;
import com.example.system.repository.combo.ComboDetailRepository;
import com.example.system.service.combobuilding.ComboBuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ComboBuildingServiceImp implements ComboBuildingService {
    private final ComboDetailRepository comboDetailRepository;
    @Override
    public List<ComboResponseDto> getListCombo() {
        List<ComboResponseDto> listComboResponse = new ArrayList<>();

        Set<ComboBuilding> comboBuildingList = new HashSet<>();
        List<Material> materialOfCombo = new ArrayList<>();


        List<ComboDetail> detailList = comboDetailRepository.findAll();
        for (ComboDetail c: detailList) {
            comboBuildingList.add(c.getComboBuilding());
        }
        for (ComboBuilding c:comboBuildingList) {
            ComboResponseDto comboResponseDto = new ComboResponseDto();
            comboResponseDto.setComboBuildingName(c.getComboBuildingName());
            comboResponseDto.setUnitPrice(c.getUnitPrice());
            comboResponseDto.setStatus(c.getStatus());
            List<ComboDetail> findMaterialByCombo = comboDetailRepository.findByComboBuilding(c);
            if (!findMaterialByCombo.isEmpty()) {
                for (ComboDetail comboDetail : findMaterialByCombo) {
                    materialOfCombo.add(comboDetail.getMaterial());
                }
            }
            comboResponseDto.setMaterialList(materialOfCombo);
            listComboResponse.add(comboResponseDto);
        }
        return listComboResponse;
    }
}
