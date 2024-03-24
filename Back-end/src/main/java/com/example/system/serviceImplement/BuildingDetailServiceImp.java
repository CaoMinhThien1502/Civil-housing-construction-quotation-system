package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.building.DetailDto;
import com.example.system.dto.buildingdto.building.RequestBuildingDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.BuildingRepository;
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
    public DetailDto createBuildingDetail(Long buildingId, RequestBuildingDto buildingDto) {
        BuildingDetail create = new BuildingDetail();
        create.setBuilding(buildingRepository.findById(buildingId).orElseThrow());
        create.setArea(buildingDto.getArea());
        create.setNumOBathroom(buildingDto.getNumOBathroom());
        create.setNumOKitchen(buildingDto.getNumOKitchen());
        create.setNumOBedroom(buildingDto.getNumOBedroom());
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
