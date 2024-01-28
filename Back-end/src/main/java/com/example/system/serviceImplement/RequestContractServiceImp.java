package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.model.building.Building;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.building.BuildingService;
import com.example.system.service.requestContract.RequestContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestContractServiceImp implements RequestContractService {
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    BuildingService buildingService;
    @Autowired
    UserRepository userRepository;
    @Override
    public RequestContract getByBuilding(Building building) {
        return requestContractRepository.findByBuilding(building);
    }

    @Override
    public List<RequestContract> findAll() {
        return requestContractRepository.findAll();
    }

    @Override
    public List<RequestContractDto> findAllDto() {
        List<RequestContract> requestContractList = requestContractRepository.findAll();
        List<RequestContractDto> dtos = new ArrayList<>();
        for (RequestContract rc: requestContractList) {
            RequestContractDto dto = new RequestContractDto();
            dto.setRequestContractId(rc.getRequestContractId());
            dto.setUserId(rc.getUser().getUserId());
            dto.setComboId(rc.getComboBuilding().getComboBuildingId());
            dto.setStatus(rc.isStatus());
            dto.setBuildingDto(buildingService.findByBuilding(rc.getBuilding()));
            dtos.add(dto);
        }
        return dtos;
    }

//    @Override
//    public RequestContractDto createRequestContract(BuildingDto dto, Long comboId, Long userId) {
//        RequestContract newRequestContract = new RequestContract();
//        newRequestContract.setStatus(false);
//        newRequestContract.setBuilding(buildingService.findByBuildingId(dto.getBuildingId()));
//        User user = userRepository.findById(userId)
//                .orElseThrow(
//                        () -> new IllegalStateException("Item with id " + userId + " does not exists"));
//
//        newRequestContract.setUser(user);
//        Date now = new Date();
//        newRequestContract.setRequestDate(now);
//        requestContractRepository.save(newRequestContract);
//        RequestContractDto rcDto = new RequestContractDto();
//        rcDto.setRequestContractId(newRequestContract.getRequestContractId());
//        rcDto.setUserId(newRequestContract.getUser().getUserId());
//        rcDto.setComboId(newRequestContract.getComboBuilding().getComboBuildingId());
//        rcDto.setStatus(newRequestContract.isStatus());
//        rcDto.setBuildingDto(buildingService.findByBuilding(newRequestContract.getBuilding()));
//        return rcDto;
//    }
//
//    @Override
//    public RequestContract updateRequestContract(RequestContract requestContract) {
//        return requestContractRepository.save(requestContract);
//    }
}
