package com.example.system.controller;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.dto.userdto.UserDto;
import com.example.system.model.combo.Material;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import com.example.system.service.requestContract.RequestContractService;
import com.example.system.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
    @Autowired
    UserService userService;

    @GetMapping("/request-contract/list")
    public ResponseEntity<List<RequestContractDto>> getRequestContracts(){
        List<RequestContractDto> list = requestContractService.findAllDto();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/request-contract/get/id")
    public ResponseEntity<RequestContractDto> getRequestContractById(Long id){
        RequestContractDto dto = requestContractService.findById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/request-contract/list/id")
    public ResponseEntity<List<RequestContractDto>> getRequestContractsById(@RequestParam String email){
        List<RequestContractDto> list = requestContractService.findDtosByEmail(email);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/request-contract/create")
    public ResponseEntity<RequestContractDto> createRequestContract(@RequestBody BuildingDto bdto, @RequestParam Long comboId, @RequestParam String email){
        //User auth = new User();
        UserDto udto = userService.getProfile(email);
        RequestContractDto dto = requestContractService.createRequestContract(bdto, comboId, udto.getUserId());
        return ResponseEntity.ok(dto);
    }
    @PostMapping("/request-contract/comfirm")
    public ResponseEntity<RequestContractDto> comfirmRequestContract(@RequestParam Long requestContractId){
        RequestContractDto dto = requestContractService.confirmRequestContract(requestContractId);
        return ResponseEntity.ok(dto);
    }

}
