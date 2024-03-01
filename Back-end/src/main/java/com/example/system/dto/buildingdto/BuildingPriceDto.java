package com.example.system.dto.buildingdto;

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
    private List<Long> itemIdList;
    private Long comboId;
    private Double price;
}
