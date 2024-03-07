package com.example.system.dto.buildingdto.itemdto;

import com.example.system.dto.buildingdto.itemtypedto.ItemTypeNameDto;
import com.example.system.model.building.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemUpdateDto {
    private Long itemId;
    private String itemName;
    private double priceItem;
    private List<ItemTypeNameDto> itemTypes;
    private boolean status;
}
