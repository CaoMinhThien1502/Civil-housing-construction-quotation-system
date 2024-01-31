package com.example.system.controller;

import com.example.system.auth.AuthenticationRequest;
import com.example.system.auth.AuthenticationResponse;
import com.example.system.auth.RegisterRequest;
import com.example.system.security.AuthenticationService;
import com.example.system.security.LogoutService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final LogoutService logoutService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse a = authenticationService.register(request);
        if (null == a) {
            return ResponseEntity.status(400).body("Email is existed!");
        }
        return ResponseEntity.ok(a);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse a;
        try {
            a = authenticationService.authenticate(request);
        } catch (AuthenticationException e){
            if (e instanceof LockedException){
                return ResponseEntity.status(400)
                        .body("Your account was disabled!");
            } else {
                return ResponseEntity.status(400)
                        .body("The Username or Password is Incorrect!");
            }
        }
        ResponseCookie accessTokenCookie = ResponseCookie.from("access_token", a.getAccessToken())
                .httpOnly(true)
                .maxAge(604800) // 1 week
                .path("/")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", a.getRefreshToken())
                .httpOnly(true)
                .maxAge(604800) // 1 week
                .path("/")
                .build();
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        return ResponseEntity.ok().body("Logout successfully");
    }
}