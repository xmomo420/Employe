package com.employe.Services;

import com.employe.Models.Employe;
import com.employe.Models.HoraireQuotidien;
import com.employe.Models.Quart;
import com.employe.Repositories.HoraireRepository;
import com.employe.Repositories.QuartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HoraireService {

    private final HoraireRepository horaireRepository;
    private final QuartRepository quartRepository;

    public Optional<HoraireQuotidien> ajouterHoraire(
            List<Quart> quartsTravail,
            AggregateReference<Employe, Integer> employe,
            LocalDate dateDebut) {
        if (quartsTravail == null || dateDebut == null || !validerQuartsTravail(quartsTravail, dateDebut)) {
            return Optional.empty();
        }
        HoraireQuotidien horaireAjoute = horaireRepository.findByEmployeAndDateDebut(employe, dateDebut).orElse(null);
        if (horaireAjoute == null) {
            HoraireQuotidien nouvelHoraire = new HoraireQuotidien();
            nouvelHoraire.setEmploye(employe);
            nouvelHoraire.setDateDebut(dateDebut);
            horaireAjoute = horaireRepository.save(nouvelHoraire); // Save HoraireQuotidien first
        } else {
            quartRepository.deleteAll(horaireAjoute.getQuartsTravail());
        }
        HoraireQuotidien finalHoraireAjoute = horaireAjoute;
        List<Quart> quartsAjoutes = new ArrayList<>(quartsTravail);
        quartsAjoutes.forEach(
                quart -> quart.setHoraireQuotidien(AggregateReference.to(finalHoraireAjoute.getId()))
        );
        quartRepository.saveAll(quartsAjoutes);
        horaireAjoute.setQuartsTravail(quartsAjoutes);
        return Optional.of(horaireAjoute);
    }

    private static boolean validerQuartsTravail(List<Quart> quartsTravail, LocalDate dateDebut) {
        if (
                quartsTravail.size() > 7
                || quartsTravail.isEmpty()
                || !dateDebut.getDayOfWeek().equals(DayOfWeek.MONDAY)
                || dateDebut.isBefore(LocalDate.now().minusDays(2))) { // On peut ajouter un horaire seulement 48 heures avant le début de la semaine
            return false;
        }
        LocalDate derniereDate = null;
        for (Quart quartTravail : quartsTravail) {
            if (
                    quartTravail.getDate() == null ||
                    quartTravail.getHeureDebut() == null ||
                    quartTravail.getHeureFin() == null ||
                    quartTravail.getDate().equals(derniereDate) ||
                    !quartTravail.estQuartHoraireValide(dateDebut)
            ) {
                return false;
            }
            derniereDate = quartTravail.getDate();
        }
        return true;
    }
}
