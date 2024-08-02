import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import {JwtService} from "./jwt.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _estAuthentifie: boolean;

  private static URI_LOGIN: string = "/api/auth/login";
  private static URI_LOGOUT: string = "/api/auth/logout";

  constructor(
    private router: Router,
    private readonly jwtService: JwtService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._estAuthentifie = isPlatformBrowser(this.platformId) && sessionStorage.getItem("loginJwt") !== null;
  }

  get estAuthentifie(): boolean {
    return this._estAuthentifie;
  }

  set estAuthentifie(value: boolean) {
    this._estAuthentifie = value;
  }

  public getLoginJwtClaim(claim: string): string | null {
    if (this.estAuthentifie) {
      const loginJwt = sessionStorage.getItem("loginJwt");
      if (loginJwt) {
        return this.jwtService.extraireClaim(loginJwt, claim);
      }
      return null;
    }
    return null;
  }

  public async authentifier(nomUtilisateur: string, motDePasse: string): Promise<boolean | null> {
    let donneesFormulaire = new FormData();
    donneesFormulaire.append("username", nomUtilisateur);
    donneesFormulaire.append("password", motDePasse);
    try {
      const reponseServeur = await fetch(AuthentificationService.URI_LOGIN, {
        method: 'POST',
        body: donneesFormulaire
      });
      if (reponseServeur.status === 500) {
        return null
      }
      let resultatReponse: string = await reponseServeur.text();
      this.estAuthentifie = resultatReponse !== '';
      if (this.estAuthentifie) {
        sessionStorage.setItem("loginJwt", resultatReponse);
        return true;
      }
      return false;
    } catch (error) {
      return null;
    }
  }

  public async deconnecter(): Promise<boolean> {
    if (this.estAuthentifie) {
      await fetch(AuthentificationService.URI_LOGOUT);
      this.estAuthentifie = false;
      sessionStorage.removeItem("loginJwt");
      await this.router.navigate(['']); // TODO : Ajouter un paramètre à l'url pour afficher un message de déconnexion
      return true;
    }
    return false;
  }

}

