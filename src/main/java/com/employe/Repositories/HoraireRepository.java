package com.employe.Repositories;

import com.employe.Models.Employe;
import com.employe.Models.HoraireQuotidien;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HoraireRepository extends CrudRepository<HoraireQuotidien, Integer> {
    Optional<HoraireQuotidien> findByEmployeAndDateDebut(AggregateReference<Employe, Integer> employe, LocalDate dateDebut);
    Optional<List<HoraireQuotidien>> findAllByEmploye(AggregateReference<Employe, Integer> employe);
}
