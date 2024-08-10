import { Injectable } from '@angular/core';
import {Horaire} from "../Model/horaire";
import {Quart} from "../Model/Quart";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  private URI_API_HORAIRE = "/api/horaire/";

  constructor() { }

  public async getHoraireByDateDebut(idEmploye: string, typeHoraire: string, dateDebut: Date) : Promise<Horaire | null> {
    const dateToString = dateDebut.toLocaleDateString();
    const reponseServeur = await fetch(`${this.URI_API_HORAIRE}${idEmploye}/${typeHoraire}/${dateToString}`, {
      method: 'GET'
    });
    let resultatReponse;
    try {
      resultatReponse = await reponseServeur.json();
      return Horaire.jsonToHoraire(resultatReponse);
    } catch (error) {
      return null;
    }
  }

  public async ajouterNouvelHoraire(horaire: Horaire) : Promise<boolean> {
    const quartsTravailJson = horaire.quartsTravail.map(quart => quart.toJson());
    const reponseSeveur = await fetch(`${this.URI_API_HORAIRE}${horaire.employe}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quartsTravail: quartsTravailJson,
        dateDebut: horaire.dateDebut.toLocaleDateString()
      })
    });
    return reponseSeveur.status === 201;
  }

  public async supprimerHoraire(idEmploye: string, typeHoraire: string, dateDebut: Date) : Promise<boolean> {
    const dateToString = dateDebut.toLocaleDateString();
    const reponseServeur = await fetch(`${this.URI_API_HORAIRE}${idEmploye}/${dateToString}/${typeHoraire}`, {
      method: 'DELETE'
    });
    return reponseServeur.status === 200;
  }


}
