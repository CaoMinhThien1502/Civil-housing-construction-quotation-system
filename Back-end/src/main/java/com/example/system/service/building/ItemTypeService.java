package com.example.system.service.building;

import com.example.system.model.building.ItemType;

import java.util.List;

public interface ItemTypeService {
    List<ItemType> findAll();

    ItemType createItemType(ItemType itemType);

    ItemType updateItemType(ItemType itemType);

}
