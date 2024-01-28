package com.example.system.serviceImplement;

import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.model.building.ItemType;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.building.ItemTypeRepository;
import com.example.system.service.building.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImp implements ItemService {
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    ItemTypeRepository itemTypeRepository;

    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Override
    public List<Item> findALl() {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> findByBuilding(Building building) {
        List<BuildingDetail> buildingDetails = buildingDetailRepository.findByBuilding(building);
        List<Item> items = new ArrayList<>();
        for (BuildingDetail bd: buildingDetails) {
            items.add(bd.getItem());
        }
        return items;
    }

    @Override
    public Item findByItemId(Long id) {
        return itemRepository.findByItemId(id);
    }


    @Override
    public Item createItem(Long itemTypeId, Item inputItem) {
        try{
            ItemType itemType = itemTypeRepository.findById(itemTypeId)
                        .orElseThrow(
                                () -> new IllegalStateException("Item Type with id " + itemTypeId + " does not exists"));
            Item newItem = new Item();
            newItem.setItemName(inputItem.getItemName());
            newItem.setItemType(itemType);
            newItem.setPriceItem(inputItem.getPriceItem());
            return itemRepository.save(newItem);
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public Item updateItem(Long itemId, Long itemTypeId, Item inputItem) {
        try{
            Item updateItem = itemRepository.findById(itemId)
                    .orElseThrow(
                            () -> new IllegalStateException("Item with id " + itemId + " does not exists"));
            ItemType newItemType = itemTypeRepository.findById(itemTypeId)
                    .orElseThrow(
                            () -> new IllegalStateException("Item Type with id " + itemTypeId + " does not exists"));
            updateItem.setPriceItem(inputItem.getPriceItem());
            updateItem.setItemType(newItemType);
            updateItem.setItemName(inputItem.getItemName());
            return itemRepository.save(updateItem);
        }catch (Exception e){
            return null;
        }
    }
}