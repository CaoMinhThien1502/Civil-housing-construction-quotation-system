package com.example.system.service.building;

import com.example.system.dto.buildingdto.ItemTypeDto;
import com.example.system.model.building.ItemType;

import java.util.List;

public interface ItemTypeService {
    List<ItemType> findAll();

    List<ItemTypeDto> findItemTypeDtos();

    ItemType createItemType(ItemType itemType);

    ItemType updateItemType(Long id, ItemType itemType);

    ItemType disableItemType(Long id);

}
