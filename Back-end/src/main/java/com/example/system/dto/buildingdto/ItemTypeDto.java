package com.example.system.dto.buildingdto;


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
    private String itemTypeName;
    private Set<Long> itemIds;
}
