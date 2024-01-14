package com.example.system.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    //    ADMIN_READ("admin:read"),
//    ADMIN_UPDATE("admin:update"),
//    ADMIN_CREATE("admin:create"),
//    ADMIN_DELETE("admin:delete"),
//    MANAGER_READ("manager:read"),
//    MANAGER_UPDATE("manager:update"),
//    MANAGER_CREATE("manager:create"),
//    MANAGER_DELETE("manager:delete")
    ADMIN_FULLACCESS("admin:fullaccess"),
    MANAGER_FULLACCSESS("manager:fullaccess")
    ;
    @Getter
    private final String permission;
}
