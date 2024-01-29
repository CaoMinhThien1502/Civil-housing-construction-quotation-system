package com.example.system.repository.building;

import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildingDetailRepository extends JpaRepository<BuildingDetail,Long> {
    @Override
    List<BuildingDetail> findAll();

    List<BuildingDetail> findByBuilding(Building building);
}