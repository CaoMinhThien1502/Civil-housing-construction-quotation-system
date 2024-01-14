package com.example.system.combo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "combo_building")
public class ComboBuilding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comboBuildingId;
    private String comboBuildingName;
    private Double unitPrice;
    @OneToMany(mappedBy = "comboBuilding")
    Set<ComboDetail> comboDetails;
}
