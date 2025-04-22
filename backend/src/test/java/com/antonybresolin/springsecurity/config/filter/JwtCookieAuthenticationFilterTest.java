package com.antonybresolin.springsecurity.config.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtCookieAuthenticationFilterTest {

    @Mock
    private JwtDecoder jwtDecoder;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    private JwtCookieAuthenticationFilter filter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        filter = new JwtCookieAuthenticationFilter(jwtDecoder);
        SecurityContextHolder.clearContext();
    }

    @Test
    void doFilterInternal_WithValidCookie_SetsAuthentication() throws Exception {
        Cookie tokenCookie = new Cookie("accessToken", "valid.jwt.token");
        Cookie[] cookies = new Cookie[] { tokenCookie };
        when(request.getCookies()).thenReturn(cookies);

        Jwt jwt = mock(Jwt.class);
        Map<String, Object> claims = new HashMap<>();
        claims.put("scope", "ADMIN BASIC");
        when(jwt.getClaims()).thenReturn(claims);
        when(jwt.getSubject()).thenReturn("testuser");
        when(jwtDecoder.decode("valid.jwt.token")).thenReturn(jwt);
        when(jwt.getClaim("scope")).thenReturn("ADMIN BASIC");

        filter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals("testuser", SecurityContextHolder.getContext().getAuthentication().getName());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilterInternal_WithNoCookies_DoesNotSetAuthentication() throws Exception {
        when(request.getCookies()).thenReturn(null);

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilterInternal_WithInvalidToken_DoesNotSetAuthentication() throws Exception {
        Cookie tokenCookie = new Cookie("accessToken", "invalid.jwt.token");
        Cookie[] cookies = new Cookie[] { tokenCookie };
        when(request.getCookies()).thenReturn(cookies);

        when(jwtDecoder.decode("invalid.jwt.token")).thenThrow(new RuntimeException("Invalid token"));

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }
}