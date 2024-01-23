package com.example.system.service.combobuilding;

import com.example.system.model.combo.Material;

import java.util.List;

public interface MaterialService {
    List<Material> getListMaterial();

    boolean createMaterial(Material material);

    boolean updateMaterial(Long materialId, Material material);
}
