import {Component} from '@angular/core';
import {JwtService} from "../../Service/jwt.service";
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {AuthentificationService} from "../../Service/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent extends VerifierAuthentificationComponent {

  constructor(
    private readonly jwtService: JwtService,
    authentificationService: AuthentificationService,
    router: Router
  ) {
    super(router, authentificationService);
  }

  public estGerantOuAdjoint(): boolean {
    const role = this.authentificationService.getLoginJwtClaim("role");
    return role !== null && (role === 'ADJOINT' || role === 'GERANT');
  }

}
