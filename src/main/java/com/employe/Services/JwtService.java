package com.employe.Services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {

    private static final Date DATE_EXPIRATION = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5); // 5 heures

    private final String SECRET_KEY =
            Base64.getEncoder()
                    .encodeToString(
                            Keys.secretKeyFor(SignatureAlgorithm.HS256)
                                    .getEncoded()
                    );

    public String genererJwtLogin(String idEmploye, String nomComplet, String role, LocalDate dateEmbauche) {
        return JWT.create()
                .withSubject("Données de l'employé")
                .withClaim("idEmploye", idEmploye)
                .withClaim("nomComplet", nomComplet)
                .withClaim("role", role)
                .withClaim("dateEmbauche", dateEmbauche.toString())
                .withExpiresAt(DATE_EXPIRATION)
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }
}
