package com.example.system.model.user;

import com.example.system.model.blog.Blog;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.token.Token;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
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
    @OneToMany(mappedBy = "user")
    private Set<RequestContract> requestContracts;
    @OneToMany(mappedBy = "user")
    private Set<Blog> blogs;
}
