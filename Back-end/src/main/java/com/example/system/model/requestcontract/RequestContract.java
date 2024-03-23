package com.example.system.model.requestcontract;

import com.example.system.model.building.Building;
import com.example.system.model.combo.ComboBuilding;
import com.example.system.model.payment.Invoice;
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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date requestDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date timeoutDate; //qua time này sẽ xóa request
    @Column(nullable = true)
    private Double totalPrice;
    @Column(nullable = false)
    private boolean status; //false: đang xử lý // true: đã xử lý

    @Column(nullable = true)
    private String placeMeet;
//    @Column(nullable = true)
//    private String dateMeet;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date dateMeet; //qua time này sẽ xóa request

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "invoice_id", referencedColumnName = "invoiceId")
    private Invoice invoice;
}
