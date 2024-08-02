package com.employe.Repositories;

import com.employe.Models.Quart;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface QuartRepository extends CrudRepository<Quart, Integer> {
    @Query("SELECT * FROM quart WHERE date = :date AND feuille_de_temps = " +
            "(SELECT id FROM feuille_de_temps WHERE employe = :idEmploye AND date_debut = :dateDebutHoraire LIMIT 1)")
    Optional<Quart> trouverParDateEtEmploye(Integer idEmploye, LocalDate date, LocalDate dateDebutHoraire);

}
