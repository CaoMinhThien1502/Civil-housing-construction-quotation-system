package com.example.system.service.requestContract;

import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.model.building.Building;
import com.example.system.model.requestcontract.RequestContract;

import java.util.List;

public interface RequestContractService {
    RequestContract getByBuilding(Building building);
    List<RequestContract> findAll();
    List<RequestContractDto> findAllDto();
    List<RequestContractDto> findDtosByEmail(String email);
    RequestContractDto findById(Long rcId);
    RequestContractDto getRequestContractDto(RequestContract rc);
    RequestContractDto createRequestContract(BuildingDto dto, Long comboId, Long userId);
    RequestContractDto confirmRequestContract(Long rcId);
    RequestContract updateRequestContract(RequestContract requestContract);
}
