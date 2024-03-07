package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.itemdto.ItemDto;
import com.example.system.dto.buildingdto.itemdto.ItemUpdateDto;
import com.example.system.dto.buildingdto.itemtypedto.ItemTypeNameDto;
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
    public List<ItemDto> findALl() {
        List<Item> items = itemRepository.findAll();
        List<ItemDto> itemDtos = new ArrayList<>();
        ItemDto itemDto;
        for (Item i: items) {
            itemDto = new ItemDto(i.getItemId(), i.getItemName(), i.getPriceItem(), i.isStatus(), i.getItemType().getItemTypeName());
            itemDtos.add(itemDto);
        }
        return itemDtos;
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
    public ItemUpdateDto findItemUpdate(Long id) {
        ItemUpdateDto update = new ItemUpdateDto();
        Item item = itemRepository.findByItemId(id);
        List<ItemTypeNameDto> itemTypeNameDtos = new ArrayList<>();
        for (ItemType it: itemTypeRepository.findAll()
             ) {
            ItemTypeNameDto itd = new ItemTypeNameDto(it.getItemTypeId(), it.getItemTypeName());
            itemTypeNameDtos.add(itd);
        }
        update.setItemId(item.getItemId());
        update.setStatus(item.isStatus());
        update.setPriceItem(item.getPriceItem());
        update.setItemName(item.getItemName());
        update.setItemTypes(itemTypeNameDtos);
        return update;
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
            newItem.setStatus(true);
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
            updateItem.setStatus(inputItem.isStatus());
            return itemRepository.save(updateItem);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public Item disableItem(Long itemId) {
        try{
            Item disable = itemRepository.findById(itemId)
                    .orElseThrow(
                            () -> new IllegalStateException("Item with id " + itemId + " does not exists"));
            disable.setStatus(false);
            return itemRepository.save(disable);
        }catch (Exception e){
            return null;
        }
    }
}
