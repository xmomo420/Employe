package com.employe.Repositories;

import com.employe.Models.Employe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeRepository extends CrudRepository<Employe, Integer> {

    Optional<Employe> findByNomUtilisateur(String nomUtilisateur);

}
