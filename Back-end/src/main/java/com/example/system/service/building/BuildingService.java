package com.example.system.service.building;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.model.building.Building;

import java.util.List;

public interface BuildingService {
    List<Building> findAll();

    Building createBuilding(Building building);

    Building updateBuilding(Long buildingId, Building building);

    List<BuildingDetailDto> findAllBD();
}
