package com.employe.Models.Requetes;

import java.time.LocalDateTime;

public record RequeteEnregistrementQuart(
        Integer idEmploye,
        LocalDateTime date
) {
    @Override
    public Integer idEmploye() {
        return idEmploye;
    }

    @Override
    public LocalDateTime date() {
        return date;
    }

}
