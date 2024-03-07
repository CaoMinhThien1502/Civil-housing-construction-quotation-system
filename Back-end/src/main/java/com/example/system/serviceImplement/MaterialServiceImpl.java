package com.example.system.serviceImplement;

import com.example.system.dto.combodto.MaterialDto;
import com.example.system.model.combo.Material;
import com.example.system.model.combo.MaterialType;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.repository.combo.MaterialTypeRepository;
import com.example.system.service.combobuilding.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    private final MaterialRepository materialRepository;
    private final MaterialTypeRepository materialTypeRepository;
    @Override
    public List<MaterialDto> getListMaterial() {
        List<Material> materials = materialRepository.findAll();
        MaterialDto materialDto;
        List<MaterialDto> materialDtos = new ArrayList<>();
        for (Material m:materials) {
            materialDto = new MaterialDto();
            materialDto.setMaterialId(m.getMaterialId());
            materialDto.setMaterialName(m.getMaterialName());
            materialDto.setUnitPrice(m.getUnitPrice());
            materialDto.setMaterialTypeName(m.getMaterialType().getTypeName());
            materialDto.setStatus(m.isStatus());
            materialDtos.add(materialDto);
        }
        return materialDtos;
    }

    @Override
    public Material getById(Long materialId) {
        return materialRepository.findByMaterialId(materialId);
    }

    @Override
    public List<Material> getListMaterialByTypeId(Long materialTypeId) {
        return materialRepository.findAllByMaterialType(materialTypeId);
    }

    @Override
    public boolean createMaterial(Long materialTypeId, MaterialDto material) {
        try{
            MaterialType materialType = materialTypeRepository.findById(materialTypeId)
                    .orElseThrow(
                            () -> new IllegalStateException("Material Type with id " + materialTypeId + " does not exists"));
            Material newMaterial = new Material();
            newMaterial.setMaterialName(material.getMaterialName());
            newMaterial.setMaterialType(materialType);
            newMaterial.setUnitPrice(material.getUnitPrice());
            newMaterial.setStatus(true);
            materialRepository.save(newMaterial);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateMaterial(Long materialId, MaterialDto material) {
        try{
            Material updateMaterial = materialRepository.findById(materialId)
                    .orElseThrow(() -> new IllegalStateException("Material with id " + materialId + " does not exists"));
            updateMaterial.setMaterialName(material.getMaterialName());
            updateMaterial.setUnitPrice(material.getUnitPrice());
            updateMaterial.setStatus(material.isStatus());
            materialRepository.save(updateMaterial);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean disableMaterial(Long materialId) {
        try{
            Material disable = materialRepository.findById(materialId)
                    .orElseThrow(() -> new IllegalStateException("Material with id " + materialId + " does not exists"));
            disable.setStatus(false);
            materialRepository.save(disable);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }


}
