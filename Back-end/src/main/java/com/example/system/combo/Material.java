package com.example.system.combo;

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
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;
    private String materialName;
    private int quantity;
    private Double unitPrice;
    @ManyToOne
    @JoinColumn(name = "material_type_id")
    @JsonIgnore
    private MaterialType materialType;
    @OneToMany(mappedBy = "material")
    Set<ComboDetail> comboDetails;

}
