package com.example.system.service.combobuilding;

import com.example.system.dto.combodto.custom.CustomComboDto;
import com.example.system.dto.combodto.custom.CustomDetailDto;
import com.example.system.dto.combodto.custom.CustomForm;
import com.example.system.dto.combodto.custom.CustomInfor;

import java.util.List;

public interface CustomDetailService{
    CustomComboDto getCustomComboDetail(Long rcID);
    CustomForm getFormCustom(Long comboId);
    List<CustomDetailDto> makeCustomCombo(CustomInfor infor, Long rcId);
}