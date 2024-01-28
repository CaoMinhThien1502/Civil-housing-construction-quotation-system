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
public class BuildingDto {
    private Long buildingId;
    private Double width;
    private Double length;
    private List<Long> itemIdList;
    private int status;
}