package com.example.system.controller;


import com.example.system.dto.buildingdto.ItemTypeDto;
import com.example.system.model.user.User;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//    @GetMapping("/profile")
//    public ResponseEntity<User> getProfile(){
//        User user = new User();
//        return ResponseEntity.ok(user);
//    }
}
