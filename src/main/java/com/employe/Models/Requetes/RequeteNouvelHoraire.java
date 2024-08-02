package com.employe.Models.Requetes;

import com.employe.Models.Quart;

import java.time.LocalDate;
import java.util.List;

public record RequeteNouvelHoraire(List<Quart> quartsTravail, LocalDate dateDebut) {
    @Override
    public List<Quart> quartsTravail() {
        return quartsTravail;
    }

    @Override
    public LocalDate dateDebut() {
        return dateDebut;
    }
}
