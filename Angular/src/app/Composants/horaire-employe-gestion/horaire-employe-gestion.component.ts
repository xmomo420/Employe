import {Component, OnInit} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {EmployeService} from "../../Service/employe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../../Service/authentification.service";

@Component({
  selector: 'app-horaire-employe-gestion',
  templateUrl: './horaire-employe-gestion.component.html',
  styleUrl: './horaire-employe-gestion.component.css'
})
export class HoraireEmployeGestionComponent extends VerifierAuthentificationComponent implements OnInit {

  protected idEmploye: string = "";
  protected typeHoraire: string = "";
  protected nomEmploye: string = "";
  protected dateEmbauche: Date = new Date();

  // TODO : Ajouter des contrôles pour ne pas avoir accès à cette page si l'employé connecté n'est pas un adjoint
  // TODO : Superclasse avec un booléen -> estAdjoint -> estGérantOuAdjoint
  constructor(
    router: Router,
    authentificationService: AuthentificationService,
    protected employeService: EmployeService,
    private route: ActivatedRoute
  ) {
    super(router, authentificationService);
    this.idEmploye = this.route.snapshot.queryParamMap.get('id')!;
    this.typeHoraire = this.route.snapshot.queryParamMap.get('type-horaire')!;
  }

  async ngOnInit(): Promise<void> {
    const jsonObject = await this.employeService.getEmploye(this.idEmploye);
    this.nomEmploye = jsonObject.nomComplet;
    // TODO : Faire un test pour valider la date
    const dateAvecTemps = jsonObject.dateEmbauche + "T00:00:00";
    this.dateEmbauche = new Date(dateAvecTemps);
  }

}
