package com.example.system.service.building;


import com.example.system.dto.buildingdto.itemtypedto.ItemTypeDto;

import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;

import java.util.List;

public interface ItemTypeService {
    List<ItemType> findAll();
  
    ItemType findById(Long id);
  
    List<ItemTypeDto> findItemTypeDtos();

    ItemType createItemType(ItemType itemType);

    ItemType updateItemType(Long id, ItemType itemType);

    ItemType disableItemType(Long id);

}
