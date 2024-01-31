package com.example.system.dto.buildingdto;

import com.example.system.model.building.Item;
import com.example.system.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDetailDto {
    private Long buildingId;
    private Double landArea;
    private List<String> itemNameList;
    private int status;
    private Long userId;
}
