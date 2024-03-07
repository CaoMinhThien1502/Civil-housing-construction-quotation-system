package com.example.system.serviceImplement;

import com.example.system.dto.userdto.UserDto;
import com.example.system.model.user.Role;
import com.example.system.model.user.User;
import com.example.system.repository.user.UserRepository;
import com.example.system.security.JwtService;
import com.example.system.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public List<UserDto> getUserList() {
        try{
            List<User> users = userRepository.findAll();
            List<UserDto> dtos = new ArrayList<>();
            for (User u: users
                 ) {
                UserDto dto = new UserDto();
                dto.setUserId(u.getUserId());
                dto.setEmail(u.getEmail());
                dto.setGender(u.isGender());
                dto.setPhone(u.getPhone());
                dto.setAddress(u.getAddress());
                dto.setBirthday(u.getBirthday());
                dto.setRole(u.getRole());
                dto.setFullName(u.getName());
                dto.setStatus(u.isStatus());
                dtos.add(dto);
            }
            return dtos;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public UserDto getProfile() {
        UserDto profile = new UserDto();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByName(userDetails.getUsername());
        profile.setAddress(user.getAddress());
        profile.setBirthday(user.getBirthday());
        profile.setUserId(user.getUserId());
        profile.setFullName(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setGender(user.isGender());
        profile.setPhone(user.getPhone());
        profile.setRole(user.getRole());
        profile.setStatus(user.isStatus());
        return profile;
    }

    @Override
    public UserDto updateProfile(UserDto dto, HttpServletRequest request) {
        try {
            String accessTokenFromCookie = jwtService.extractAccessTokenFromCookie(request);
            if(accessTokenFromCookie == null){
                return null;
            }
            String userEmail = jwtService.extractUsername(accessTokenFromCookie);
            User user = userRepository.findByEmail(userEmail).orElseThrow();
            user.setAddress(dto.getAddress());
            user.setGender(dto.isGender());
            user.setEmail(dto.getEmail());
            user.setBirthday(dto.getBirthday());
            user.setPhone(dto.getPhone());
            user.setName(dto.getFullName());
            userRepository.save(user);
            return getUserLoginFromJWT(request);
        } catch (Exception e) {
            return null;
        }


    }

    @Override
    public UserDto updateRole(Long id, Role role) {
        try{
            User u = userRepository.findByUserId(id);
            u.setRole(role);
            UserDto dto = new UserDto(u.getUserId(), u.getName(),"", u.getEmail(), u.getRole(),u.getPhone(),u.getAddress(),u.getBirthday(),u.isGender(),u.isStatus());
            return dto;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public UserDto getUserLoginFromJWT(HttpServletRequest request) {
        String accessTokenFromCookie = jwtService.extractAccessTokenFromCookie(request);
        if(accessTokenFromCookie == null){
            return null;
        }
        String userEmail = jwtService.extractUsername(accessTokenFromCookie);
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return new UserDto(user.getUserId(), user.getName(), user.getPassword(), user.getEmail(), user.getRole(), user.getPhone(), user.getAddress(), user.getBirthday(), user.isGender(), user.isStatus());
    }
}
