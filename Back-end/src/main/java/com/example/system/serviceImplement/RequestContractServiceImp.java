package com.example.system.serviceImplement;

import com.example.system.dto.requestcontractdto.CreateDto;
import com.example.system.dto.requestcontractdto.RequestDto;
import com.example.system.model.combo.Material;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.combo.ComboBuildingRepository;
import com.example.system.repository.combo.CustomDetailRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.combobuilding.CustomDetailService;
import com.example.system.service.requestContract.RequestContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestContractServiceImp implements RequestContractService {
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Autowired
    CustomDetailRepository customDetailRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ComboBuildingRepository comboBuildingRepository;
    @Autowired
    CustomDetailService customDetailService;
    @Override
    public List<RequestContract> findAll() {
        return requestContractRepository.findAll();
    }

    @Override
    public List<RequestDto> findAllDto() {
        List<RequestContract> requestContractList = requestContractRepository.findAll();
        List<RequestDto> dtos = new ArrayList<>();
        for (RequestContract rc: requestContractList) {
            dtos.add(getRCDto(rc));
        }
        return dtos;
    }
    @Override
    public RequestDto getById(Long rcId) {
        RequestContract rc = requestContractRepository.findById(rcId).orElseThrow();
        return getRCDto(rc);
    }
    @Override
    public List<RequestDto> findDtosByEmail(String email) {
        try{
            User u = userRepository.findByEmail(email).orElseThrow();
            List<RequestContract> requestContractList = requestContractRepository.findByUser(u);
            List<RequestDto> dtos = new ArrayList<>();
            for (RequestContract rq: requestContractList){
                RequestDto dto = getRCDto(rq);
                dtos.add(dto);
            }
            return dtos;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public RequestDto createRequestContract(CreateDto dto) {
        try{
            RequestContract contract = requestContractRepository.findById(dto.getRequestContractId()).orElseThrow();
            contract.setUser(userRepository.findByEmail(dto.getEmail()).orElseThrow());
            contract.setRequestDate(new Date());
            contract.setComboBuilding(comboBuildingRepository.findById(dto.getComboId()).orElseThrow());
            contract.setBuildingDetail(buildingDetailRepository.findById(dto.getBuildingDetailId()).orElseThrow());
            contract.setCustomDetails(customDetailRepository.findAllByRequestContract(contract));
            contract.setPayStatus(false);
            contract.setStatus(false);

            //set timeout
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DATE, 7); // Thêm 7 ngày vào ngày hiện tại
            Date dateAfter7Days = calendar.getTime();
            contract.setTimeoutDate(dateAfter7Days);

            //create custom combo
            customDetailService.makeCustomCombo(dto.getMateIds(), dto.getRequestContractId());

            //price
            Double total = getComboPrice(contract)*contract.getBuildingDetail().getArea();
            contract.setTotalPrice(total);
            return getRCDto(requestContractRepository.save(contract));
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public RequestDto confirmRequestContract(Long rcId, Date dateMeet, String placeMeet) {
        RequestContract updaRequestContract = requestContractRepository.findById(rcId)
                .orElseThrow(
                        () -> new IllegalStateException("Request contract with id " + rcId + " does not exists"));
        if(updaRequestContract.isPayStatus()){
            updaRequestContract.setStatus(true);
            updaRequestContract.setDateMeet(dateMeet);
            updaRequestContract.setPlaceMeet(placeMeet);
            requestContractRepository.save(updaRequestContract);
        }else throw new IllegalStateException("This contract is unpaid");
        return getRCDto(updaRequestContract);
    }

    private RequestDto getRCDto(RequestContract contract){
        RequestDto dto = new RequestDto();
        dto.setRequestContractId(contract.getRequestContractId());
        dto.setRequestDate(contract.getRequestDate());
        dto.setTotalPrice(contract.getTotalPrice());
        dto.setDateMeet(contract.getDateMeet());
        dto.setPlaceMeet(contract.getPlaceMeet());
        dto.setStatus(contract.isStatus());

        dto.setComboId(contract.getComboBuilding().getComboBuildingId());
        dto.setComboName(contract.getComboBuilding().getComboBuildingName());

        dto.setUserId(contract.getUser().getUserId());
        dto.setUserName(contract.getUser().getName());
        dto.setEmail(contract.getUser().getEmail());
        dto.setPhone(contract.getUser().getPhone());

        dto.setBuildingDetail(contract.getBuildingDetail());
        return dto;
    }
    private Double getComboPrice(RequestContract contract){
        Double comboPrice = 0.0;
        List<Material> materials = customDetailService.getMateByRequestContract(contract);
        for (Material m: materials) {
            comboPrice += m.getUnitPrice();
        }
        comboPrice = comboPrice*80/100;
        comboPrice = comboPrice*(contract.getBuildingDetail().getBuilding().getPercentPrice())/100;
        int count = 0;
        if (contract.getBuildingDetail().isHasTunnel()) count++;
        if(contract.getBuildingDetail().getNumOBathroom() > 1) count += contract.getBuildingDetail().getNumOBathroom() - 1;
        if(contract.getBuildingDetail().getNumOBedroom() > 1) count += contract.getBuildingDetail().getNumOBedroom() - 1;
        if(contract.getBuildingDetail().getNumOKitchen() > 1) count += contract.getBuildingDetail().getNumOKitchen() - 1;
        comboPrice = count*(((double) count*3+100)/100);
        return comboPrice;
    }
}
