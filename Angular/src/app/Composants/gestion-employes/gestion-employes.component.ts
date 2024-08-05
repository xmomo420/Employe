import {Component, OnInit} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../Service/authentification.service";
import {Employe} from "../../Model/Employe";
import {EmployeService} from "../../Service/employe.service";
import {Role} from "../../Model/Role";

@Component({
  selector: 'app-gestion-employes',
  templateUrl: './gestion-employes.component.html',
  styleUrl: './gestion-employes.component.css'
})
export class GestionEmployesComponent extends VerifierAuthentificationComponent implements OnInit {

  private _employes: Employe[] = [];
  private _formulaireAffiche: boolean = false;

  get formulaireAffiche(): boolean {
    return this._formulaireAffiche;
  }

  set formulaireAffiche(value: boolean) {
    this._formulaireAffiche = value;
  }

  get employes(): Employe[] {
    return this._employes;
  }

  set employes(value: Employe[]) {
    this._employes = value;
  }

  constructor(authentificationService: AuthentificationService, router: Router, private employeService: EmployeService) {
    super(router, authentificationService);
  }

  async ngOnInit(): Promise<void> {
    await this.chargerEmployes();
  }

  public async chargerEmployes() {
    this.employes = await this.employeService.getEmployesCharge();
  }

  public getRole(role: string) : string {
    switch (role) {
      case "ASSOCIE":
        return "Associé";
      case "GERANT":
        return "Gérant";
      case "ADJOINT":
        return "Adjoint";
      default:
        return "Erreur";
    }
  }

  public async getInfosEmploye(id: string) {

  }
}
