package com.example.system.service.building;

import com.example.system.model.building.Building;
import com.example.system.model.building.Item;

import java.util.List;

public interface ItemService {
    List<Item> findALl();

    List<Item> findByBuilding(Building building);

    Item findByItemId(Long id);

    Item createItem(Long itemTypeId,Item newItem);

    Item updateItem(Long itemId, Long itemTypeId, Item newItem);
}
