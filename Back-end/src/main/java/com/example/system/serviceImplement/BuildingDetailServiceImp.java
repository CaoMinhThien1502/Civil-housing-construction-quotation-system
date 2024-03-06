package com.example.system.serviceImplement;

import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.service.building.BuildingDetailService;
import com.example.system.service.building.BuildingService;
import com.example.system.service.building.ItemService;
import com.example.system.service.building.ItemTypeService;
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
    @Autowired
    ItemTypeService itemTypeService;
    @Autowired
    ItemService itemService;

    @Override
    public List<BuildingDetail> findAll() {
        return buildingDetailRepository.findAll();
    }

    @Override
    public BuildingDetail createBuildingDetail(Building building, Item item) {
        try{
            BuildingDetail buildingDetail = new BuildingDetail();
            buildingDetail.setBuilding(building);
            buildingDetail.setItem(item);
            return buildingDetailRepository.saveAndFlush(buildingDetail);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public boolean updateBuildingDetail(Long id, List<Long> items) {
        try{
            List<BuildingDetail> buildingDetails = buildingDetailRepository.findByBuilding(buildingRepository.findByBuildingId(id));
            for (int i = 0; i < itemTypeService.findAll().size(); i++) {
                Item item = itemService.findByItemId(items.get(i));
                buildingDetails.get(i).setItem(item);
            }
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
