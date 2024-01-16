package com.example.system.repository.combo;

import com.example.system.model.combo.ComboBuilding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComboBuildingRepository extends JpaRepository<ComboBuilding, Long> {
}
