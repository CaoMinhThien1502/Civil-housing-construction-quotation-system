package com.example.system.model.building;

import com.example.system.model.requestcontract.RequestContract;
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
    @Column(nullable = false)
    private Double area;
    private int status; //-1: mẫu /  0: hủy /  1: đang thi công /  2 : đã xong
    @OneToMany(mappedBy = "building")
    private Set<BuildingDetail> buildingDetail;
    @OneToMany(mappedBy = "building")
    private Set<RequestContract> requestContracts;
}
