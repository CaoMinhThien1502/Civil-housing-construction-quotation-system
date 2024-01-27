package com.example.system.serviceImplement;

import com.example.system.model.building.ItemType;
import com.example.system.repository.building.ItemTypeRepository;
import com.example.system.service.building.ItemTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemTypeServiceImp implements ItemTypeService {

    @Autowired
    ItemTypeRepository itemTypeRepository;

    @Override
    public List<ItemType> findAll() {
        return itemTypeRepository.findAll();
    }

    @Override
    public ItemType createItemType(ItemType itemType) {
        ItemType newItemType = new ItemType();
        newItemType.setItemTypeName(itemType.getItemTypeName());
        return itemTypeRepository.save(newItemType);
    }

    @Override
    public ItemType updateItemType(ItemType itemType) {
        return itemTypeRepository.save(itemType);
    }
}
