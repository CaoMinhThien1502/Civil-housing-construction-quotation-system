package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.*;
import com.example.system.dto.buildingdto.itemdto.ItemDto;
import com.example.system.dto.buildingdto.itemtypedto.ItemTypeFCDto;
import com.example.system.dto.combodto.ComboFormConsultantDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.building.ItemTypeRepository;
import com.example.system.repository.combo.ComboBuildingRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.building.BuildingDetailService;
import com.example.system.service.building.BuildingService;
import com.example.system.service.building.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BuildingServiceImp implements BuildingService {

    @Autowired
    ComboBuildingRepository comboRepository;
    @Autowired
    BuildingRepository buildingRepository;
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    ItemService itemService;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    ItemTypeRepository itemTypeRepository;
    @Autowired
    BuildingDetailService buildingDetailService;
    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Override
    public List<Building> findAll() {
        return buildingRepository.findAll();
    }

    @Override
    public Building findByBuildingId(Long id) {
        return buildingRepository.findByBuildingId(id);
    }

    @Override
    public List<BuildingDto> findBuildingDtos() {
        List<BuildingDto> buildingDtos = new ArrayList<>();
        for (Building b: buildingRepository.findAll()) {
            buildingDtos.add(findByBuilding(b));
        }
        return buildingDtos;
    }

    @Override
    public BuildingDto findByBuilding(Building b) {
        BuildingDto dto = new BuildingDto();
        dto.setStatus(b.getStatus());
        dto.setArea(b.getArea());
        List<Long> ids = new ArrayList<>();
        for (Item i: itemService.findByBuilding(b)){
            ids.add(i.getItemId());
        }
        dto.setItemIdList(ids);
        return dto;
    }

    @Override
    public Building createBuilding(BuildingDto buildingDto, Long comboId) {
        try{
            //ComboBuilding combo = comboRepository.findByComboBuildingId(comboId);
            Building newBuilding = new Building();
            newBuilding.setArea(buildingDto.getArea());
            newBuilding.setStatus(-1);
            Building added = buildingRepository.saveAndFlush(newBuilding);
            Set<BuildingDetail> buildingDetails = new HashSet<>();
            for (Long id: buildingDto.getItemIdList()){
                Item item = itemRepository.findById(id)
                        .orElseThrow(() -> new IllegalStateException("Item with id " + id + " does not exists"));
                BuildingDetail newBD = buildingDetailService.createBuildingDetail(newBuilding,item);
                buildingDetails.add(newBD);
            }
            added.setBuildingDetail(buildingDetails);
            return added;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public BuildingDto updateBuilding(Long buildingId,BuildingDto buildingDto) {
        try{
            Building updateBuilding = buildingRepository.findById(buildingId)
                    .orElseThrow(
                            () -> new IllegalStateException("Building with id " + buildingId + " does not exists"));
            updateBuilding.setArea(buildingDto.getArea());
            updateBuilding.setStatus(buildingDto.getStatus());
            buildingRepository.save(updateBuilding);
            buildingDetailService.updateBuildingDetail(buildingId, buildingDto.getItemIdList());
            //buildingDto.setBuildingId(updateBuilding.getBuildingId());
            return buildingDto;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public List<BuildingDetailDto> findAllBD() {
        List<BuildingDetailDto> buildingDetailDtos = new ArrayList<>();
        Set<Building> buildings = new HashSet<>();
        List<BuildingDetail> buildingDetails = buildingDetailRepository.findAll();
        for (BuildingDetail b : buildingDetails) {
            buildings.add(b.getBuilding());
        }
        for(Building b: buildings){
            List<String> itemNames = new ArrayList<>();
            BuildingDetailDto buildingDetailDto = new BuildingDetailDto();
            buildingDetailDto.setBuildingId(b.getBuildingId());
            buildingDetailDto.setLandArea(b.getArea());
            buildingDetailDto.setStatus(b.getStatus());
            buildingDetailDto.setUserId(requestContractRepository.findByBuilding(b).getUser().getUserId());
            List<BuildingDetail> findItems = buildingDetailRepository.findByBuilding(b);
            if(!findItems.isEmpty()){
                for(BuildingDetail bd: findItems){
                    itemNames.add(bd.getItem().getItemName());
                }
            }
            buildingDetailDto.setItemNameList(itemNames);
            buildingDetailDtos.add(buildingDetailDto);
        }
        return buildingDetailDtos;
    }

    @Override
    public FormConsultanDto getDataFormConsultant(int comboType) {
        try{
            List<ComboBuilding> comboList = comboRepository.findAll();
            List<Item> itemList = itemRepository.findAll();
            List<ItemType> typeList = itemTypeRepository.findAll();
            List<ItemTypeFCDto> typeDtoList = new ArrayList<>();
            List<ComboFormConsultantDto> cfcList = new ArrayList<>();

            for (ItemType it : typeList){
                List<ItemDto> itemDtoList = new ArrayList<>();
                for (Item i : itemList)  {
                    if(i.isStatus() && i.getItemType().equals(it)) {
                        itemDtoList.add(new ItemDto(i.getItemId(), i.getItemName(),i.getPriceItem(),i.isStatus(),i.getItemType().getItemTypeName()));
                    }
                }
                typeDtoList.add(new ItemTypeFCDto(it.getItemTypeName(), itemDtoList));
            }
            for (ComboBuilding combo : comboList){
                if(combo.getType() == comboType){
                    cfcList.add(new ComboFormConsultantDto(combo.getComboBuildingId(), combo.getComboBuildingName(), combo.getUnitPrice()));
                }
            }
            FormConsultanDto dataForm = new FormConsultanDto(cfcList,typeDtoList);
            return dataForm;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public BuildingPriceDto getBuildingPrice(BuildingDto bd, Long comboId) {
        try{
            BuildingPriceDto bp = new BuildingPriceDto();
            Double totalPrice = 0.0;
            bp.setArea(bd.getArea());
            bp.setComboId(comboId);

            List<ItemTypeFCDto> iTypeDto = new ArrayList<>();
            for (Long id: bd.getItemIdList()
                 ) {
                List<ItemDto> iDList = new ArrayList<>();
                ItemDto idto = new ItemDto();
                Item item = itemRepository.findByItemId(id);
                ItemTypeFCDto itemTypeFCDto = new ItemTypeFCDto();
                itemTypeFCDto.setItemTypeName(item.getItemType().getItemTypeName());
                idto.setItemId(id);
                idto.setItemName(item.getItemName());
                iDList.add(idto);
                itemTypeFCDto.setItemList(iDList);
                iTypeDto.add(itemTypeFCDto);
            }
            bp.setItemList(iTypeDto);
            ComboBuilding cb = comboRepository.findById(comboId)
                    .orElseThrow(() -> new IllegalStateException("Combo with id " + comboId + " does not exists"));
            bp.setComboName(cb.getComboBuildingName());
            for (Long id: bd.getItemIdList()) {
                Item item = itemRepository.findByItemId(id);
                totalPrice+=item.getPriceItem();
            }
            totalPrice =  bd.getArea()*(totalPrice+cb.getUnitPrice());
            bp.setPrice(totalPrice);
            return bp;
        }catch (Exception e){
            return null;
        }
    }
}
