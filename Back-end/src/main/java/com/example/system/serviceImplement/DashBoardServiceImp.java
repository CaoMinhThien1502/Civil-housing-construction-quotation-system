package com.example.system.serviceImplement;

import com.example.system.dto.dashboarddto.DashboardDto;
import com.example.system.dto.dashboarddto.NumOfItemChoice;
import com.example.system.model.building.BuildingDetail;
import com.example.system.model.building.Item;
import com.example.system.repository.building.BuildingDetailRepository;
import com.example.system.repository.building.ItemRepository;
import com.example.system.repository.combo.MaterialRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.dashboard.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @Autowired
    BuildingDetailRepository buildingDetailRepository;
    @Override
    public DashboardDto getNumbers() {
        try{
            DashboardDto dashboardDto = new DashboardDto();
            dashboardDto.setItemCount(Long.valueOf(itemRepository.findAll().size()));
            dashboardDto.setMaterialCount(Long.valueOf(materialRepository.findAll().size()));
            dashboardDto.setRequestContractCount(Long.valueOf(requestContractRepository.findAll().size()));
            dashboardDto.setUserCount(Long.valueOf(userRepository.findAll().size()));

            List<NumOfItemChoice> listItemChoice = new ArrayList<>();


            Set<Long> uniqueItemIds = new HashSet<>();
            List<BuildingDetail> buildingDetails = buildingDetailRepository.findAll();
            // Lặp qua danh sách và chỉ thêm các mục có item_id duy nhất vào danh sách đã lọc
            for (BuildingDetail b : buildingDetails) {
                uniqueItemIds.add(b.getItem().getItemId());
            }
            NumOfItemChoice numOfItemChoice;
            for (Long i:uniqueItemIds) {
                List<BuildingDetail> numberOfItem = buildingDetailRepository.findByItemId(i);
                Item item = itemRepository.findByItemId(i);
                numOfItemChoice = new NumOfItemChoice(item.getItemName(), numberOfItem.size());
               listItemChoice.add(numOfItemChoice);
            }
            dashboardDto.setListItemChoice(listItemChoice);
            return dashboardDto;
        }catch (Exception e){
            return null;
        }
    }
}
