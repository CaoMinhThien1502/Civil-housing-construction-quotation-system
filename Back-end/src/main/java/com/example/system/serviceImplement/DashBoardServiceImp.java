package com.example.system.serviceImplement;

import com.example.system.dto.dashboarddto.DashboardDto;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.dashboard.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImp implements DashBoardService {
    @Autowired
    MaterialRepository materialRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    RequestContractRepository requestContractRepository;
    @Autowired
    UserRepository userRepository;
    @Override
    public DashboardDto getNumbers() {
        try{
            DashboardDto dashboardDto = new DashboardDto();
            dashboardDto.setItemCount(itemRepository.findAll().size());
            dashboardDto.setMaterialCount(materialRepository.findAll().size());
            dashboardDto.setRequestContractCount(requestContractRepository.findAll().size());
            dashboardDto.setUserCount(userRepository.findAll().size());
            return dashboardDto;
        }catch (Exception e){
            return null;
        }
    }
}
