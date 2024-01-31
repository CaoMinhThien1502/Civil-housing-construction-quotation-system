package com.example.system.service.user;

import com.example.system.dto.userdto.UserDto;
import com.example.system.model.user.User;

public interface UserService {
    UserDto getProfile();
    UserDto updateProfile(UserDto dto);

}
