package com.example.system.controller;


import com.example.system.dto.buildingdto.ItemTypeDto;
import com.example.system.dto.userdto.UserDto;
import com.example.system.model.user.User;
import com.example.system.repository.user.UserRepository;
import com.example.system.security.JwtService;
import com.example.system.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @GetMapping("/list")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(){
        UserDto profile = userService.getProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto dto){
        UserDto profile = userService.updateProfile(dto);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/userlogin")
    public ResponseEntity<UserDto> getUserLogin(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getUserLoginFromJWT(request));
    }

}
