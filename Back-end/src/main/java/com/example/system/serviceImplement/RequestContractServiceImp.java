package com.example.system.serviceImplement;

import com.example.system.dto.buildingdto.BuildingDetailDto;
import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.dto.requestcontractdto.RCDetailDto;
import com.example.system.dto.requestcontractdto.RequestContractDto;
import com.example.system.mail.EmailSender;
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
import com.example.system.validator.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
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
    private final EmailValidator emailValidator;
    private final EmailSender emailSender;
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
        String subject = "Confirm your construction quotes";
        emailSender.send(
                updaRequestContract.getUser().getEmail(),
                buildEmail(updaRequestContract, dateMeet, placeMeet),
                subject
        );
        return getRequestContractDto(updaRequestContract);
    }

    @Override
    public RequestContract updateRequestContract(RequestContract requestContract) {
        return requestContractRepository.save(requestContract);
    }

    private String buildEmail(RequestContract requestContract, Date dateMeet, String placeMeet) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = dateFormat.format(dateMeet);
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\">Chào bạn,</p>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\">Chúng tôi rất vui thông báo rằng yêu cầu của bạn về dự án thi công xây dựng đã được xác nhận.</p>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\"><strong>Thông tin chi tiết về cuộc họp như sau:</strong></p>" +
                "<ul style=\"Margin:0;padding:0 0 20px 20px;font-size:16px;line-height:22px;color:#0b0c0c\">" +
                "<li>Yêu cầu số <strong>" + requestContract.getRequestContractId() + "</strong> đã được xác nhận</li>" +
                "<li>Địa điểm gặp mặt: <strong>" + placeMeet + "</strong></li>" +
                "<li>Thời gian: <strong>" + formattedDate + "</strong></li>" +
                "</ul>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\">Rất mong bạn có mặt đúng giờ. Xin cảm ơn bạn đã hợp tác.</p>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\"><strong>Lưu ý:</strong> Nếu bạn không đến hoặc trễ hơn 30 phút, yêu cầu hẹn sẽ bị hủy và bạn sẽ mất 200k tiền đã đặt cọc.</p>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\">Trân trọng,</p>" +
                "<p style=\"Margin:0 0 20px 0;font-size:16px;line-height:22px;color:#0b0c0c\">[CILVIL HOUSING]</p>" +
                "</div>";
    }
}
