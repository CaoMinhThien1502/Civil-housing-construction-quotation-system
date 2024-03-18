package com.example.system.dto.requestcontractdto;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RCDetailDto {
    private Long requestContractId;
    private Long userId;
    private String userName;
    private Date requestDate;
    private String phone;
    private String email;
    private Double totalPrice;
    private Long comboId;
    private String comboName;
    private BuildingDetailDto buildingDto;
    private boolean status;
}