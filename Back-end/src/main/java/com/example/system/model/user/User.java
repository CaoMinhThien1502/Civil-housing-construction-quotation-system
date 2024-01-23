package com.example.system.model.user;

import com.example.system.model.blog.Blog;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String userName;
    @Column(nullable = false, columnDefinition = "varchar(100)")
    private String password;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(nullable = false)
    private boolean status;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String address;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String firstName;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String lastName;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(columnDefinition = "varchar(150)")
    private LocalDate birthday;
    private boolean gender;
    @OneToMany(mappedBy = "user")
    private Set<Token> tokens;
    @OneToMany(mappedBy = "user")
    private Set<RequestContract> requestContracts;
    @OneToMany(mappedBy = "user")
    private Set<Blog> blogs;
}
