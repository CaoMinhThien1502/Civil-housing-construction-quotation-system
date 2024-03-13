package com.example.system.dto.dashboarddto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private int materialCount;
    private int itemCount;
    private int requestContractCount;
    private int userCount;
}
