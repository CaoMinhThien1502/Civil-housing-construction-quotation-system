package com.example.system.service.building;

import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;

import java.util.List;
import java.util.Set;

public interface BuildingDetailService {
    List<BuildingDetail> findAll();

    BuildingDetail createBuildingDetail(Building building, Item item);

    boolean updateBuildingDetail(Long id, List<Long> items);

}
