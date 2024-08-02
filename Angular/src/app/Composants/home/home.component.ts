import {Component, OnInit} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {AuthentificationService} from "../../Service/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends VerifierAuthentificationComponent implements OnInit {

  private _nomComplet: string | null = null;

  constructor(
      authentificationService: AuthentificationService,
      router: Router
    ) {
    super(router, authentificationService);
  }

  ngOnInit(): void {
    this.chargerNomComplet();
  }

  protected  chargerNomComplet() : void {
    if (this.authentificationService.estAuthentifie) {
      this.nomComplet = this.authentificationService.getLoginJwtClaim("nomComplet");
    }
  }

  get nomComplet(): string | null {
    return this._nomComplet;
  }

  set nomComplet(value: string | null)  {
      this._nomComplet = value;
  }

}
