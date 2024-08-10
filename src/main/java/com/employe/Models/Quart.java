package com.employe.Models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Quart {
    @Id
    private Integer id;
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime debutRepas;
    private LocalTime finRepas;
    private LocalTime heureFin;
    private AggregateReference<HoraireQuotidien, Integer> horaireQuotidien;
    private AggregateReference<FeuilleDeTemps, Integer> feuilleDeTemps;

    public boolean estQuartHoraireValide(LocalDate dateDebutHoraire) {
        return jourValide(date, dateDebutHoraire)
                && heureDebutEtFinValide(heureDebut, heureFin)
                && debutEtFinRepasValide(debutRepas, finRepas)
                && finRepasEtHeureFinValide(finRepas, heureFin);
    }

    public boolean estEnregistrementQuartValide(LocalTime heureEnregistrement, String typeEnregitrement) {
        return switch (typeEnregitrement) {
            case "heure-debut" -> heureDebut == null;
            case "debut-repas" ->
                    debutRepas == null && heureDebut != null && heureEnregistrement.isBefore(heureDebut);
            case "fin-repas" ->
                    finRepas == null && debutRepas != null && heureEnregistrement.isAfter(debutRepas);
            case "heure-fin" ->
                    heureFin == null && heureDebut != null && (finRepas != null || debutRepas == null);
            default -> false;
        };
    }

    private static boolean jourValide(LocalDate jour, LocalDate dateDebutHoraire) {
        return jour != null
                && !jour.isBefore(dateDebutHoraire)
                && jour.isBefore(dateDebutHoraire.plusWeeks(1));
    }

    private static boolean debutEtFinRepasValide(LocalTime debutRepas, LocalTime finRepas) {
        if (debutRepas == null && finRepas == null) {
            return true;
        }
        return debutRepas != null && finRepas != null && debutRepas.isBefore(finRepas);
    }

    private static boolean heureDebutEtFinValide(LocalTime heureDebut, LocalTime heureFin) {
        return heureDebut != null && heureFin != null && heureDebut.isBefore(heureFin);
    }

    private static boolean finRepasEtHeureFinValide(LocalTime finRepas, LocalTime heureFin) {
        return finRepas == null || heureFin.isAfter(finRepas);
    }

    public static LocalDate dateLundiPrecedent(LocalDate date) {
        if (date.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            return date;
        }
        LocalDate lundiPrecedent = LocalDate.now();
        while (!lundiPrecedent.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            lundiPrecedent = lundiPrecedent.minusDays(1);
        }
        return lundiPrecedent;
    }

    public double getDuree() {
        if (heureDebut == null || heureFin == null) {
            return 0;
        }
        double dureeRepas = debutRepas == null || finRepas == null ? 0 : debutRepas.until(finRepas, java.time.temporal.ChronoUnit.MINUTES) / 60.0;
        return heureDebut.until(heureFin, java.time.temporal.ChronoUnit.MINUTES) / 60.0 - dureeRepas;
    }
}
