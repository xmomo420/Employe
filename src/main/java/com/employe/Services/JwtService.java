package com.employe.Services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

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

    public String genererJwt(String idEmploye, String nomUtilisateur, String motDePasse) {
        return JWT.create()
                .withSubject("User credentials")
                .withClaim("idEmploye", idEmploye)
                .withClaim("nomUtilisateur",nomUtilisateur)
                .withClaim("motDePasse", motDePasse)
                .withExpiresAt(DATE_EXPIRATION)
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }
}
