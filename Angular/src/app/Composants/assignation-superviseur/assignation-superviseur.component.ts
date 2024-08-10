import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {EmployeService} from "../../Service/employe.service";
import {Employe} from "../../Model/Employe";
import {GestionEmployesComponent} from "../gestion-employes/gestion-employes.component";

@Component({
  selector: 'app-assignation-superviseur',
  templateUrl: './assignation-superviseur.component.html',
  styleUrl: './assignation-superviseur.component.css'
})
export class AssignationSuperviseurComponent implements OnInit {

  @Input() public _nomComplet: string = "";
  @Input() public _idEmploye: number = -1;
  private _idSuperviseur: number = -1;
  protected listeSuperviseurs: Employe[] = [];
  @Input() referenceParent!: GestionEmployesComponent;
  protected afficherErreur: boolean = false;

  protected readonly MESSAGE_ERREUR = "Erreur lors de l'assignation du superviseur";
  protected readonly MESSAGE_CHAMP_INVALIDE = "Vous devez sélectionner un superviseur";

  set nomComplet(value: string) {
    this._nomComplet = value;
  }

  set idSuperviseur(value: number) {
    this._idSuperviseur = value;
  }

  get idSuperviseur(): number {
    return this._idSuperviseur;
  }

  constructor(
    private readonly employeService: EmployeService
  ) { }

  async ngOnInit() {
    await this.chargerSuperviseurs();
  }

  private async chargerSuperviseurs() {
    this.listeSuperviseurs = await this.employeService.getSuperviseurs();
  }

  protected estSuperviseurValide(): boolean {
    return this._idSuperviseur !== -1;
  }

  protected async assignerSuperviseur() {
    this.afficherErreur = !await this.employeService.assignerSuperviseur(this._idEmploye.toString(), this._idSuperviseur.toString());
    if (!this.afficherErreur) {
      this.referenceParent.afficherMessageSuperviseurAssigne();
      this.annulerFormulaire();
    }
  }

  protected annulerFormulaire() {
    this.referenceParent.cacherFormulaireAssignationSuperviseur();
  }

}
