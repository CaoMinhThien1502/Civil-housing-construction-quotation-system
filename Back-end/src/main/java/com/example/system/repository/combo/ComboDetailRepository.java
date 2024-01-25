package com.example.system.repository.combo;

import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.combo.ComboDetail;
import com.example.system.model.combo.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComboDetailRepository extends JpaRepository<ComboDetail, Long> {
    List<ComboDetail> findByComboBuilding(ComboBuilding comboBuilding);
}
