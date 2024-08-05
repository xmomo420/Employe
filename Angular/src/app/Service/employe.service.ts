import {Injectable} from '@angular/core';
import {Employe} from "../Model/Employe";
import {Role} from "../Model/Role";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private URI_EMPLOYE = "/api/employe";
  private URI_INSCRIPTION = "/api/auth/inscription";

  constructor() { }

  public async getEmployesCharge() : Promise<Employe[]> {
    const employes = new Array<Employe>();
    const reponseServeur = await fetch(this.URI_EMPLOYE); // Get par défaut
    try {
      const resultatRequete = await reponseServeur.json();
      resultatRequete.forEach((employe: any) => employes.push(Employe.jsonToEmploye(employe)));
      return employes;
    } catch (error) {
      return [];
    }
  }

  public async ajouterEmploye(prenom: string, nom: string, role: Role, tauxHoraire: number) : Promise<boolean> {
    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("role", role.toString());
    formData.append("tauxHoraire", tauxHoraire.toString());
    const reponseServeur = await fetch(this.URI_INSCRIPTION, {
      method: "POST",
      body: formData
    });
    return reponseServeur.status === 201;
  }

  public async getEmploye(id: string) : Promise<any> {
    const reponseServeur = await fetch(this.URI_EMPLOYE + "/" + id);
    return await reponseServeur.json();
  }
}
