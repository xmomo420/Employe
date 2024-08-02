package com.employe.Controllers;

import static com.employe.Models.Employe.Role;

import com.employe.Models.Employe;
import com.employe.Services.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthentificationController {

    /**
     * Pour le front-end, il faut utiliser Basic Auth avec le nom d'utilisateur
     * et le mot de passe pour accéder aux routes protégées
     */

    private final EmployeService employeService;

    private static final String BAD_REQUEST = "Mauvaise requête, des paramètres sont manquants ou invalide";

    @PostMapping("/inscription")
    public ResponseEntity<String> inscriptionNouvelEmploye(
            @RequestParam String prenom,
            @RequestParam String nom,
            @RequestParam double tauxHoraire,
            @RequestParam Role role) {
        Employe employe = new Employe();
        employe.setPrenom(prenom);
        employe.setNom(nom);
        employe.setTauxHoraire(tauxHoraire);
        employe.setRole(role);
        String idNouvelEmploye = employeService.ajouterEmploye(employe);
        if (idNouvelEmploye.isEmpty()) {
            return ResponseEntity.badRequest().body(BAD_REQUEST);
        }
        if (idNouvelEmploye.startsWith("Exception : ")) {
            String messageErreur = idNouvelEmploye.substring(12);
            return ResponseEntity.internalServerError().body(messageErreur);
        }
        // Utiliser l'URI de l'endpoint d'inscription comme placeholder
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        // TODO : "api/employe/{id}"
        return ResponseEntity.created(location).body(idNouvelEmploye);
    }

}
