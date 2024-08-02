package com.employe.Repositories;

import com.employe.Models.Employe;
import com.employe.Models.FeuilleDeTemps;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface FeuilleDeTempsRepository extends CrudRepository<FeuilleDeTemps, Integer> {
    Optional<FeuilleDeTemps> findByEmployeAndDateDebut(AggregateReference<Employe, Integer> employe, LocalDate dateDebut);
}
