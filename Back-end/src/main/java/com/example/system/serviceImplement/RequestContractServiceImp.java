package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.model.building.Building;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import com.example.system.repository.combo.ComboBuildingRepository;
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
    @Autowired
    ComboBuildingRepository comboBuildingRepository;
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
            dtos.add(getRequestContractDto(rc));
        }
        return dtos;
    }

    @Override
    public RequestContractDto getRequestContractDto(RequestContract rc) {
        RequestContractDto dto = new RequestContractDto();
        dto.setRequestContractId(rc.getRequestContractId());
        dto.setUserId(rc.getUser().getUserId());
        dto.setComboId(rc.getComboBuilding().getComboBuildingId());
        dto.setStatus(rc.isStatus());
        dto.setBuildingDto(buildingService.findByBuilding(rc.getBuilding()));
        return dto;
    }

    @Override
    public RequestContractDto createRequestContract(BuildingDto dto, Long comboId, Long userId) {
        RequestContract newRequestContract = new RequestContract();
        Building newBuilding = buildingService.createBuilding(dto, comboId);
        newRequestContract.setStatus(false);
        newRequestContract.setBuilding(newBuilding);
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new IllegalStateException("User with id " + userId + " does not exists"));
        ComboBuilding comboBuilding = comboBuildingRepository.findById(comboId)
                .orElseThrow(
                        () -> new IllegalStateException("Combo Building with id " + comboId + " does not exists"));
        newRequestContract.setComboBuilding(comboBuilding);
        newRequestContract.setUser(user);
        Date now = new Date();
        newRequestContract.setRequestDate(now);
        RequestContract added = requestContractRepository.save(newRequestContract);
        return getRequestContractDto(added);
    }

    @Override
    public RequestContractDto confirmRequestContract(Long rcId) {
        RequestContract updaRequestContract = requestContractRepository.findById(rcId)
                .orElseThrow(
                        () -> new IllegalStateException("Request contract with id " + rcId + " does not exists"));
        updaRequestContract.setStatus(true);
        return getRequestContractDto(updaRequestContract);
    }

    @Override
    public RequestContract updateRequestContract(RequestContract requestContract) {
        return requestContractRepository.save(requestContract);
    }
}
