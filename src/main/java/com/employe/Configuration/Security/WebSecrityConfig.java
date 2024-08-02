package com.employe.Configuration.Security;

import com.employe.Models.Employe;
import com.employe.Services.JwtService;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecrityConfig {

    private final AuthentificationFilter authentificationFilter;
    private final JwtService jwtService;
    private final GestionAccesNonAuthorise gestionAccesNonAuthorise;

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            Employe employeAuthentifie = ((Employe) authentication.getPrincipal());
            String jwt = jwtService.genererJwtLogin(
                    employeAuthentifie.getId().toString(),
                    employeAuthentifie.getPrenom() + " " + employeAuthentifie.getNom(),
                    employeAuthentifie.getRole().name(),
                    employeAuthentifie.getDateEmbauche()
            );
            response.setStatus(200);
            response.getWriter().write(jwt);
        };
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            response.setStatus(200); // Réponse vide ("") → Mauvais username/mot de passe
            //response.getWriter().write(exception.getLocalizedMessage());
        };
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return (request, response, authentication) -> {
            if (authentication != null && authentication.isAuthenticated()) {
                // L'utilisateur est authentifié, procéder à la déconnexion normalement
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("Déconnexion réussie");
            } else {
                // L'utilisateur n'est pas authentifié, renvoyer un code d'état différent
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Aucune session active à déconnecter");
            }
            response.getWriter().flush();
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(@NonNull HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(gestionAccesNonAuthorise))
                .authorizeHttpRequests(requests -> requests
                        .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/inscription").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/auth/authentifie").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/api/auth/login")
                        .successHandler(authenticationSuccessHandler())
                        .failureHandler(authenticationFailureHandler())

                )
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessHandler(logoutSuccessHandler())
                );
        http.addFilterBefore(authentificationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
