package com.example.system.repository.building;


import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Override
    List<Item> findAll();

    List<Item> findByItemType(ItemType itemType);

//    List<Item> findByBuildingDetail(List<BuildingDetail> buildingDetails);

    Item findByItemId(Long id);
}
