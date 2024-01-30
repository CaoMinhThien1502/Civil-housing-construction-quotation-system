package com.example.system.serviceImplement;

import com.example.system.dto.userdto.UserDto;
import com.example.system.model.user.User;
import com.example.system.repository.user.UserRepository;
import com.example.system.service.user.UserService;
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
    @Override
    public UserDto getProfile() {
        UserDto profile = new UserDto();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUserName(userDetails.getUsername());
        profile.setAddress(user.getAddress());
        profile.setBirthday(user.getBirthday());
        profile.setUserId(user.getUserId());
        //profile.setFullName(user.getLastName()+" "+user.getFirstName());
        profile.setFirstName(user.getFirstName());
        profile.setLastName(user.getLastName());
        profile.setEmail(user.getEmail());
        profile.setGender(user.isGender());
        profile.setPhone(user.getPhone());
        profile.setRole(user.getRole());
        profile.setStatus(user.isStatus());
        return profile;
    }

    @Override
    public UserDto updateProfile(UserDto dto) {
        try{
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userRepository.findByUserName(userDetails.getUsername());
            user.setAddress(dto.getAddress());
            user.setGender(dto.isGender());
            user.setEmail(dto.getEmail());
            user.setBirthday(dto.getBirthday());
            user.setPhone(dto.getPhone());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            userRepository.save(user);
            return getProfile();
        }catch (Exception e){
            return null;
        }


    }
}
