import { Component } from '@angular/core';
import {AuthentificationService} from "../../Service/authentification.service";
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-horaire-employe-connecte',
  templateUrl: './horaire-employe-connecte.component.html',
  styleUrl: './horaire-employe-connecte.component.css'
})
export class HoraireEmployeConnecteComponent extends VerifierAuthentificationComponent {

  protected nomEmploye: string;
  protected idEmploye: string;
  protected dateEmbauche: Date;

  constructor(
    authentificationService: AuthentificationService,
    router: Router
  )
  {
    super(router, authentificationService, true);
    this.nomEmploye = authentificationService.getLoginJwtClaim("nomComplet") ?? "";
    this.idEmploye = authentificationService.getLoginJwtClaim("idEmploye") ?? "-1";
    this.dateEmbauche = new Date(authentificationService.getLoginJwtClaim("dateEmbauche") ?? "");
  }

}
