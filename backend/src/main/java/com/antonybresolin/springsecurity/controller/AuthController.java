package com.antonybresolin.springsecurity.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(("/auth"))
public class AuthController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(JwtAuthenticationToken token) {
        if (token != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("username", token.getName());

            Collection<String> roles = token.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            response.put("roles", roles);

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
    }
}
