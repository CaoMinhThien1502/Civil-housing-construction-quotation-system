package com.example.system.dto.buildingdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemTypeFCDto {
    private String itemTypeName;
    private List<ItemDto> itemList;
}
