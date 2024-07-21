package com.employe.Configuration.Security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class GestionAccesNonAuthorise implements AuthenticationEntryPoint {

    private static final String ACCES_NON_AUTHORISE = "Accès non authorisé, auhtentification requise";
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(ACCES_NON_AUTHORISE);
    }
}
