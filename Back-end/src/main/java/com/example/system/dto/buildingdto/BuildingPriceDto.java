package com.example.system.dto.buildingdto;

import com.example.system.dto.buildingdto.itemtypedto.ItemTypeFCDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuildingPriceDto {
    private Double area;
    private List<ItemTypeFCDto> itemList;
    private Long comboId;
    private String comboName;
    private Double price;
}
