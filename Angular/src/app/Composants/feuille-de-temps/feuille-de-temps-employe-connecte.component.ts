import {AfterViewChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../Service/authentification.service";
import {HoraireComponent} from "../horaire/horaire.component";
import {Quart} from "../../Model/Quart";
import {EnregistrementQuartService} from "../../Service/enregistrement-quart.service";

@Component({
  selector: 'app-feuille-de-temps',
  templateUrl: './feuille-de-temps-employe-connecte.component.html',
  styleUrl: './feuille-de-temps-employe-connecte.component.css'
})
export class FeuilleDeTempsEmployeConnecteComponent extends VerifierAuthentificationComponent implements AfterViewChecked {

  protected nomEmploye: string;
  protected idEmploye: string;
  protected dateEmbauche: Date;
  @ViewChild('horaireComponent') protected referenceHoraireComponent?: HoraireComponent;
  protected quartAujourdhui?: Quart;
  private _isConfirmationAffichee: boolean = false;
  private momentEnregistrement: Date = new Date();
  private _typeEnregistrement: string = "";
  protected messageConfirmation: string = "";


  set typeEnregistrement(value: string) {
    this._typeEnregistrement = value;
  }

  get typeEnregistrement(): string {
    return this._typeEnregistrement;
  }

  get isConfirmationAffichee(): boolean {
    return this._isConfirmationAffichee;
  }

  set isConfirmationAffichee(value: boolean) {
    this._isConfirmationAffichee = value;
  }

  private formatterTempsEnregistrement(date: Date) : string {
    return date.toLocaleTimeString("fr-CA", {hour: "2-digit", minute: "2-digit"});
  }
  private static enumTypeEnregistrementToString(enumString: string) : string {
    switch (enumString) {
      case "HEURE_DEBUT":
        return "Début de quart";
      case "HEURE_FIN":
        return "Fin de quart";
      case "DEBUT_REPAS":
        return "Début de repas";
      case "FIN_REPAS":
        return "Fin de repas";
      default:
        return "Erreur";
    }
  }

  protected afficherConfirmation(bouton: string) : void {
    this.typeEnregistrement = bouton;
    this.momentEnregistrement = new Date();
    this.messageConfirmation = `Voulez-vous vraiment enregistrer un
    \"${FeuilleDeTempsEmployeConnecteComponent.enumTypeEnregistrementToString(bouton)}\" à
    ${this.formatterTempsEnregistrement(this.momentEnregistrement)} ?`;
    this.isConfirmationAffichee = true;
  }

  // TODO : Faire une super classe pour ne pas avoir à dupliquer le code pour les constructeurs et membre ed classe
  constructor(
    authentificationService: AuthentificationService,
    private readonly enregistrementQuartService: EnregistrementQuartService,
    router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super(router, authentificationService, true);
    this.nomEmploye = authentificationService.getLoginJwtClaim("nomComplet") ?? "";
    this.idEmploye = authentificationService.getLoginJwtClaim("idEmploye") ?? "-1";
    this.dateEmbauche = new Date(authentificationService.getLoginJwtClaim("dateEmbauche") ?? "");
  }

  protected dateDansSemaineActuelle(date?: Date): boolean {
    if (date) {
      return date.toLocaleDateString() === HoraireComponent.dateLundiDernier().toLocaleDateString();
    }
    return false;
  }

  // TODO : Un background scheduler qui remplit automatiquement la feuille de temps des employés quand une donnée est manquante
  // Pour l'instant, on prend en compte que les quarts de travail antérieurs sont déjà remplis correctement grâce au BackgroundScheduler

  protected peutDebuterQuart() : boolean {
    return this.quartAujourdhui === undefined;
  }

  protected peutTerminerQuart() : boolean {
    if (!this.quartAujourdhui) {
      return false;
    }
    return this.quartAujourdhui.heureFin === undefined && this.quartAujourdhui.heureDebut !== undefined && this.pauseRepasValidee();
  }

  protected peutDebuterRepas() : boolean {
    if (!this.quartAujourdhui) {
      return false;
    }
    return this.quartAujourdhui.debutRepas === undefined && this.quartAujourdhui.heureDebut !== undefined && this.quartAujourdhui.heureFin === undefined;
  }

  protected peutTerminerRepas() : boolean {
    if (!this.quartAujourdhui) {
      return false;
    }
    return this.quartAujourdhui.finRepas === undefined && this.quartAujourdhui.debutRepas !== undefined;
  }

  private pauseRepasValidee() : boolean {
    if (!this.quartAujourdhui) {
      return false;
    }
    return this.quartAujourdhui.debutRepas === undefined && this.quartAujourdhui.finRepas === undefined
      || this.quartAujourdhui.debutRepas !== undefined && this.quartAujourdhui.finRepas !== undefined;
  }

  protected async enregistrerQuart() {
    const idEmploye = this.authentificationService.getLoginJwtClaim("idEmploye");
    if (idEmploye !== null) {
      await this.enregistrementQuartService.enregistrerQuart(
        this.typeEnregistrement,
        this.momentEnregistrement,
        idEmploye
      );
    }
    this.isConfirmationAffichee = false;
    this.referenceHoraireComponent?.chargerHoraire();
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.quartAujourdhui = this.referenceHoraireComponent?.horaire?.quartsTravail.find(
      quart => quart.date.toLocaleDateString() === new Date().toLocaleDateString()
    );
    this.cdr.detectChanges();
  }




}
