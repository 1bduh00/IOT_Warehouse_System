package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.service.AuthService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.Login(loginRequest));
    }

}
