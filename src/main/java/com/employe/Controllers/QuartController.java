package com.employe.Controllers;

import com.employe.Models.Employe;
import com.employe.Models.FeuilleDeTemps;
import com.employe.Models.Quart;
import com.employe.Models.Requetes.RequeteEnregistrementQuart;
import com.employe.Repositories.FeuilleDeTempsRepository;
import com.employe.Repositories.QuartRepository;
import com.employe.Services.FeuilleTempsService;
import com.employe.Services.QuartService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Objects;

@RestController
@RequestMapping("/api/quart")
@RequiredArgsConstructor
public class QuartController {

    private final QuartRepository quartRepository;
    private final FeuilleDeTempsRepository feuilleDeTempsRepository;
    private final QuartService quartService;
    private final FeuilleTempsService feuilleTempsService;

    public enum TypeEnregistrement {
        HEURE_DEBUT,
        HEURE_FIN,
        DEBUT_REPAS,
        FIN_REPAS
    }

    @PostMapping("/{typeEnregistrement}")
    public ResponseEntity<Quart> debutRepas(
            @RequestBody RequeteEnregistrementQuart requestBody,
            @AuthenticationPrincipal Employe employe,
            @PathVariable TypeEnregistrement typeEnregistrement)
    {
        // TODO : Remplacer par une méthode qui vérifie si la requête est authorisé (superviseur)
        if (!Objects.equals(employe.getId(), requestBody.idEmploye())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        LocalDate dateDebutHoraire = Quart.dateLundiPrecedent(requestBody.date().toLocalDate());
        // Vérifier si la feuille de temps existe
        FeuilleDeTemps feuilleDeTemps = feuilleDeTempsRepository
                .findByEmployeAndDateDebut(AggregateReference.to(employe.getId()), dateDebutHoraire)
                .orElse(null);
        if (feuilleDeTemps == null) {
            feuilleDeTemps = feuilleTempsService.ajouterFeuilleDeTemps(employe.getId(), dateDebutHoraire);
        }
        // Vériier si le quart de travail existe
        Quart quartTravail = quartRepository.trouverParDateEtEmploye(
                employe.getId(), requestBody.date().toLocalDate(), dateDebutHoraire
        ).orElse(null);
        // TODO : Ajouter un bloc try-catch pour gérer les exceptions -> bad request
        if (quartTravail == null) {
            quartTravail = quartService.enregistrerNouveauQuart(requestBody, feuilleDeTemps.getId());
        } else {
            quartTravail = quartService.modifierQuartExistant(quartTravail, requestBody.date().toLocalTime(), typeEnregistrement);
        }
        return ResponseEntity.ok().body(quartTravail);

    }
}
