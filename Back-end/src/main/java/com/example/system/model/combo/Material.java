package com.example.system.model.combo;

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
    @Column(nullable = false, columnDefinition = "varchar(255)", unique = true)
    private String materialName;
    @Column(nullable = false)
    private Double unitPrice;
    @ManyToOne
    @JoinColumn(name = "material_type_id")
    @JsonIgnore
    private MaterialType materialType;
    @OneToMany(mappedBy = "material")
    Set<ComboDetail> comboDetails;

}
