package com.example.system.dto.combodto;

import com.example.system.model.combo.Material;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComboResponseDto {
    private String comboBuildingName;
    private Long unitPrice;
    private int type;
    private List<Material> materialList;
    private boolean status;
}
