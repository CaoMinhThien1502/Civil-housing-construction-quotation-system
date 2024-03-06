package com.example.system.serviceImplement;

import com.example.system.dto.userdto.UserDto;
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

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    private final JwtService jwtService;

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
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userRepository.findByName(userDetails.getUsername());
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
