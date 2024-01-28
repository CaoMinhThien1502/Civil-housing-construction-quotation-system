package com.example.system.dto.requestcontractdto;


import com.example.system.dto.buildingdto.BuildingDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestContractDto {
    private Long requestContractId;
    private Long userId;
    private Long comboId;
    private BuildingDto buildingDto;
    private boolean status;

}
