package com.example.system.user;

import com.example.system.building.Building;
import com.example.system.token.Token;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean status;
    private String phone;
    private String address;
    private String firstName;
    private String lastName;
    private Date birthday;
    private boolean gender;
    @OneToMany(mappedBy = "user")
    private Set<Token> tokens;
}
