package com.employe.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Quart {
    private LocalDate jour;
    private LocalTime heureDebut;
    private LocalTime debutRepas;
    private LocalTime finRepas;
    private LocalTime heureFin;
    private AggregateReference<HoraireQuotidien, Integer> horaireQuotidien;
    private AggregateReference<FeuilleDeTemps, Integer> feuilleDeTemps;

    public Quart(DayOfWeek jourDeLaSemaine) {
        LocalDate today = LocalDate.now();
        if (today.getDayOfWeek().equals(jourDeLaSemaine)) {
            jour = LocalDate.now();
            return;
        }
        LocalDate dateQuart = today;
        // Revenir au dernier lundi
        while (!dateQuart.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            dateQuart = dateQuart.minusDays(1);
        }
        // Aller jusqu'au jour en paramètre
        while (!dateQuart.getDayOfWeek().equals(jourDeLaSemaine)) {
            dateQuart = dateQuart.plusDays(1);
        }
        jour = dateQuart;
    }
}
