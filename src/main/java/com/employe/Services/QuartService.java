package com.employe.Services;

import com.employe.Controllers.QuartController;
import com.employe.Models.Quart;
import com.employe.Models.Requetes.RequeteEnregistrementQuart;
import com.employe.Repositories.QuartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class QuartService {

    private final QuartRepository quartRepository;

    public Quart enregistrerNouveauQuart(RequeteEnregistrementQuart requete, Integer idFeuilleDeTemps) {
        Quart nouveauQuart = new Quart();
        nouveauQuart.setDate(requete.date().toLocalDate());
        nouveauQuart.setHeureDebut(requete.date().toLocalTime());
        nouveauQuart.setFeuilleDeTemps(AggregateReference.to(idFeuilleDeTemps));
        return  quartRepository.save(nouveauQuart);
    }

    public Quart modifierQuartExistant(
            Quart quartExistant,
            LocalTime heureEnregistrement,
            QuartController.TypeEnregistrement typeEnregistrement
    ) {
        switch (typeEnregistrement) {
            case HEURE_DEBUT -> quartExistant.setHeureDebut(heureEnregistrement);
            case HEURE_FIN -> quartExistant.setHeureFin(heureEnregistrement);
            case DEBUT_REPAS -> quartExistant.setDebutRepas(heureEnregistrement);
            case FIN_REPAS -> quartExistant.setFinRepas(heureEnregistrement);
        }
        // TODO : Valider le quart de travail : Retourner false si le quart est invalide
        // TODO : Lancer une exception que la méthoed appelante doit gérer -> bad request
        return quartRepository.save(quartExistant);
    }

}
