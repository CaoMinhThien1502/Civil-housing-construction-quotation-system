package com.example.system.serviceImplement;

import com.example.system.model.building.Building;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.requestContract.RequestContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestContractServiceImp implements RequestContractService {
    @Autowired
    RequestContractRepository requestContractRepository;
    @Override
    public RequestContract getByBuilding(Building building) {
        return requestContractRepository.findByBuilding(building);
    }

    @Override
    public List<RequestContract> findAll() {
        return requestContractRepository.findAll();
    }

    @Override
    public RequestContract createRequestContract(RequestContract requestContract) {
        return requestContractRepository.save(requestContract);
    }

    @Override
    public RequestContract updateRequestContract(RequestContract requestContract) {
        return requestContractRepository.save(requestContract);
    }
}
