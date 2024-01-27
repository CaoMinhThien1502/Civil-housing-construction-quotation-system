package com.example.system.controller;


import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import com.example.system.repository.building.ItemRepository;
import com.example.system.service.building.BuildingDetailService;
import com.example.system.service.building.BuildingService;
import com.example.system.service.building.ItemService;
import com.example.system.service.building.ItemTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/building")
@RequiredArgsConstructor
public class BuildingController{
    @Autowired
    ItemTypeService itemTypeService;

    @Autowired
    ItemService itemService;

    @Autowired
    BuildingService  buildingService;

    @Autowired
    BuildingDetailService buildingDetailService;


    //Item Type Controller
    @GetMapping("/item-type/list")
    public ResponseEntity<List<ItemType>> getItemtypes(){
        List<ItemType> itemTypes = itemTypeService.findAll();
        return ResponseEntity.ok(itemTypes);
    }
    @PostMapping("/item-type/create")
    public ResponseEntity<ItemType> createItemtype(@RequestBody ItemType itemType){
        ItemType newItemType = itemTypeService.createItemType(itemType);
        return ResponseEntity.ok(newItemType);
    }
    @PutMapping("/item-type/update")
    public ResponseEntity<ItemType> updateItemtype(@RequestParam Long itemTypeId, @RequestBody ItemType itemType){
        ItemType updateItemType = itemTypeService.updateItemType(itemType);
        return ResponseEntity.ok(updateItemType);
    }

    //ItemController
    @GetMapping("/item/list")
    public ResponseEntity<List<Item>> getItems(){
        List<Item> items = itemService.findALl();
        return ResponseEntity.ok(items);
    }
    @PostMapping("/item/create")
    public ResponseEntity<Item> createItem(@RequestParam Long itemTypeId,@RequestBody Item item){
        Item newItem = itemService.createItem(itemTypeId,item);
        return ResponseEntity.ok(newItem);
    }
    @PutMapping("/item/update")
    public ResponseEntity<Item> updateItemtype(@RequestParam Long itemId, @RequestParam Long itemTypeId, @RequestBody Item item){
        Item updateItem = itemService.updateItem(itemId, itemTypeId, item);
        return ResponseEntity.ok(updateItem);
    }

    //Building Controller
    @GetMapping("/building/list")
    public ResponseEntity<List<Building>> getBuildings(){
        List<Building> buildings = buildingService.findAll();
        return ResponseEntity.ok(buildings);
    }

    @PostMapping("/building/create")
    public ResponseEntity<BuildingDto> createBuilding(@RequestBody BuildingDto buildingDto){
        Building newBuilding = new Building();
        newBuilding.setWidth(buildingDto.getWidth());
        newBuilding.setLength(buildingDto.getLength());
        newBuilding.setStatus(-1);
        buildingService.createBuilding(newBuilding);
        for (Long id: buildingDto.getItemIdList()){
            Item item = itemService.findByItemId(id);
            if(item == null) return ResponseEntity.ok(null);
            buildingDetailService.createBuildingDetail(newBuilding,item);
        }
        return ResponseEntity.ok(buildingDto);
    }

    @PutMapping("/building/update")
    public ResponseEntity<Building> updateBuilding(@RequestParam Long buildingId, @RequestBody BuildingDto buildingDto){
        Building inputBuilding = new Building();
        inputBuilding.setStatus(buildingDto.getStatus());
        inputBuilding.setWidth(buildingDto.getWidth());
        inputBuilding.setLength(buildingDto.getLength());
        buildingService.updateBuilding(buildingId, inputBuilding);
        buildingDetailService.updateBuildingDetail(buildingId, buildingDto.getItemIdList());
        Building updateBuilding = buildingService.updateBuilding(buildingId, inputBuilding);
        return ResponseEntity.ok(updateBuilding);
    }

    //Building Detail Controller
    @GetMapping("/building-detail/list")
    public ResponseEntity<List<BuildingDetail>> getBuildingDetails(){
        List<BuildingDetail> buildingDetails = buildingDetailService.findAll();
        return ResponseEntity.ok(buildingDetails);
    }


//    @PostMapping("/building-detail/create")
//    public ResponseEntity<BuildingDetail> createBuildingDetail(@RequestBody BuildingDetail buildingDetail){
//        BuildingDetail newBuildingDetail = buildingDetailService.createBuildingDetail(buildingDetail);
//        return ResponseEntity.ok(newBuildingDetail);
//    }
//
//    @PutMapping("/building-detail/update")
//    public ResponseEntity<BuildingDetail> updateItemtype(@RequestParam Long BuildingDetailId, @RequestBody BuildingDetail buildingDetail) {
//        BuildingDetail updateBuildingDetail = buildingDetailService.updateBuildingDetail(buildingDetail);
//        return ResponseEntity.ok(updateBuildingDetail);
//    }
    //BuildingDetailDto
    @GetMapping("/buildingDetailDto/list")
    public ResponseEntity<?> getBuildingDetailDto(){
        List<BuildingDetailDto> buildingDetailDtos = buildingService.findAllBD();
        return ResponseEntity.ok(buildingDetailDtos);
    }
}
