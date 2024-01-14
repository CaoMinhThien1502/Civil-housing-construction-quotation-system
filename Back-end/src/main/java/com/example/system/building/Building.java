package com.example.system.building;

import com.example.system.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "building")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buildingId;
    private String buildingName;
    private String description;
    private Double length;
    private Double width;
    private int status;
    @OneToMany(mappedBy = "building")
    private Set<BuildingDetail> buildingDetail;
}
