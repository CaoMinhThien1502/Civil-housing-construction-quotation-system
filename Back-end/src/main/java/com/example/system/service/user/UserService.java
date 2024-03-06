package com.example.system.service.user;

import com.example.system.dto.userdto.UserDto;
import com.example.system.model.user.Role;
import com.example.system.model.user.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    List<UserDto> getUserList();
    UserDto getProfile();
    UserDto updateProfile(UserDto dto, HttpServletRequest request);

    UserDto updateRole(Long id, Role role);
    UserDto getUserLoginFromJWT(HttpServletRequest request);
}
