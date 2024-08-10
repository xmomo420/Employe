import {Component, OnInit} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {AuthentificationService} from "../../Service/authentification.service";
import {Router} from "@angular/router";
import {EmployeService} from "../../Service/employe.service";
import {DateUtils} from "../../Utils/date-utils";
import {Role} from "../../Model/Role";
import {RoleUtils} from "../../Utils/RoleUtils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends VerifierAuthentificationComponent implements OnInit {

  private _nomComplet: string | null = null;
  private _dateEmbauche?: Date;
  private _numeroAssuranceSociale?: string;
  private _role?: string;
  private _tauxHoraire?: number;
  private _superviseur?: string;
  private _nombreHeuresTravaillees?: number;

  constructor(
      private readonly employeService: EmployeService,
      authentificationService: AuthentificationService,
      router: Router
    ) {
    super(router, authentificationService, true);
  }

  async ngOnInit(): Promise<void> {
    this.chargerNomComplet();
    this.chargerDateEmbauche();
    await this.chargerRenseignements();
  }

  private chargerNomComplet() : void {
    if (this.authentificationService.estAuthentifie) {
      this.nomComplet = this.authentificationService.getLoginJwtClaim("nomComplet");
    }
  }

  private chargerDateEmbauche() : void {
    if (this.authentificationService.estAuthentifie) {
      const dateString = this.authentificationService.getLoginJwtClaim("dateEmbauche");
      this.dateEmbauche = new Date(dateString!);
    }
  }

  private async chargerRenseignements() : Promise<void> {
    const idEmploye = this.authentificationService.getLoginJwtClaim("idEmploye");
    const employeJson = await this.employeService.getEmploye(idEmploye!);
    // @ts-ignore
    const roleToString = RoleUtils.roleToString(employeJson.role);
    this.numeroAssuranceSociale = employeJson.numeroAssuranceSociale;
    this.role = roleToString;
    this.tauxHoraire = employeJson.tauxHoraire;
    this.superviseur = employeJson.superviseur;
    this.nombreHeuresTravaillees = employeJson.nombreHeuresTravaillees;
  }

  get nomComplet(): string | null {
    return this._nomComplet;
  }

  set nomComplet(value: string | null)  {
      this._nomComplet = value;
  }


  get dateEmbauche(): Date | undefined {
    return this._dateEmbauche;
  }

  set dateEmbauche(value: Date) {
    this._dateEmbauche = value;
  }

  get numeroAssuranceSociale(): string | undefined {
    return this._numeroAssuranceSociale;
  }

  set numeroAssuranceSociale(value: string) {
    this._numeroAssuranceSociale = value;
  }

  get role(): string | undefined {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get tauxHoraire(): number | undefined {
    return this._tauxHoraire;
  }

  set tauxHoraire(value: number) {
    this._tauxHoraire = value;
  }

  get superviseur(): string | undefined{
    return this._superviseur;
  }

  set superviseur(value: string) {
    this._superviseur = value;
  }

  get nombreHeuresTravaillees(): number | undefined {
    return this._nombreHeuresTravaillees;
  }

  set nombreHeuresTravaillees(value: number) {
    this._nombreHeuresTravaillees = value;
  }

  protected readonly DateUtils = DateUtils;
  protected readonly Role = Role;
}
