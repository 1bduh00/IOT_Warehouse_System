package com.example.backend.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;

import lombok.AllArgsConstructor;
import lombok.var;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserDetailsService userDetailsService;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;

    @Override
    public JwtResponse Login(LoginRequest loginRequest) {

        try {
            UserDetails user = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // generate and return JWT token or other authentication token
                var jwt = jwtService.generateToken(user);

                JwtResponse jwtAuthResponse = new JwtResponse();
                jwtAuthResponse.setToken(jwt);

                return jwtAuthResponse;
            }
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
        }
        return null;
    }

}
