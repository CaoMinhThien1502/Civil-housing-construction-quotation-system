package com.example.system.repository.building;

import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemTypeRepository extends JpaRepository<ItemType, Long> {
    @Override
    List<ItemType> findAll();

}
