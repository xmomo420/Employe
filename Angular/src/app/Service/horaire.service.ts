import { Injectable } from '@angular/core';
import {Horaire} from "../Model/horaire";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  private URI_CINQ_HORAIRES = "/api/horaire/";

  constructor() { }

  public async getHoraireByDateDebut(idEmploye: string, typeHoraire: string, dateDebut: Date) : Promise<Horaire | null> {
    const dateToString = dateDebut.toLocaleDateString();
    const reponseServeur = await fetch(`${this.URI_CINQ_HORAIRES}${idEmploye}/${typeHoraire}/${dateToString}`, {
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

}
