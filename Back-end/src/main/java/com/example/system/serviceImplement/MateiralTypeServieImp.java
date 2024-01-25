package com.example.system.serviceImplement;

import com.example.system.dto.combodto.MaterialTypeDto;
import com.example.system.model.combo.MaterialType;
import com.example.system.repository.combo.MaterialTypeRepository;
import com.example.system.service.combobuilding.MaterialTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MateiralTypeServieImp implements MaterialTypeService {
    private final MaterialTypeRepository materialTypeRepository;
    @Override
    public List<MaterialType> getListMaterialType() {
        return materialTypeRepository.findAll();
    }

    @Override
    public boolean createMaterialType(MaterialTypeDto materialType) {
        try {
            MaterialType newMaterialType = new MaterialType();
            newMaterialType.setTypeName(materialType.getTypeName());
            materialTypeRepository.save(newMaterialType);
            return true;
        } catch (Exception e) {
            //e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateMaterialType(Long materialTypeId, MaterialTypeDto materialType) {
        try {
            MaterialType materialTypeUpdate = materialTypeRepository.findById(materialTypeId)
                    .orElseThrow(
                            () -> new IllegalStateException("student with id " + materialTypeId + " does not exists"));
            materialTypeUpdate.setTypeName(materialType.getTypeName());
            materialTypeRepository.save(materialTypeUpdate);
            return true;
        }catch (Exception e) {
            //e.printStackTrace();
            return false;
        }
    }
}
