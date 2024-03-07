package com.example.system.dto.buildingdto.itemtypedto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemTypeDto {
    private  Long itemTypeId;
    private String itemTypeName;
    private Set<Long> itemIds;
    private boolean status;
}
