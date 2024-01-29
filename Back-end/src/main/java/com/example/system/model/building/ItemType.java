package com.example.system.model.building;

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
@Table(name = "item_type")
public class ItemType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemTypeId;
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String itemTypeName;
    @OneToMany(mappedBy = "itemType")
    private Set<Item> items;
    private boolean status;
}
