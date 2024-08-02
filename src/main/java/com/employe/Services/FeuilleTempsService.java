package com.employe.Services;

import com.employe.Models.FeuilleDeTemps;
import com.employe.Repositories.FeuilleDeTempsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class FeuilleTempsService {

    private final FeuilleDeTempsRepository feuilleDeTempsRepository;

    public FeuilleDeTemps ajouterFeuilleDeTemps(Integer idEmploye, LocalDate dateDebutSemaine) {
        FeuilleDeTemps feuilleDeTemps = new FeuilleDeTemps();
        feuilleDeTemps.setEmploye(AggregateReference.to(idEmploye));
        feuilleDeTemps.setDateDebut(dateDebutSemaine);
        return feuilleDeTempsRepository.save(feuilleDeTemps);
    }
}
