package com.employe.Configuration.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class AuthentificationFilter extends OncePerRequestFilter {

    private static final String LOGIN_URI = "/api/auth/login";
    private static final String BAD_REQUEST = "Mauvaise requête, type de contenu ou paramètres manquant ou invalide";

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(LOGIN_URI) && request.getMethod().equals("POST")) {
            try {
                String nomUtilisateur = request.getParameter("username");
                String motDePasse = request.getParameter("password");
                if (nomUtilisateur == null || nomUtilisateur.isEmpty()
                        || motDePasse == null || motDePasse.isEmpty()
                ) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write(BAD_REQUEST);
                    return;
                }
            } catch (Exception e) {
                //System.out.println(e.getMessage());
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(BAD_REQUEST + ", " + e.getMessage());
                return;
            }
        }
        filterChain.doFilter(request, response);
        }
}
