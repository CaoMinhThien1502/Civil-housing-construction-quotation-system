package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.building.BuildingService;
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
    BuildingRepository buildingRepository;

    @Autowired
    RequestContractRepository requestContractRepository;

    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Override
    public List<Building> findAll() {
        return buildingRepository.findAll();
    }

    @Override
    public Building createBuilding(Building building) {
        try{
            Building newBuilding = new Building();
            newBuilding.setLength(building.getLength());
            newBuilding.setWidth(building.getWidth());
            newBuilding.setStatus(-1);
            return buildingRepository.save(building);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public Building updateBuilding(Long buildingId,Building newbuilding) {
        try{
            Building updateBuilding = buildingRepository.findById(buildingId)
                    .orElseThrow(
                            () -> new IllegalStateException("Building with id " + buildingId + " does not exists"));
            updateBuilding.setLength(newbuilding.getLength());
            updateBuilding.setWidth(newbuilding.getWidth());
            updateBuilding.setStatus(newbuilding.getStatus());
            return buildingRepository.save(updateBuilding);
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
