package com.employe.Controllers;

import com.employe.Models.Employe;
import com.employe.Models.FeuilleDeTemps;
import com.employe.Models.Horaire;
import com.employe.Models.HoraireQuotidien;
import com.employe.Models.Requetes.RequeteNouvelHoraire;
import com.employe.Repositories.EmployeRepository;
import com.employe.Repositories.FeuilleDeTempsRepository;
import com.employe.Repositories.HoraireRepository;
import com.employe.Repositories.QuartRepository;
import com.employe.Services.HoraireService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Objects;

@RestController
@RequestMapping("api/horaire")
@RequiredArgsConstructor
public class HoraireController {

    private final EmployeRepository employeRepository;
    private final HoraireRepository horaireRepository;
    private final FeuilleDeTempsRepository feuilleDeTempsRepository;
    private final HoraireService horaireService;
    private final QuartRepository quartRepository;

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
        return Objects.equals(employe.getId(), idEmploye) || employe.getRole().equals(Employe.Role.ADJOINT)
                || employeRepository.findAllBySuperviseur(AggregateReference.to(employe.getId()))
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

    @DeleteMapping("/{idEmploye}/{dateDebut}/{typeHoraire}")
    public ResponseEntity<Boolean> supprimerHoraire(
            @PathVariable Integer idEmploye,
            @PathVariable LocalDate dateDebut,
            @PathVariable String typeHoraire,
            @AuthenticationPrincipal Employe employe) {
        if (!estAuthorise(idEmploye, employe)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (typeHoraire.equals("horaireQuotidien")) {
            HoraireQuotidien horaire = horaireRepository.findByEmployeAndDateDebut(
                    AggregateReference.to(idEmploye), dateDebut).orElse(null
            );
            if (horaire == null) {
                return ResponseEntity.notFound().build();
            }
            try {
                quartRepository.deleteAllByHoraireQuotidienOrFeuilleDeTemps(
                        AggregateReference.to(horaire.getId()), null
                );
                horaireRepository.deleteById(horaire.getId());
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        } else if (typeHoraire.equals("feuilleDeTemps")) {
            FeuilleDeTemps feuilleDeTemps = feuilleDeTempsRepository.findByEmployeAndDateDebut(
                    AggregateReference.to(idEmploye), dateDebut).orElse(null
            );
            if (feuilleDeTemps == null) {
                return ResponseEntity.notFound().build();
            }
            try {
                quartRepository.deleteAllByHoraireQuotidienOrFeuilleDeTemps(
                        null, AggregateReference.to(feuilleDeTemps.getId())
                );
                feuilleDeTempsRepository.deleteById(feuilleDeTemps.getId());
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(true);
    }
}
