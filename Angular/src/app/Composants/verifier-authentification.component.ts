import { Router } from '@angular/router';
import {AuthentificationService} from "../Service/authentification.service";
import {Component, Inject} from "@angular/core";

@Component({
  selector: 'app-verifier-authentification',
  template: ''
})
export abstract class VerifierAuthentificationComponent {

  protected _estRouteProtegee: boolean = false;

  protected constructor(
    protected readonly router: Router,
    protected readonly authentificationService: AuthentificationService,
    @Inject(Boolean)estRouteProtegee?: boolean
  ) {
    if (estRouteProtegee !== undefined) {
      this.estRouteProtegee = estRouteProtegee;
    }
    this.verifierAuthentification();
  }

  get estRouteProtegee(): boolean {
    return this._estRouteProtegee;
  }

  set estRouteProtegee(value: boolean) {
    this._estRouteProtegee = value;
  }

  protected verifierAuthentification(): void {
    if (this.estRouteProtegee && !this.authentificationService.estAuthentifie) {
      const urlActuelle = this.router.url;
      this.router.navigate(['/login'], { queryParams: { redirection: urlActuelle } }).finally();
    }
  }

}
