package com.example.system.service.building;

import com.example.system.dto.buildingdto.itemdto.ItemDto;
import com.example.system.dto.buildingdto.itemdto.ItemUpdateDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.Item;

import java.util.List;

public interface ItemService {
    List<ItemDto> findALl();

    List<Item> findByBuilding(Building building);

    Item findByItemId(Long id);
    ItemUpdateDto findItemUpdate(Long id);
    Item createItem(Long itemTypeId,Item newItem);

    Item updateItem(Long itemId, Long itemTypeId, Item newItem);

    Item disableItem(Long itemId);
}
