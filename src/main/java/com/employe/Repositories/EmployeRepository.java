package com.employe.Repositories;

import com.employe.Models.Employe;
import com.employe.Models.Employe.Role;
import com.employe.Models.HoraireQuotidien;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeRepository extends CrudRepository<Employe, Integer> {

    Optional<Employe> findByNomUtilisateur(String nomUtilisateur);
    @Query("SELECT * FROM horaire_quotidien WHERE employe = :idEmploye AND date_debut = :lundiDernier")
    Optional<HoraireQuotidien> trouverHoraireDeLaSemaine(Integer idEmploye, LocalDate lundiDernier);
    Optional<List<Employe>> findAllBySuperviseur(AggregateReference<Employe, Integer> superviseur);
    Optional<List<Employe>> findAllByRoleNot(Role role);
}