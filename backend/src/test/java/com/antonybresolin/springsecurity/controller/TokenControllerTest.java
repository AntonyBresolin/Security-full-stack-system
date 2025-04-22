package com.antonybresolin.springsecurity.controller;

import com.antonybresolin.springsecurity.controller.dto.LoginRequest;
import com.antonybresolin.springsecurity.entities.Role;
import com.antonybresolin.springsecurity.entities.User;
import com.antonybresolin.springsecurity.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TokenControllerTest {

    @Mock
    private JwtEncoder jwtEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private HttpServletResponse response;

    private TokenController tokenController;
    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        tokenController = new TokenController(jwtEncoder, userRepository, passwordEncoder);

        mockUser = new User();
        mockUser.setUsername("testuser");
        mockUser.setPassword("encoded_password");

        Role role = new Role();
        role.setName("BASIC");
        mockUser.setRoles(Set.of(role));

        Jwt jwtMock = mock(Jwt.class);
        when(jwtMock.getTokenValue()).thenReturn("test.jwt.token");
        when(jwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwtMock);
    }

    @Test
    void login_ValidCredentials_ReturnsToken() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("testuser", "password123");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(eq(loginRequest.password()), eq(mockUser.getPassword())))
                .thenReturn(true);

        // Act
        ResponseEntity<Map<String, String>> responseEntity = tokenController.login(loginRequest, response);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCode().value());
        assertTrue(responseEntity.getBody().containsKey("accessToken"));
        verify(response).addCookie(any(Cookie.class));
    }

    @Test
    void login_InvalidCredentials_ThrowsBadCredentialsException() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("testuser", "wrongpassword");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(eq(loginRequest.password()), any()))
                .thenReturn(false);

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            tokenController.login(loginRequest, response);
        });
    }

    @Test
    void login_UserNotFound_ThrowsBadCredentialsException() {
        LoginRequest loginRequest = new LoginRequest("nonexistentuser", "password123");
        when(userRepository.findByUsername("nonexistentuser")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            tokenController.login(loginRequest, response);
        });
    }

    @Test
    void logout_ClearsUserCookie() {
        ResponseEntity<Map<String, String>> responseEntity = tokenController.logout(response);

        assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCode().value());
        assertEquals("Logout successful", responseEntity.getBody().get("message"));

        verify(response).addCookie(argThat(cookie ->
                cookie.getName().equals("accessToken") &&
                        cookie.getValue() == null &&
                        cookie.getMaxAge() == 0
        ));
    }
}