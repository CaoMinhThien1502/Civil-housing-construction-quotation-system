package com.example.system.dto.combodto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComboRequestDto {
    private String comboBuildingName;
    private int status;
    private Set<String> materialIdList;
}