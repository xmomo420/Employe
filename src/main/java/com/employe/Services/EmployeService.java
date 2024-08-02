package com.employe.Services;

import com.employe.Models.*;
import com.employe.Repositories.EmployeRepository;
import com.employe.Repositories.FeuilleDeTempsRepository;
import com.employe.Repositories.HoraireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmployeService implements UserDetailsService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final EmployeRepository employeRepository;

    private static final double SALAIRE_MIN = 15.50;
    private static final double SALAIRE_MAX = 45.0;
    private static final String LETTRES_NOM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    @Override
    public UserDetails loadUserByUsername(String nomUtilisateur) throws UsernameNotFoundException {
        return employeRepository.findByNomUtilisateur(nomUtilisateur)
                .orElseThrow(() -> new UsernameNotFoundException("Le nom utilisateur \"" + nomUtilisateur + "\" n'existe pas"));
    }

    private static boolean sontDonneesValide(Employe employe) {
        return employe.getPrenom() != null && !employe.getPrenom().isEmpty()
                && !employe.getPrenom().isBlank() && employe.getNom() != null
                && !employe.getNom().isEmpty() && !employe.getNom().isBlank()
                && employe.getRole() != null
                && employe.getTauxHoraire() >= SALAIRE_MIN
                && employe.getTauxHoraire() <= SALAIRE_MAX;
    }
    private static boolean estMotDePasseValide(String motDePasse) {
        Pattern pattern = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&*-]).{8,}$");
        Matcher matcher = pattern.matcher(motDePasse);
        return matcher.matches();
    }

    private String genererNomUtilisateur(Employe employe) {
        String prefixe = employe.getPrenom().substring(0, 1).toUpperCase()
                + '0' + employe.getNom().substring(0, 1).toUpperCase() + '0';
        return prefixe + LETTRES_NOM.charAt((int) (Math.random() * LETTRES_NOM.length())) +
                (int) (Math.random() * 10) +
                LETTRES_NOM.charAt((int) (Math.random() * LETTRES_NOM.length()));
    }

    public String ajouterEmploye(Employe employe) {
        String id = "";
        if (!sontDonneesValide(employe)) {
            return id;
        }
        employe.setMotDePasse(passwordEncoder.encode(Employe.genererMotDePasse(employe.getPrenom(), employe.getNom())));
        String nomUtilisateur;
        do {
            nomUtilisateur = genererNomUtilisateur(employe);
        } while (employeRepository.findByNomUtilisateur(nomUtilisateur).isPresent());
        employe.setNomUtilisateur(nomUtilisateur);
        employe.setDateEmbauche(LocalDate.now());
        try {
            Employe employeAjoute = employeRepository.save(employe);
            id = employeAjoute.getId().toString();
        } catch (Exception e) {
            e.printStackTrace();
            id = "Exception : " + e.getLocalizedMessage();
        }
        return id;
    }
}
