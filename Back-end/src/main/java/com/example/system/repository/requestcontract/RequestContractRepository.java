package com.example.system.repository.requestcontract;

import com.example.system.model.requestcontract.RequestContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestContractRepository extends JpaRepository<RequestContract, Long>{

}
