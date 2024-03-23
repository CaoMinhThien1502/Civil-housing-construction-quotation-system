package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RCDetailDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.model.building.Building;
import com.example.system.model.building.BuildingDetail;
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
    public List<RCDetailDto> findAllDto() {
        List<RequestContract> requestContractList = requestContractRepository.findAll();
        List<RCDetailDto> dtos = new ArrayList<>();
        for (RequestContract rc: requestContractList) {
            dtos.add(findById(rc.getRequestContractId()));
        }
        return dtos;
    }

    @Override
    public List<RequestContractDto> findDtosByEmail(String email) {
        try{
            User u = userRepository.findByEmail(email).orElseThrow();
            List<RequestContract> requestContractList = requestContractRepository.findByUser(u);
            List<RequestContractDto> dtos = new ArrayList<>();
            for (RequestContract rq: requestContractList){
                RequestContractDto dto = getRequestContractDto(rq);
                dtos.add(dto);
            }
            return dtos;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public RCDetailDto findById(Long rcId) {
        try{
            RequestContract rc = requestContractRepository.findById(rcId).orElseThrow();
            RCDetailDto detail = new RCDetailDto();
            detail.setStatus(rc.isStatus());
            detail.setRequestDate(rc.getRequestDate());
            detail.setRequestContractId(rc.getRequestContractId());
            detail.setComboId(rc.getComboBuilding().getComboBuildingId());
            detail.setComboName(rc.getComboBuilding().getComboBuildingName());
            detail.setUserId(rc.getUser().getUserId());
            detail.setUserName(rc.getUser().getName());
            detail.setPhone(rc.getUser().getPhone());
            detail.setEmail(rc.getUser().getEmail());
            detail.setTotalPrice(rc.getTotalPrice());
            detail.setDateMeet(rc.getDateMeet());
            detail.setPlaceMeet(rc.getPlaceMeet());
            BuildingDetailDto bdto = new BuildingDetailDto();
            bdto.setBuildingId(rc.getBuilding().getBuildingId());
            bdto.setLandArea(rc.getBuilding().getArea());
            bdto.setStatus(rc.getBuilding().getStatus());
            bdto.setUserId(rc.getUser().getUserId());
            List<String> itemNames = new ArrayList<>();
            for (BuildingDetail bd: rc.getBuilding().getBuildingDetails()
                 ) {
                itemNames.add(bd.getItem().getItemName());
            }
            bdto.setItemNameList(itemNames);
            detail.setBuildingDto(bdto);


            return detail;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public RequestContractDto getRequestContractDto(RequestContract rc) {
        try{
            RequestContractDto dto = new RequestContractDto();
            dto.setRequestContractId(rc.getRequestContractId());
            dto.setUserId(rc.getUser().getUserId());
            dto.setComboId(rc.getComboBuilding().getComboBuildingId());
            dto.setComboName(rc.getComboBuilding().getComboBuildingName());
            dto.setDateMeet(rc.getDateMeet());
            dto.setPlaceMeet(rc.getPlaceMeet());
            dto.setStatus(rc.isStatus());
            dto.setBuildingDto(buildingService.findByBuilding(rc.getBuilding()));
            return dto;
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public RequestContractDto createRequestContract(BuildingDto dto, Long comboId, Long userId) {
        try{
            RequestContract newData = new RequestContract();
            Building building = buildingService.createBuilding(dto, comboId);
            ComboBuilding combo = comboBuildingRepository.findByComboBuildingId(comboId);
            User user = userRepository.findByUserId(userId);
            newData.setBuilding(building);
            newData.setRequestDate(new Date());
            newData.setComboBuilding(combo);
            newData.setUser(user);
            newData.setStatus(false);
            double total = newData.getBuilding().getArea()*newData.getComboBuilding().getUnitPrice();
            for (BuildingDetail bd: newData.getBuilding().getBuildingDetails()
                 ) {
                total += bd.getItem().getPriceItem();
            }
            newData.setTotalPrice(total);
            newData = requestContractRepository.save(newData);
            RequestContractDto newDto = new RequestContractDto();
            newDto.setBuildingDto(dto);
            newDto.setUserId(newData.getUser().getUserId());
            newDto.setStatus(newData.isStatus());
            newDto.setComboId(newData.getComboBuilding().getComboBuildingId());
            newDto.setRequestContractId(newData.getRequestContractId());
            return newDto;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public RequestContractDto confirmRequestContract(Long rcId, Date dateMeet, String placeMeet) {
        RequestContract updaRequestContract = requestContractRepository.findById(rcId)
                .orElseThrow(
                        () -> new IllegalStateException("Request contract with id " + rcId + " does not exists"));
        updaRequestContract.setStatus(true);
        updaRequestContract.setDateMeet(dateMeet);
        updaRequestContract.setPlaceMeet(placeMeet);
        requestContractRepository.save(updaRequestContract);
        return getRequestContractDto(updaRequestContract);
    }

    @Override
    public RequestContract updateRequestContract(RequestContract requestContract) {
        return requestContractRepository.save(requestContract);
    }
}
