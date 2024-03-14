package com.example.system.dto.dashboarddto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    @JsonProperty("material_count")
    private Long materialCount;
    @JsonProperty("item_count")
    private Long itemCount;
    @JsonProperty("request_contract_count")
    private Long requestContractCount;
    @JsonProperty("user_count")
    private Long userCount;
    private List<NumOfItemChoice> listItemChoice;
}
