import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
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

  // Pour ajouter un nouvel employé
  private _employes: Employe[] = [];
  private _formulaireNouvelEmployeAffiche: boolean = false;
  protected nouvelEmployeAjoute: boolean = false;
  // Pour l'affectation à un superviseur
  private _formulaireAssignationSuperviseurAffiche: boolean = false;
  protected superviseurAssigne: boolean = false;
  protected _nomCompletEmploye: string = "";
  private _idEmploye: number = 0;

  protected readonly MESSAGE_EMPLOYE_AJOUTE = "L'employé a été ajouté avec succès";
  protected readonly MESSAGE_SUPERVISEUR_ASSIGNE = "Le superviseur a été assigné avec succès";

  get nomCompletEmploye(): string {
    return this._nomCompletEmploye;
  }

  set nomCompletEmploye(value: string) {
    this._nomCompletEmploye = value;
  }

  get idEmploye(): number {
    return this._idEmploye;
  }

  set idEmploye(value: number) {
    this._idEmploye = value;
  }

  get formulaireAssignationSuperviseurAffiche(): boolean {
    return this._formulaireAssignationSuperviseurAffiche;
  }

  get formulaireNouvelEmployeAffiche(): boolean {
    return this._formulaireNouvelEmployeAffiche;
  }

  set formulaireNouvelEmployeAffiche(value: boolean) {
    this._formulaireNouvelEmployeAffiche = value;
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

  public afficherMessageNouvelEmployeAjoute() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.nouvelEmployeAjoute = true;
  }

  public afficherMessageSuperviseurAssigne() {
    // TODO : Scroller jusqu'au message
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.superviseurAssigne = true;
  }

  public cacherMessageNouvelEmployeAjoute() {
    this.nouvelEmployeAjoute = false;
  }

  public cacherMessageSuperviseurAssigne() {
    this.superviseurAssigne = false;
  }

  public afficherFormulaireNouvelEmploye() {
    this.cacherMessageNouvelEmployeAjoute();
    this.cacherMessageSuperviseurAssigne();
    this.formulaireNouvelEmployeAffiche = true;
  }

  public cacherFormulaireNouvelEmploye() {
    this.formulaireNouvelEmployeAffiche = false;
  }

  public cacherFormulaireAssignationSuperviseur() {
    this._formulaireAssignationSuperviseurAffiche = false;
  }

  public afficherFormulaireAssignationSuperviseur(employe: Employe) {
    this.cacherMessageNouvelEmployeAjoute();
    this.cacherMessageSuperviseurAssigne();
    this.idEmploye = employe.id ?? this.idEmploye;
    this.nomCompletEmploye = employe.prenom + " " + employe.nom;
    this._formulaireAssignationSuperviseurAffiche = true;
  }

  protected estAdjointConnecte(): boolean {
    return this.authentificationService.getLoginJwtClaim("role") === "ADJOINT";
  }

  public peutAssignerSuperviseur(employe: Employe) : boolean {
    return employe.role !== Role.GERANT;
  }
}
