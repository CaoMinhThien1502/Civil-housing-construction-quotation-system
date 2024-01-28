package com.example.system.controller;
import com.example.system.dto.combodto.ComboRequestDto;
import com.example.system.dto.combodto.ComboResponseDto;
import com.example.system.dto.combodto.MaterialDto;
import com.example.system.dto.combodto.MaterialTypeDto;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.combo.Material;
import com.example.system.model.combo.MaterialType;
import com.example.system.service.combobuilding.ComboBuildingService;
import com.example.system.service.combobuilding.ComboDetailService;
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
    private final ComboBuildingService comboBuildingService;
    private final ComboDetailService comboDetailService;


    // -------Material Type controller-------
    @GetMapping("/material-type/get")
    public ResponseEntity<List<MaterialType>> getMaterialType(){
        List<MaterialType> list = materialTypeService.getListMaterialType();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/material-type/getbyid")
    public ResponseEntity<MaterialType> getMaterialTypeById(@RequestParam Long materialTypeId){
        MaterialType materialType = materialTypeService.getMaterialTypeById(materialTypeId);
        return ResponseEntity.ok(materialType);
    }
    @PostMapping("/material-type/create")
    public ResponseEntity<?> createMaterialType(@RequestBody MaterialTypeDto materialType){
        boolean newMaterialType = materialTypeService.createMaterialType(materialType);
        return ResponseEntity.ok(newMaterialType);
    }
    @PutMapping("/material-type/update")
    public ResponseEntity<?> updateMaterialType(@RequestParam Long materialTypeId, @RequestBody MaterialTypeDto materialType){
        boolean checkUpdate = materialTypeService.updateMaterialType(materialTypeId, materialType);
        return ResponseEntity.ok(checkUpdate);
    }
    // ------Material controller------
    @GetMapping("/material/get")
    public ResponseEntity<List<Material>> getMaterial(){
        List<Material> list = materialService.getListMaterial();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/material/getByMaterialType")
    public ResponseEntity<List<Material>> getMaterialByType(@RequestParam Long materialTypeId){
        List<Material> list = materialService.getListMaterialByTypeId(materialTypeId);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/material/create")
    public ResponseEntity<?> createMaterial(@RequestParam Long materialTypeId, @RequestBody MaterialDto material){
        boolean newMaterial = materialService.createMaterial(materialTypeId, material);
        return ResponseEntity.ok(newMaterial);
    }
    @PutMapping("/material/update")
    public ResponseEntity<?> updateMaterial(@RequestParam Long materialId, @RequestBody MaterialDto material){
        boolean checkUpdate = materialService.updateMaterial(materialId, material);
        return ResponseEntity.ok(checkUpdate);
    }
    // ------Combo Building------
    @GetMapping("/combo-building/get")
    public ResponseEntity<?> getComboBuilding(){
        List<ComboBuilding> comboBuildingList = comboBuildingService.getListComboBuilding();
        return ResponseEntity.ok(comboBuildingList);
    }

    // ------Combo controller------
    @GetMapping("/combo/get")
    public ResponseEntity<?> getCombo(){
        List<ComboResponseDto> comboResponseDtoList = comboBuildingService.getListCombo();
        return ResponseEntity.ok(comboResponseDtoList);
    }
    @PostMapping("/combo/create")
    public ResponseEntity<?> createCombo(@RequestBody ComboRequestDto comboRequestDto){
        ComboBuilding newComboBuilding = comboBuildingService.createComboBuilding(comboRequestDto);
        boolean newComboDetail = comboDetailService.createComboDetail(newComboBuilding, comboRequestDto);
        return ResponseEntity.ok(newComboDetail);
    }
    @PutMapping("/combo/update")
    public ResponseEntity<?> updateCombo(@RequestParam String comboBuildingName, @RequestBody ComboRequestDto comboRequestDto){
        boolean updateCombo = comboDetailService.updateComboDetail(comboBuildingName, comboRequestDto);
        return ResponseEntity.ok(updateCombo);
    }
}
