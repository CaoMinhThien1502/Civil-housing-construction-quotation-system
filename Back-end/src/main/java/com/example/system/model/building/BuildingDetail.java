package com.example.system.model.building;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "building_detail")
public class BuildingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buildingDetailId;
    @ManyToOne
    @JoinColumn(name = "building_id")
    @JsonIgnore
    private Building building;
    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonIgnore
    private Item item;

}
