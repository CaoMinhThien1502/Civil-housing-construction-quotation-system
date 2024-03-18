package com.example.system.model.building;

import com.example.system.model.requestcontract.RequestContract;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date startDate; // thêm status sang 1
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date checkDate; // khi status == 1
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date finishDate; // thêm thì status sang 2
    private int status; //khi request contract được tạo -1: mẫu
                        //khi request contract qua timeout  0: hủy
                        // 1: đang thi công /  2 : đã xong

    @OneToMany(mappedBy = "building")
    private Set<BuildingDetail> buildingDetails;
    @OneToMany(mappedBy = "building")
    private Set<RequestContract> requestContracts;
}
