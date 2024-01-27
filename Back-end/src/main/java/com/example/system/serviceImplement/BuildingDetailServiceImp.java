package com.example.system.serviceImplement;

import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.service.building.BuildingDetailService;
import com.example.system.service.building.BuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BuildingDetailServiceImp implements BuildingDetailService {
    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Autowired
    BuildingRepository buildingRepository;
    @Override
    public List<BuildingDetail> findAll() {
        return buildingDetailRepository.findAll();
    }

    @Override
    public BuildingDetail createBuildingDetail(Building building, Item item) {
        BuildingDetail buildingDetail = new BuildingDetail();
        buildingDetail.setBuilding(building);
        buildingDetail.setItem(item);
        return buildingDetailRepository.save(buildingDetail);
    }

    @Override
    public boolean updateBuildingDetail(Long id, Set<Long> items) {
        List<BuildingDetail> buildingDetails = buildingDetailRepository.findByBuilding(buildingRepository.findByBuildingId(id));
        return false;
    }


}
