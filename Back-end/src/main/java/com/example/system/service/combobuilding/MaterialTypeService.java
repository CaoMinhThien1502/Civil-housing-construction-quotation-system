package com.example.system.service.combobuilding;

import com.example.system.model.combo.MaterialType;

import java.util.List;

public interface MaterialTypeService {
    List<MaterialType> getListMaterialType();

    MaterialType createMaterialType(MaterialType materialType);

    boolean updateMaterialType(Long materialTypeId, MaterialType materialType);
}
