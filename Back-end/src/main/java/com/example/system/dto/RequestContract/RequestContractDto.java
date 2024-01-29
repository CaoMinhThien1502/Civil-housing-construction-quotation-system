package com.example.system.dto.RequestContract;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestContractDto {
    private Long buildingId;
    private Long comboBuildingId;
    private Long userId;
    private Long price;
}
