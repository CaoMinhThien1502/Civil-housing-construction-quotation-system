package com.example.system.service.building;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.model.building.Building;

import java.util.List;

public interface BuildingService {
    List<Building> findAll();

    Building findByBuildingId(Long id);

    List<BuildingDto> findBuildingDtos();

    BuildingDto findByBuilding(Building building);

    Building createBuilding(BuildingDto buildingDto);

    BuildingDto updateBuilding(Long buildingId, BuildingDto buildingDto);

    List<BuildingDetailDto> findAllBD();
}
