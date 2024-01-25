package com.example.system.dto.combodto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialDto {
    private String materialName;
    private Double unitPrice;
}
