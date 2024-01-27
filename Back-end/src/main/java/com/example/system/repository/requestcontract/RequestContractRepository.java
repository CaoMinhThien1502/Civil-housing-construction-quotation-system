package com.example.system.repository.requestcontract;

import com.example.system.model.building.Building;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestContractRepository extends JpaRepository<RequestContract, Long>{
    RequestContract findByBuilding(Building building);

    @Override
    List<RequestContract> findAll();

    List<RequestContract> findByUser(User user);
}
