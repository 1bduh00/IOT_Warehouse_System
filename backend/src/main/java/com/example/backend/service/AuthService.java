package com.example.backend.service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.LoginRequest;

public interface AuthService {

    JwtResponse Login(LoginRequest loginRequest);
}
