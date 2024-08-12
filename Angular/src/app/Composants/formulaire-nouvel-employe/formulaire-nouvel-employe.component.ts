import {Component, Input, ViewChild} from '@angular/core';
import {EmployeService} from "../../Service/employe.service";
import {GestionEmployesComponent} from "../gestion-employes/gestion-employes.component";
import {Role} from "../../Model/Role";

@Component({
  selector: 'app-formulaire-nouvel-employe',
  templateUrl: './formulaire-nouvel-employe.component.html',
  styleUrl: './formulaire-nouvel-employe.component.css'
})
export class FormulaireNouvelEmployeComponent {

  protected _prenom: string = ""
  protected _nom: string = ""
  protected _role: string = "";
  protected _tauxHoraire: number = 0;
  erreurServeur: boolean = false;
  @Input() gestionEmploye!: GestionEmployesComponent
  @ViewChild('role') champRole!: HTMLSelectElement;

  // Constantes pour les messages d'indication
  public readonly MESSAGE_PRENOM_INVALIDE = "Un prénom valide est obligatoire";
  public readonly MESSAGE_NOM_INVALIDE = "Un nom valide est obligatoire";
  public readonly MESSAGE_ROLE_INVALIDE = "Le rôle est obligatoire";
  public readonly MESSAGE_TAUX_HORAIRE_INVALIDE = "Le taux horaire est obligatoire (Entre 15,50 et 100)";
  public readonly MESSAGE_ERREUR_SERVEUR = "Une erreur est survenue lors de l'ajout de l'employé";
  public readonly TAUX_HORAIRE_MAX = 100;
  public readonly TAUX_HORAIRE_MIN = 15.50;

  constructor(private employeService: EmployeService) { }

  public async soummettreFormulaire() : Promise<void> {
    // TODO : Convertir le rôle en enum
    const roleEnum = FormulaireNouvelEmployeComponent.stringToRole(this._role);
    const employeEstAjoute = await this.employeService.ajouterEmploye(this._prenom, this._nom, roleEnum, this._tauxHoraire);
    if (employeEstAjoute) {
      this.gestionEmploye.afficherMessageNouvelEmployeAjoute();
      this.gestionEmploye.cacherFormulaireNouvelEmploye();
      await this.gestionEmploye.chargerEmployes();
    } else  {
      this.afficherErreurFormulaire();
    }
  }

  private static stringToRole(role: string) : Role {
    switch(role) {
      case "Associé":
        return Role.ASSOCIE;
      case "Gérant":
        return Role.GERANT;
      case "Adjoint":
        return Role.ADJOINT;
    }
    return Role.ASSOCIE;
  }

  public annuler() {
    this.gestionEmploye.formulaireNouvelEmployeAffiche = false;
  }

  private afficherErreurFormulaire() {
    this.erreurServeur = true;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  set nom(value: string) {
    this._nom = value;
  }

  set role(value: string) {
    this._role = value;
  }

  set tauxHoraire(value: number) {
    this._tauxHoraire = value;
  }

  public estPrenomValide() : boolean {
    return this._prenom !== "" && /\S/.test(this._prenom)
  }

  public estNomValide() : boolean {
    return this._nom !== "" && /\S/.test(this._nom);
  }

  public estRoleValide() : boolean {
    return this._role !== "";
  }

  public estTauxHoraireValide() : boolean {
    return this._tauxHoraire > this.TAUX_HORAIRE_MIN && this._tauxHoraire <= this.TAUX_HORAIRE_MAX;
  }

  public estFormulaireValide() : boolean {
    return this.estPrenomValide() && this.estNomValide() && this.estRoleValide() && this.estTauxHoraireValide();
  }


}
