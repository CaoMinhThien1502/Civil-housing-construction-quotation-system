package com.example.system.controller;
import com.example.system.model.combo.MaterialType;
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

    @GetMapping("/material-type/get")
    public ResponseEntity<List<MaterialType>> getMaterialType(){
        List<MaterialType> list = materialTypeService.getListMaterialType();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/material-type/create")
    public ResponseEntity<MaterialType> createMaterialType(@RequestBody MaterialType materialType){
        MaterialType newMaterialType = materialTypeService.createMaterialType(materialType);
        return ResponseEntity.ok(newMaterialType);
    }
    @PutMapping("/material-type/update")
    public ResponseEntity<?> updateMaterialType(@RequestParam Long materialTypeId, @RequestBody MaterialType materialType){
        boolean checkupdate = materialTypeService.updateMaterialType(materialTypeId, materialType);
        return ResponseEntity.ok(checkupdate);
    }
}
