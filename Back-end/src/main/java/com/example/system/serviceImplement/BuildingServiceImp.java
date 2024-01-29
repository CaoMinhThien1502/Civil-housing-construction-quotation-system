package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.building.BuildingDetailService;
import com.example.system.service.building.BuildingService;
import com.example.system.service.building.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BuildingServiceImp implements BuildingService {

    @Autowired
    BuildingRepository buildingRepository;

    @Autowired
    RequestContractRepository requestContractRepository;

    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

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
        dto.setWidth(b.getWidth());
        dto.setLength(b.getLength());
        List<Long> ids = new ArrayList<>();
        for (Item i: itemService.findByBuilding(b)){
            ids.add(i.getItemId());
        }
        dto.setItemIdList(ids);
        return dto;
    }

    @Override
    public Building createBuilding(BuildingDto buildingDto) {
        try{
            Building newBuilding = new Building();
            newBuilding.setLength(buildingDto.getLength());
            newBuilding.setWidth(buildingDto.getWidth());
            newBuilding.setStatus(-1);
            Building added = buildingRepository.save(newBuilding);
            for (Long id: buildingDto.getItemIdList()){
                Item item = itemRepository.findById(id)
                        .orElseThrow(
                                () -> new IllegalStateException("Item with id " + id + " does not exists"));
                buildingDetailService.createBuildingDetail(newBuilding,item);
            }
            return newBuilding;
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
            updateBuilding.setLength(buildingDto.getLength());
            updateBuilding.setWidth(buildingDto.getWidth());
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
            buildingDetailDto.setLandArea(b.getLength() * b.getWidth());
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
}
