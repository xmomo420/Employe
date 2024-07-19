package com.employe.Repositories;

import com.employe.Models.FeuilleDeTemps;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeuilleDeTempsRepository extends CrudRepository<FeuilleDeTemps, Integer> {
}
