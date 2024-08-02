import { Component } from '@angular/core';
import {AuthentificationService} from "../../Service/authentification.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  private _nomUtilisateur: string = "";
  private _motDePasse: string = "";
  private _afficherErreurFormulaire: boolean = false;
  private _messageErreurApproprie: string = "";

  public readonly MESSAGE_FORMULAIRE_INVALIDE: string = "Un ou plusieurs champs sont manquants ou invalide";
  public readonly MESSAGE_ERREUR_SERVEUR: string = "Une erreur est survenu";
  public readonly MESSAGE_COMBINAISON_INVALIDE: string = "La combinaison nom d'utilisateur/mot de passe saisie est invalide";
  public readonly MESSAGE_NOM_UTILISATEUR_INVALIDE: string = "Entrez votre nom d'utilisateur";
  public readonly MESSAGE_MOT_DE_PASSE_INVALIDE: string = "Entrez votre mot de passe";
  public readonly MESSAGE_CONNEXION_REQUISE: string = "Vous devez vous authentifier";

  constructor(
    private readonly authentificationService: AuthentificationService,
    private router: Router,
    protected route: ActivatedRoute
  ) { }

  public motDePasseValide(): boolean {
    return this.motDePasse !== '';
  }

  public nomUtilisateurValide(): boolean {
    return this.nomUtilisateur !== '' && /\S/.test(this.nomUtilisateur);
  }

  get afficherErreurFormulaire(): boolean | null {
    return this._afficherErreurFormulaire;
  }

  set afficherErreurFormulaire(value: boolean) {
    this._afficherErreurFormulaire = value;
  }

  get nomUtilisateur(): string {
    return this._nomUtilisateur;
  }

  set nomUtilisateur(value: string) {
    this._nomUtilisateur = value;
  }

  get motDePasse(): string {
    return this._motDePasse;
  }

  set motDePasse(value: string) {
    this._motDePasse = value;
  }

  set messageErreurApproprie(value: string) {
    this._messageErreurApproprie = value;
  }

  public async soummettreFormulaire(): Promise<void> {
    if (!this.estFormulaireValide()) {
      this.afficherErreurFormulaire = true;
      this.messageErreurApproprie = this.MESSAGE_FORMULAIRE_INVALIDE;
      return;
    }
    let reponseServeur: boolean | null = await this.authentificationService.authentifier(this.nomUtilisateur, this.motDePasse);
    this.afficherErreurFormulaire = reponseServeur === false || reponseServeur === null;
    if (this.afficherErreurFormulaire) {
      this.setMessageErreurApproprie(reponseServeur);
    } else {
      const redirectionRoute = this.route.snapshot.queryParams['redirection'] || '';
      await this.router.navigate([redirectionRoute]);
    }
  }

  private estFormulaireValide(): boolean {
    return this.motDePasseValide() && this.nomUtilisateurValide();
  }

  get messageErreurApproprie(): string {
    return this._messageErreurApproprie;
  }

  private setMessageErreurApproprie(reponseServeur: boolean | null): void {
    this.messageErreurApproprie = reponseServeur === null ? this.MESSAGE_ERREUR_SERVEUR : this.MESSAGE_COMBINAISON_INVALIDE;
  }

}
