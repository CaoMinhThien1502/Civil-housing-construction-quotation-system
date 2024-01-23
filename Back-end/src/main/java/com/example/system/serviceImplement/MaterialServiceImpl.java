package com.example.system.serviceImplement;

import com.example.system.model.combo.Material;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.service.combobuilding.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    private final MaterialRepository materialRepository;
    @Override
    public List<Material> getListMaterial() {
        return materialRepository.findAll();
    }

    @Override
    public boolean createMaterial(Material material) {
        return false;
    }

    @Override
    public boolean updateMaterial(Long materialId, Material material) {
        return false;
    }
}
