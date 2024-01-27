package com.example.system.service.requestContract;

import com.example.system.model.building.Building;
import com.example.system.model.requestcontract.RequestContract;

import java.util.List;

public interface RequestContractService {
    RequestContract getByBuilding(Building building);

    List<RequestContract> findAll();

    RequestContract createRequestContract(RequestContract requestContract);
    RequestContract updateRequestContract(RequestContract requestContract);
}
