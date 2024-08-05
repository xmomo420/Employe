import {Component, Inject, Input, OnInit} from '@angular/core';
import {VerifierAuthentificationComponent} from "../verifier-authentification.component";
import {AuthentificationService} from "../../Service/authentification.service";
import {Router} from "@angular/router";
import {HoraireService} from "../../Service/horaire.service";
import {Horaire} from "../../Model/horaire";
import {AffichageHoraireComponent} from "../Abstrait/affichage-horaire/affichage-horaire.component";

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrl: './horaire.component.css'
})
export class HoraireComponent extends VerifierAuthentificationComponent implements OnInit {

  private _horaire?: Horaire | null;
  private _datesDebut: Date[] = new Array<Date>();
  private _indiceDate: number = -1;
  @Input() typeHoraire: string = "horaireQuotidien";
  @Input() nomEmploye: string = "{{ nomEmploye }}";
  @Input() idEmploye: string = "-1";
  @Input() dateEmbauche: Date = new Date();

  constructor(
    router: Router,
    authentificationService: AuthentificationService,
    protected readonly horaireService: HoraireService,
    @Inject(AffichageHoraireComponent) protected readonly affichageHoraireComponent: AffichageHoraireComponent
    )
  {
    super(router, authentificationService, true);
    const dateEmbaucheJwt = this.authentificationService.getLoginJwtClaim("dateEmbauche");
    if (dateEmbaucheJwt !== null) {
      this.dateEmbauche = new Date(dateEmbaucheJwt);
    }
    this.chargerDatesDebut();
    this._indiceDate = this._datesDebut.length - 3;
  }

  async ngOnInit(): Promise<void> {
    await this.chargerHoraire();
  }

  get horaire(): Horaire | null | undefined {
    return this._horaire;
  }

  get indiceDate(): number {
    return this._indiceDate;
  }

  set indiceDate(value: number) {
    this._indiceDate = value;
  }

  get datesDebut(): Date[] {
    return this._datesDebut;
  }

  public dateMaximumAtteinte() : boolean {
    // @ts-ignore
    const dateActuelle = new Date(this._datesDebut.at(this.indiceDate));
    const dateMax = this.typeHoraire === "feuilleDeTemps" ? HoraireComponent.dateLundiDernier() : HoraireComponent.dateDebutMax();
    return dateActuelle.toLocaleDateString() === dateMax.toLocaleDateString();
  }

  public dateMinimumAtteinte() : boolean {
    // @ts-ignore
    const dateActuelle = new Date(this._datesDebut.at(this.indiceDate));
    const lundiAvant = new Date(dateActuelle);
    lundiAvant.setDate(dateActuelle.getDate() - 7);
    return lundiAvant.getTime() < this.dateEmbauche.getTime()
      && new Date(lundiAvant.toLocaleDateString()) < new Date(HoraireComponent.dateLundiDernier().toLocaleDateString());
  }

  public horaireSuivant(): void {
    this.indiceDate++;
    this.chargerHoraire().finally();
  }

  public horairePrecedent(): void {
    if (this.indiceDate === 0) { // Au début de la liste
      // @ts-ignore
      const dateActuelle = new Date(this._datesDebut.at(this.indiceDate));
      const dateSemaineDerniere = new Date(dateActuelle);
      dateSemaineDerniere.setDate(dateActuelle.getDate() - 7);
      this._datesDebut.unshift(dateSemaineDerniere);
    } else {
      this.indiceDate--;
    }
    this.chargerHoraire().finally();
  }

  /**
   * Retourne l'horaire s'il est présent dans `horairesEmploye`, sinon fait une requête au serveur pour l'ajouter, si
   * présent dans la base de données. S'il est présent, retourne l'horaire chargé, sinon retourne null
   * @public
   */
  public async chargerHoraire() : Promise<void> {
    const horaire = await this.horaireService.getHoraireByDateDebut(
      this.idEmploye,
      this.typeHoraire,
      <Date>this._datesDebut.at(this.indiceDate)
    );
    this._horaire = horaire !== null ? horaire : null;
  }

  public static dateLundiDernier(): Date {
    const date = new Date();
    const jourSemaine = date.getDay();
    const nombreJourSoustraits = jourSemaine === 0 ? 6 : jourSemaine - 1; // Dimanche = 0, Lundi = 1
    date.setDate(date.getDate() - nombreJourSoustraits);
    return date;
  }

  private static dateDebutMax(): Date {
    const dateMax = this.dateLundiDernier();
    dateMax.setDate(dateMax.getDate() + 14);
    return dateMax;
  }

  private chargerDatesDebut(): void {
    let dateDebut = HoraireComponent.dateLundiDernier();
    dateDebut.setDate(dateDebut.getDate() - 14);
    // Passé
    for (let i = 0; i < 2; i++) {
      if (dateDebut >= this.dateEmbauche) { // Ne pas ajouter les dates qui sont avant la date d'embauche de l'employé
        this._datesDebut.push(new Date(dateDebut));
      }
      dateDebut.setDate(dateDebut.getDate() + 7); // Plus une semaine
    }
    dateDebut = HoraireComponent.dateLundiDernier();
    this._datesDebut.push(new Date(dateDebut)); // Ajouter la date du lundi courant/dernier
    // Futur
    for (let i = 0; i < 2; i++) {
      dateDebut.setDate(dateDebut.getDate() + 7);
      this._datesDebut.push(new Date(dateDebut));
    }
  }

}
