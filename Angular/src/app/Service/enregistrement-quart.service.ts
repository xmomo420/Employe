import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnregistrementQuartService {

  private static URI_ENREGISTREMENT = "/api/quart/"

  private static toISOString(date: Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  constructor() { }

  public async enregistrerQuart(typeEnregistrement: string, moment: Date, idEmploye: string) : Promise<boolean> {
    const reponseServeur = await fetch(`${EnregistrementQuartService.URI_ENREGISTREMENT}/${typeEnregistrement}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        idEmploye: parseInt(idEmploye),
        date: EnregistrementQuartService.toISOString(moment)
      })
    });
    try {
      await reponseServeur.json();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
