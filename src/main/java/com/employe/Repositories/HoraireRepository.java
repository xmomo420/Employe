package com.employe.Repositories;

import com.employe.Models.HoraireQuotidien;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraireRepository extends CrudRepository<HoraireQuotidien, Integer> {

}
