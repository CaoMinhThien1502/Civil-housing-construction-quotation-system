package com.example.system.model.building;import com.fasterxml.jackson.annotation.JsonIgnore;import jakarta.persistence.*;import lombok.AllArgsConstructor;import lombok.Getter;import lombok.NoArgsConstructor;import lombok.Setter;import java.util.Set;@Getter@Setter@AllArgsConstructor@NoArgsConstructor@Entity@Table(name = "item")public class Item {    @Id    @GeneratedValue(strategy = GenerationType.IDENTITY)    private Long itemId;    private String itemName;    private Double priceItem;    @ManyToOne    @JoinColumn(name = "item_type_id")    @JsonIgnore    private ItemType itemType;    @OneToMany(mappedBy = "item")    private Set<BuildingDetail> buildingDetail;}