package com.example.system.dto.buildingdto;

import com.example.system.dto.buildingdto.itemtypedto.ItemTypeFCDto;
import com.example.system.dto.combodto.ComboFormConsultantDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormConsultanDto {
    private List<ComboFormConsultantDto> comboList;
    private List<ItemTypeFCDto> itemTypeList;
}
