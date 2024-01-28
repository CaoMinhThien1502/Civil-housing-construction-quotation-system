package com.example.system.model.user;

import com.example.system.model.blog.Blog;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {
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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    private boolean gender;
    @OneToMany(mappedBy = "user")
    private Set<Token> tokens;
    @OneToMany(mappedBy = "user")
    private Set<RequestContract> requestContracts;
    @OneToMany(mappedBy = "user")
    private Set<Blog> blogs;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
