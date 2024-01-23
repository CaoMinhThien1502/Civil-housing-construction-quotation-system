package com.example.system.controller;
import com.example.system.model.combo.Material;
import com.example.system.model.combo.MaterialType;
import com.example.system.service.combobuilding.MaterialService;
import com.example.system.service.combobuilding.MaterialTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/combobuilding")
@RequiredArgsConstructor
public class ComboBuildingController {
    private final MaterialTypeService materialTypeService;
    private final MaterialService materialService;


    // -------Material Type controller-------
    @GetMapping("/material-type/get")
    public ResponseEntity<List<MaterialType>> getMaterialType(){
        List<MaterialType> list = materialTypeService.getListMaterialType();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/material-type/create")
    public ResponseEntity<?> createMaterialType(@RequestBody MaterialType materialType){
        boolean newMaterialType = materialTypeService.createMaterialType(materialType);
        return ResponseEntity.ok(newMaterialType);
    }
    @PutMapping("/material-type/update")
    public ResponseEntity<?> updateMaterialType(@RequestParam Long materialTypeId, @RequestBody MaterialType materialType){
        boolean checkUpdate = materialTypeService.updateMaterialType(materialTypeId, materialType);
        return ResponseEntity.ok(checkUpdate);
    }
    // ------Material controller------
    @GetMapping("/material/get")
    public ResponseEntity<List<Material>> getMaterial(){
        List<Material> list = materialService.getListMaterial();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/material/create")
    public ResponseEntity<?> createMaterial(@RequestBody Material material){
        boolean newMaterial = materialService.createMaterial(material);
        return ResponseEntity.ok(newMaterial);
    }
    @PutMapping("/material/update")
    public ResponseEntity<?> updateMaterial(@RequestParam Long materialId, @RequestBody Material material){
        boolean checkUpdate = materialService.updateMaterial(materialId, material);
        return ResponseEntity.ok(checkUpdate);
    }
}
