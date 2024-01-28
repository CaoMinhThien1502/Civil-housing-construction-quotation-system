package com.example.system.model.building;import com.fasterxml.jackson.annotation.JsonIgnore;import jakarta.persistence.*;import lombok.AllArgsConstructor;import lombok.Getter;import lombok.NoArgsConstructor;import lombok.Setter;import java.util.Set;@Getter@Setter@AllArgsConstructor@NoArgsConstructor@Entity@Table(name = "item")public class Item {    @Id    @GeneratedValue(strategy = GenerationType.IDENTITY)    private Long itemId;    @Column(nullable = false, columnDefinition = "varchar(255)")    private String itemName;    @Column(nullable = false)    private Long priceItem;    @ManyToOne    @JoinColumn(name = "item_type_id")    @JsonIgnore    private ItemType itemType;    @OneToMany(mappedBy = "item")    @JsonIgnore    private Set<BuildingDetail> buildingDetail;}