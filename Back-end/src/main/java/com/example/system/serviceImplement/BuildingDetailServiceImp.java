package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.building.DetailDto;
import com.example.system.dto.buildingdto.building.RequestBuildingDto;
import com.example.system.dto.buildingdto.pricedto.PriceDetailDto;
import com.example.system.dto.buildingdto.pricedto.RequestPriceDto;
import com.example.system.dto.combodto.custom.CustomMateDto;
import com.example.system.dto.combodto.custom.CustomMateTypeDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.combo.ComboDetail;
import com.example.system.model.combo.Material;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
import com.example.system.repository.combo.ComboBuildingRepository;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.building.BuildingDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BuildingDetailServiceImp implements BuildingDetailService {
    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Autowired
    BuildingRepository buildingRepository;
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    ComboBuildingRepository comboBuildingRepository;
    @Autowired
    MaterialRepository materialRepository;

    @Override
    public List<DetailDto> getBuildingDetails() {
        List<DetailDto> result = new ArrayList<>();
        for (BuildingDetail bd: buildingDetailRepository.findAll()) {
            result.add(getDetailDto(bd));
        }
        return result;
    }
    @Override
    public DetailDto getBuildingDetail(Long requestContractId) {
        RequestContract contract = requestContractRepository.findById(requestContractId).orElseThrow();
        return getDetailDto(contract.getBuildingDetail());
    }

    @Override
    public PriceDetailDto getPriceDetail(RequestPriceDto dto) {
        PriceDetailDto detail = new PriceDetailDto();
        //get building
        Building building = buildingRepository.findById(dto.getBuildingId()).orElseThrow();
        detail.setBuildingId(building.getBuildingId());
        detail.setBuildingName(building.getBuildingName());
        detail.setPercentPrice(building.getPercentPrice());

        //get building detail
        detail.setArea(dto.getArea());
        detail.setNumOFloor(dto.getNumOFloor());
        detail.setNumOBathroom(dto.getNumOBathroom());
        detail.setNumOBedroom(dto.getNumOBedroom());
        detail.setNumOKitchen(dto.getNumOKitchen());
        detail.setHasTunnel(dto.isHasTunnel());

        //get combo/custom combo
        ComboBuilding combo = comboBuildingRepository.findById(dto.getComboId()).orElseThrow();
        List<CustomMateTypeDto> matesCombo = new ArrayList<>();
        for (ComboDetail cd: combo.getComboDetails()) {
            boolean added = false;
            for (Long id: dto.getNewMateIds()) {
                Material newMate = materialRepository.findById(id).orElseThrow();
                if(cd.getMaterial().getMaterialType().equals(newMate.getMaterialType())){
                    matesCombo.add(new CustomMateTypeDto(newMate.getMaterialType().getMaterialTypeId()
                            ,newMate.getMaterialType().getTypeName()
                            ,new CustomMateDto(newMate.getMaterialId(), newMate.getMaterialName(), newMate.getUnitPrice())));
                    added = true;
                    break;
                }
            }
            if(!added){
                matesCombo.add(new CustomMateTypeDto(cd.getMaterial().getMaterialType().getMaterialTypeId()
                        ,cd.getMaterial().getMaterialType().getTypeName()
                        ,new CustomMateDto(cd.getMaterial().getMaterialId()
                                        ,cd.getMaterial().getMaterialName()
                                        ,cd.getMaterial().getUnitPrice())));
            }
        }
        detail.setComboId(combo.getComboBuildingId());
        detail.setMatesInCustom(matesCombo);

        //combo price
        double total = 0.0;
        for (CustomMateTypeDto mt: matesCombo) {
            total = total + (double)mt.getMate().getMatePrice();
        }
        int count = 0;
        if(detail.getNumOBathroom() > 1) count += detail.getNumOBathroom() - 1;
        if(detail.getNumOBedroom() > 1) count += detail.getNumOBedroom() - 1;
        if(detail.getNumOKitchen() > 1) count += detail.getNumOKitchen() - 1;
        if(detail.getNumOFloor() > 1) count = count * (detail.getNumOFloor() - 1);
        if(detail.isHasTunnel()) count++;
        total = total * ((((double)count*5)+100)/100);
        total = total * 0.95;
        detail.setComboPrice(total);

        //total price

        detail.setTotalPrice(total * detail.getArea() * detail.getPercentPrice());

        return detail;
    }

    @Override
    public DetailDto createBuildingDetail(Long buildingId, RequestBuildingDto buildingDto) {
        BuildingDetail create = new BuildingDetail();
        create.setBuilding(buildingRepository.findById(buildingId).orElseThrow());
        create.setArea(buildingDto.getArea());
        create.setNumOBathroom(buildingDto.getNumOBathroom());
        create.setNumOKitchen(buildingDto.getNumOKitchen());
        create.setNumOBedroom(buildingDto.getNumOBedroom());
        create.setNumOFloor(buildingDto.getNumOFloor());
        create.setHasTunnel(buildingDto.isHasTunnel());
        create.setStatus(-1);
        RequestContract tmp = new RequestContract();
        tmp.setPayStatus(false);
        create.setRequestContract(requestContractRepository.save(tmp));
        BuildingDetail added = buildingDetailRepository.save(create);
        return getDetailDto(added);
    }

//    @Override
//    public DetailDto startBuildingDetail(Long buildingDetailId) {
//        BuildingDetail buildingDetail = buildingDetailRepository.findById(buildingDetailId).orElseThrow();
//        if(buildingDetail.getStatus()== -1){
//            buildingDetail.setStartDate(new Date());
//            buildingDetail.setStatus(1);
//            buildingDetailRepository.save(buildingDetail);
//        }else return null;
//        return getDetailDto(buildingDetail);
//    }
//
//    @Override
//    public DetailDto checkBuildingDetail(Long buildingDetailId) {
//        return null;
//    }
//
//    @Override
//    public DetailDto finishBuildingDetail(Long buildingDetailId) {
//        return null;
//    }

    private DetailDto getDetailDto(BuildingDetail bd){
        return new DetailDto(bd, bd.getRequestContract().getRequestContractId());
    }
}
