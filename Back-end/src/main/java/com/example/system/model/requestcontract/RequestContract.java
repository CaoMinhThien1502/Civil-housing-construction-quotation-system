package com.example.system.model.requestcontract;

import com.example.system.model.building.Building;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "request_contract")
public class RequestContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestContractId;
    private boolean status; //false: đang xử lý // true: đã xử lý
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date requestDate;
    @ManyToOne
    @JoinColumn(name = "combo_building_id")
    @JsonIgnore
    private ComboBuilding comboBuilding;
    @ManyToOne
    @JoinColumn(name = "building_id")
    @JsonIgnore
    private Building building;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
