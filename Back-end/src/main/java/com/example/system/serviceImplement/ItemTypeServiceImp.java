package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.ItemTypeDto;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import com.example.system.repository.building.ItemTypeRepository;
import com.example.system.service.building.ItemTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ItemTypeServiceImp implements ItemTypeService {

    @Autowired
    ItemTypeRepository itemTypeRepository;

    @Override
    public List<ItemType> findAll() {
        return itemTypeRepository.findAll();
    }

    @Override
    public List<ItemTypeDto> findItemTypeDtos() {
        List<ItemTypeDto> list = new ArrayList<>();
        for (ItemType it: itemTypeRepository.findAll()) {
            ItemTypeDto dto = new ItemTypeDto();
            dto.setItemTypeName(it.getItemTypeName());
            Set<Long> itemIds = new HashSet<>();
            for (Item i: it.getItems()) {
                itemIds.add(i.getItemId());
            }
            dto.setItemIds(itemIds);
            list.add(dto);
        }
        return list;
    }

    @Override
    public ItemType createItemType(ItemType itemType) {
        ItemType newItemType = new ItemType();
        newItemType.setItemTypeName(itemType.getItemTypeName());
        return itemTypeRepository.save(newItemType);
    }

    @Override
    public ItemType updateItemType(Long id, ItemType itemType) {
        ItemType update = itemTypeRepository.findById(id)
                .orElseThrow(
                        () -> new IllegalStateException("Item Type with id " + id + " does not exists"));
        update.setItemTypeName(itemType.getItemTypeName());
        return itemTypeRepository.save(update);
    }
}
