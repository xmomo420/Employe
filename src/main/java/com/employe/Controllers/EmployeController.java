package com.employe.Controllers;

import com.employe.Models.Employe;
import com.employe.Models.Employe.Role;
import com.employe.Models.FeuilleDeTemps;
import com.employe.Models.HoraireQuotidien;
import com.employe.Repositories.EmployeRepository;
import com.employe.Repositories.FeuilleDeTempsRepository;
import com.employe.Repositories.HoraireRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("api/employe")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeRepository employeRepository;
    private final HoraireRepository horaireRepository;
    private final FeuilleDeTempsRepository feuilleDeTempsRepository;

    @GetMapping("/horaire")
    public ResponseEntity<Optional<HoraireQuotidien>> getHoraire(@AuthenticationPrincipal Employe employe) {
        LocalDate lundiDernier = LocalDate.now();
        while (lundiDernier.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            lundiDernier = lundiDernier.minusDays(1);
        }
        return ResponseEntity.ok().body(employeRepository.trouverHoraireDeLaSemaine(employe.getId(), lundiDernier));
    }

    @GetMapping()
    public ResponseEntity<List<Employe>> employesCharge(@AuthenticationPrincipal Employe employe) {
        if (employe.getRole().equals(Employe.Role.ASSOCIE)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Employe> employesACharge;
        if (employe.getRole().equals(Role.GERANT)) {
            employesACharge = employeRepository.findAllBySuperviseur(AggregateReference.to(employe.getId())).orElse(null);
        } else {
            employesACharge = employeRepository.findAllByRoleNot(Role.ADJOINT).orElse(null);
        }
        return ResponseEntity.ok().body(employesACharge);
    }

    @PatchMapping("/{idEmploye}/superviseur")
    public ResponseEntity<Employe> assignerSuperviseur(
            @AuthenticationPrincipal Employe employe,
            @PathVariable Integer idEmploye,
            @RequestParam Integer idSuperviseur
    ) {
        if (!employe.getRole().equals(Employe.Role.ADJOINT)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Employe employeAssigne = employeRepository.findById(idEmploye).orElse(null);
        if (employeAssigne == null) {
            return ResponseEntity.notFound().build();
        }
        Employe superviseur = employeRepository.findById(idSuperviseur).orElse(null);
        if (superviseur == null) {
            return ResponseEntity.notFound().build();
        }
        if (superviseur.getRole().equals(Role.ASSOCIE)) {
            return ResponseEntity.badRequest().build();
        }
        employeAssigne.setSuperviseur(AggregateReference.to(idSuperviseur));
        employeRepository.save(employeAssigne);
        return ResponseEntity.ok().body(employeAssigne);
    }

    @GetMapping("/superviseur")
    public ResponseEntity<List<Employe>> getAllSuperviseurs(@AuthenticationPrincipal Employe employe) {
        if (!employe.getRole().equals(Role.ADJOINT)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Employe> superviseur = employeRepository.findAllByRole(Role.GERANT).orElse(null);
        return ResponseEntity.ok().body(superviseur);
    }

    @GetMapping("/{idEmploye}")
    public ResponseEntity<String> getRenseignementsEmployes(
            @PathVariable Integer idEmploye,
            @AuthenticationPrincipal Employe employe
    ) {
        // TODO : Vérifier les permissions
        Employe employeConsulte = employeRepository.findById(idEmploye).orElse(null);
        if (employeConsulte == null) {
            return ResponseEntity.notFound().build();
        }
        double nombreHeuresTravaillees = 0;
        LocalDate lundiDernier = LocalDate.now();
        while (lundiDernier.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            lundiDernier = lundiDernier.minusDays(1);
        }
        FeuilleDeTemps feuilleDeTempsSemaineCourante = feuilleDeTempsRepository.findByEmployeAndDateDebut(
                AggregateReference.to(idEmploye), lundiDernier
        ).orElse(null);
        if (feuilleDeTempsSemaineCourante != null) {
            nombreHeuresTravaillees = feuilleDeTempsSemaineCourante.getNombreHeuresTravaillees();
        }
        Employe superviseur;
        String nomCompletSuperviseur = "";
        if (employeConsulte.getSuperviseur() != null) {
            superviseur = employeRepository.findById(Objects.requireNonNull(employeConsulte.getSuperviseur().getId())).orElse(null);
            if (superviseur != null) {
                nomCompletSuperviseur = superviseur.getPrenom() + " " + superviseur.getNom();
            }
        }
        JSONObject reponse = new JSONObject();
        reponse.put("nomComplet", employeConsulte.getPrenom() + " " + employeConsulte.getNom());
        reponse.put("dateEmbauche", employeConsulte.getDateEmbauche());
        reponse.put("role", employeConsulte.getRole());
        reponse.put("superviseur", nomCompletSuperviseur);
        reponse.put("tauxHoraire", employeConsulte.getTauxHoraire());
        reponse.put("numeroAssuranceSociale", employeConsulte.getNumeroAssuranceSocial());
        reponse.put("nombreHeuresTravaillees", nombreHeuresTravaillees);
        return ResponseEntity.ok().body(reponse.toString());
    }


}
