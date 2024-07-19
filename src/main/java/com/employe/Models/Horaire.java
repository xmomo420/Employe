package com.employe.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Horaire {
    private List<Quart> quartsTravail;
    private AggregateReference<Employe, Integer> employe;
    private LocalDate dateDebut;

    public void initialiserQuartsVierges() {
        quartsTravail = new ArrayList<>(7);
        quartsTravail.add(new Quart(DayOfWeek.MONDAY));
        quartsTravail.add(new Quart(DayOfWeek.TUESDAY));
        quartsTravail.add(new Quart(DayOfWeek.WEDNESDAY));
        quartsTravail.add(new Quart(DayOfWeek.THURSDAY));
        quartsTravail.add(new Quart(DayOfWeek.FRIDAY));
        quartsTravail.add(new Quart(DayOfWeek.SATURDAY));
        quartsTravail.add(new Quart(DayOfWeek.SUNDAY));
        dateDebut = quartsTravail.get(0).getJour();
    }
}
