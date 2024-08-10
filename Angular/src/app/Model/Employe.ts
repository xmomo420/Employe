import {HoraireQuotidien} from "./horaire-quotidien";
import {FeuilleDeTemps} from "./feuille-de-temps";
import {Role} from "./Role";

export class Employe {

  private _id?: number;
  private _prenom: string;
  private _nom: string;
  private _nomUtilisateur: string;
  private _dateEmbauche: Date;
  private _numeroAssuranceSocial?: string;
  private _role: Role;
  private _tauxHoraire: number;
  private _superviseur?: number;

  constructor(
              prenom: string,
              nom: string,
              nomUtilisateur: string,
              dateEmbauche: Date,
              role: Role,
              tauxHoraire: number,
              id?: number,
              superviseur?: number
  ) {
    this._prenom = prenom;
    this._nom = nom;
    this._nomUtilisateur = nomUtilisateur;
    this._dateEmbauche = dateEmbauche;
    this._role = role;
    this._tauxHoraire = tauxHoraire;
    if (id) {
      this._id = id;
    }
    if (superviseur) {
      this._superviseur = superviseur;
    }
  }

  get id(): number | undefined {
    return this._id;
  }

  get prenom(): string {
    return this._prenom;
  }

  get nom(): string {
    return this._nom;
  }

  get nomUtilisateur(): string {
    return this._nomUtilisateur;
  }

  get dateEmbauche(): Date {
    return this._dateEmbauche;
  }

  get numeroAssuranceSocial(): string | undefined {
    return this._numeroAssuranceSocial;
  }

  get role(): Role {
    return this._role;
  }

  get tauxHoraire(): number {
    return this._tauxHoraire;
  }

  get superviseur(): number | undefined {
    return this._superviseur;
  }

  public static jsonToEmploye(jsonObject: any): Employe {
    let idSuperviseur = undefined;
    if (jsonObject.superviseur !== null) {
      idSuperviseur = jsonObject.superviseur.id;
    }
    const dateAvecTemp = jsonObject.dateEmbauche + "T00:00:00";
    return new Employe(
      jsonObject.prenom,
      jsonObject.nom,
      jsonObject.nomUtilisateur,
      new Date(dateAvecTemp),
      jsonObject.role,
      jsonObject.tauxHoraire,
      jsonObject.id !== null ? jsonObject.id : undefined,
      idSuperviseur
    );
  }
}
