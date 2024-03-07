package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.itemtypedto.ItemTypeDto;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.building.ItemTypeRepository;
import com.example.system.service.building.ItemService;
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
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    ItemService itemService;
    @Override
    public List<ItemType> findAll() {
        return itemTypeRepository.findAll();
    }

    @Override
    public ItemType findById(Long id) {
        ItemType it = itemTypeRepository.findById(id)
                .orElseThrow(
                        () -> new IllegalStateException("Item Type with id " + id + " does not exists"));

        return it;
    }

    @Override
    public List<ItemTypeDto> findItemTypeDtos() {
        List<ItemTypeDto> list = new ArrayList<>();
        for (ItemType it: itemTypeRepository.findAll()) {
            ItemTypeDto dto = new ItemTypeDto();
            dto.setItemTypeId(it.getItemTypeId());
            dto.setItemTypeName(it.getItemTypeName());
            Set<Long> itemIds = new HashSet<>();
            for (Item i: it.getItems()) {
                itemIds.add(i.getItemId());
            }
            dto.setItemIds(itemIds);
            dto.setStatus(it.isStatus());
            list.add(dto);
        }
        return list;
    }

    @Override
    public ItemType createItemType(ItemType itemType) {
        try{
            ItemType newItemType = new ItemType();
            newItemType.setItemTypeName(itemType.getItemTypeName());
            newItemType.setStatus(itemType.isStatus());
            return itemTypeRepository.save(newItemType);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public ItemType updateItemType(Long id, ItemType itemType) {
        try{
            ItemType update = itemTypeRepository.findById(id)
                    .orElseThrow(
                            () -> new IllegalStateException("Item Type with id " + id + " does not exists"));
            update.setItemTypeName(itemType.getItemTypeName());
            update.setStatus(itemType.isStatus());
            return itemTypeRepository.save(update);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public ItemType disableItemType(Long id) {
        try{
            ItemType disable = itemTypeRepository.findById(id)
                    .orElseThrow(
                            () -> new IllegalStateException("Item Type with id " + id + " does not exists"));
            disable.setStatus(false);
            for (Item i: itemRepository.findByItemType(disable)){
                itemService.disableItem(i.getItemId());
            }
            return itemTypeRepository.save(disable);
        }catch (Exception e){
            return null;
        }
    }
}
