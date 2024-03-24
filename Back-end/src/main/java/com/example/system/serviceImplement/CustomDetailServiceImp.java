package com.example.system.serviceImplement;

import com.example.system.dto.combodto.custom.*;
import com.example.system.model.combo.*;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.repository.combo.*;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.combobuilding.CustomDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomDetailServiceImp implements CustomDetailService {
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    CustomDetailRepository customDetailRepository;
    @Autowired
    ComboBuildingRepository comboBuildingRepository;
    @Autowired
    MaterialTypeRepository materialTypeRepository;
    @Autowired
    MaterialRepository materialRepository;
    @Autowired
    ComboDetailRepository comboDetailRepository;
    @Override
    public CustomComboDto getCustomComboDetail(Long rcID) {
        RequestContract contract = requestContractRepository.findById(rcID).orElseThrow();
        CustomComboDto detail = new CustomComboDto();
        detail.setComboId(contract.getComboBuilding().getComboBuildingId());
        detail.setComboName(contract.getComboBuilding().getComboBuildingName());
        detail.setRcId(contract.getRequestContractId());
        List<CustomMateTypeDto> mateList = new ArrayList<>();
        List<CustomDetail> customMates = customDetailRepository.findAllByRequestContract(contract);
        for (ComboDetail cod: contract.getComboBuilding().getComboDetails()) {
            CustomMateTypeDto mate = getMate(cod, customMates);
            mateList.add(mate);
        }
        detail.setMateList(mateList);
        return detail;
    }
    @Override
    public CustomForm getFormCustom(Long comboId) {
        CustomForm form = new CustomForm();
        ComboBuilding combo = comboBuildingRepository.findById(comboId).orElseThrow();
        CustomComboDto infor = new CustomComboDto();
        infor.setComboName(combo.getComboBuildingName());
        infor.setComboId(combo.getComboBuildingId());
        List<CustomMateTypeDto> mateList = new ArrayList<>();
        for (ComboDetail cd: combo.getComboDetails()) {
            mateList.add(new CustomMateTypeDto(cd.getMaterial().getMaterialType().getMaterialTypeId()
                    ,cd.getMaterial().getMaterialType().getTypeName()
                    ,new CustomMateDto(cd.getMaterial().getMaterialId(),cd.getMaterial().getMaterialName())));
        }
        infor.setMateList(mateList);
        form.setInfor(infor);
        List<MaterialType> typeList = materialTypeRepository.findAll();
        List<CustomMateTypeForm> allMates = new ArrayList<>();
        for (MaterialType mt: typeList) {
            CustomMateTypeForm type = new CustomMateTypeForm();
            type.setMateTypeId(mt.getMaterialTypeId());
            type.setMateTypeName(mt.getTypeName());
            List<CustomMateDto> mates = new ArrayList<>();
            for (Material m: mt.getMaterials()) {
                mates.add(new CustomMateDto(m.getMaterialId(),m.getMaterialName()));
            }
            type.setMates(mates);
            allMates.add(type);
        }
        form.setAllMateList(allMates);
        return form;
    }
    @Override
    public List<CustomDetailDto> makeCustomCombo(CustomInfor infor, Long rcId) {
        RequestContract contract = requestContractRepository.findById(rcId).orElseThrow();
        List<CustomDetail> customList = customDetailRepository.findAllByRequestContract(contract);
        List<CustomDetailDto> result = new ArrayList<>();
        for (Long mateId: infor.getNewMateList()) {
            CustomDetail add = new CustomDetail();
            Material newMate = materialRepository.findById(mateId).orElseThrow();
            boolean flag = false;
            for (CustomDetail cd: customList) {
                if(newMate.getMaterialType().equals(cd.getOldMate().getMaterialType())){
                    cd.setNewMate(newMate);
                    cd.setStatus(true);
                    flag = true;
                    add = customDetailRepository.save(cd);
                    break;
                }
            }
            if(!flag){
                CustomDetail cud = new CustomDetail();
                ComboDetail cod = comboDetailRepository.findComboDetailByComboBuildingAndMaterial_MaterialType(contract.getComboBuilding(),newMate.getMaterialType());
                cud.setRequestContract(contract);
                cud.setOldMate(cod.getMaterial());
                cud.setNewMate(newMate);
                cud.setStatus(true);
                add = customDetailRepository.save(cud);
            }
            result.add(getCustomDto(add));
        }
        return result;
    }

    private CustomDetailDto getCustomDto(CustomDetail customDetail){
        return new CustomDetailDto(customDetail.getCustomId()
                ,customDetail.getNewMate().getMaterialType().getMaterialTypeId()
                ,customDetail.getNewMate().getMaterialType().getTypeName()
                ,new CustomMateDto(customDetail.getOldMate().getMaterialId(),customDetail.getOldMate().getMaterialName())
                ,new CustomMateDto(customDetail.getNewMate().getMaterialId(),customDetail.getNewMate().getMaterialName()));
    }
    private CustomMateTypeDto getMate(ComboDetail cod, List<CustomDetail> customMates) {
        CustomMateTypeDto mate = new CustomMateTypeDto();
        boolean didAdd = false;
        for (CustomDetail cud: customMates) {
            if(cod.getMaterial().equals(cud.getOldMate())){
                mate.setMateTypeId(cud.getNewMate().getMaterialType().getMaterialTypeId());
                mate.setMateTypeName(cud.getNewMate().getMaterialType().getTypeName());
                mate.setMate(new CustomMateDto(cud.getNewMate().getMaterialId(), cud.getNewMate().getMaterialName()));
                didAdd = true;
                break;
            }
        }
        if (!didAdd){
            mate.setMateTypeId(cod.getMaterial().getMaterialType().getMaterialTypeId());
            mate.setMateTypeName(cod.getMaterial().getMaterialType().getTypeName());
            mate.setMate(new CustomMateDto(cod.getMaterial().getMaterialId(), cod.getMaterial().getMaterialName()));
        }
        return mate;
    }
}