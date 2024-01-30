package com.example.system.dto.userdto;

import com.example.system.model.blog.Blog;
import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.token.Token;
import com.example.system.model.user.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    //private String fullName;//private String firstName + lastName;
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;
    private Role role;
    private String phone;
    private String address;
    private Date birthday;
    private boolean gender;
    private boolean status;
}
