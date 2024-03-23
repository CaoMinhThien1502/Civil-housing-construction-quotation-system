package com.example.system.controller;

import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RCDetailDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.dto.userdto.UserDto;
import com.example.system.service.requestContract.RequestContractService;
import com.example.system.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/request-contract")
@RequiredArgsConstructor
public class RequestContractController {

    @Autowired
    RequestContractService requestContractService;
    @Autowired
    UserService userService;

    @GetMapping("/request-contract/list")
    public ResponseEntity<List<RCDetailDto>> getRequestContracts(){
        List<RCDetailDto> list = requestContractService.findAllDto();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/request-contract/get/id")
    public ResponseEntity<RCDetailDto> getRequestContractById(@RequestParam Long id){
        RCDetailDto dto = requestContractService.findById(id);
        return ResponseEntity.ok(dto);
    }
    

    @GetMapping("/request-contract/list/email")
    public ResponseEntity<List<RequestContractDto>> getRequestContractsByEmail(@RequestParam String email){
        List<RequestContractDto> list = requestContractService.findDtosByEmail(email);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/request-contract/create")
    public ResponseEntity<RequestContractDto> createRequestContract(@RequestBody BuildingDto bdto, @RequestParam Long comboId, @RequestParam String email){
        UserDto udto = userService.getProfile(email);
        RequestContractDto dto = requestContractService.createRequestContract(bdto, comboId, udto.getUserId());
        return ResponseEntity.ok(dto);
    }
    @PostMapping("/request-contract/comfirm")
    public ResponseEntity<RequestContractDto> comfirmRequestContract(@RequestParam Long requestContractId,
                                                                     @RequestBody Map<String, String> requestData){
        // Lấy ngày tháng từ Map
        String dateMeetString = requestData.get("dateMeet");
        // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dateMeet = null;
        try {
            dateMeet = dateFormat.parse(dateMeetString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String placeMeet = requestData.get("placeMeet");
        RequestContractDto dto = requestContractService.confirmRequestContract(requestContractId, dateMeet, placeMeet);
        return ResponseEntity.ok(dto);
    }

}
