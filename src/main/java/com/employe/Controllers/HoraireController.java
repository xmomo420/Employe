package com.employe.Controllers;

import com.employe.Models.Employe;
import com.employe.Models.FeuilleDeTemps;
import com.employe.Models.Horaire;
import com.employe.Models.HoraireQuotidien;
import com.employe.Models.Requetes.RequeteNouvelHoraire;
import com.employe.Repositories.EmployeRepository;
import com.employe.Repositories.FeuilleDeTempsRepository;
import com.employe.Repositories.HoraireRepository;
import com.employe.Services.HoraireService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/horaire")
@RequiredArgsConstructor
public class HoraireController {

    private final EmployeRepository employeRepository;
    private final HoraireRepository horaireRepository;
    private final FeuilleDeTempsRepository feuilleDeTempsRepository;
    private final HoraireService horaireService;

    @GetMapping("/{idEmploye}/{typeHoraire}/{dateDebut}")
    public ResponseEntity<Horaire> horaireParDate(
            @PathVariable Integer idEmploye,
            @PathVariable String typeHoraire,
            @AuthenticationPrincipal Employe employe,
            @PathVariable LocalDate dateDebut) {
        // TODO : Faire la vérification des bad request : dateDebut, typeHoraire, idEmploye
        if (!estAuthorise(idEmploye, employe)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Horaire horaire;
        if (typeHoraire.equals("horaireQuotidien")) {
             horaire = horaireRepository.findByEmployeAndDateDebut(AggregateReference.to(idEmploye), dateDebut).orElse(null);
        } else {
            horaire = feuilleDeTempsRepository.findByEmployeAndDateDebut(AggregateReference.to(idEmploye), dateDebut).orElse(null);
        }
        return ResponseEntity.ok().body(horaire);
    }

    private boolean estAuthorise(Integer idEmploye, Employe employe) {
        return Objects.equals(employe.getId(), idEmploye) ||
                employeRepository.findAllBySuperviseur(AggregateReference.to(employe.getId()))
                        .stream().anyMatch(employes -> Objects.equals(employe.getId(), idEmploye));
    }

    @PostMapping("/{idEmploye}")
    public ResponseEntity<HoraireQuotidien> ajouterHoraire(
            @PathVariable Integer idEmploye,
            @Validated @RequestBody RequeteNouvelHoraire nouvelHoraire
            ) {
        if (employeRepository.findById(idEmploye).isPresent()) {
            try {
                AggregateReference<Employe, Integer> employe = () -> idEmploye;
                HoraireQuotidien horaireAjoute = horaireService.ajouterHoraire(
                        nouvelHoraire.quartsTravail(),
                        employe,
                        nouvelHoraire.dateDebut()).orElse(null);
                return horaireAjoute != null
                        ? ResponseEntity.status(201).body(horaireAjoute)
                        : ResponseEntity.badRequest().build();
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
}
