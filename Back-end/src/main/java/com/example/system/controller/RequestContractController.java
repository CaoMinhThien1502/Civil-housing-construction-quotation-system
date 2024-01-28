package com.example.system.controller;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.model.combo.Material;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import com.example.system.service.requestContract.RequestContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request-contract")
@RequiredArgsConstructor
public class RequestContractController {

    @Autowired
    RequestContractService requestContractService;
    @GetMapping("/request-contract/get")
    public ResponseEntity<List<RequestContractDto>> getRequestContracts(){
        List<RequestContractDto> list = requestContractService.findAllDto();
        return ResponseEntity.ok(list);
    }

//    @PostMapping("/request-contract/create")
//    public ResponseEntity<RequestContractDto> createRequestContracts(@RequestBody BuildingDto bdto, @RequestParam Long comboId, @RequestParam Long userId){
//        //User auth = new User();
//        RequestContractDto dto = requestContractService.createRequestContract(bdto, comboId, userId);
//        return ResponseEntity.ok(dto);
//    }

}
