import {Component, Input, ViewChild, ElementRef, EventEmitter, Output, Inject} from '@angular/core';
import { Horaire } from '../../../Model/horaire';
import {Quart} from "../../../Model/Quart";
import {ActivatedRoute, Router} from "@angular/router";
import {HoraireService} from "../../../Service/horaire.service";
import {DateUtils} from "../../../Utils/date-utils";
import {HoraireComponent} from "../../horaire/horaire.component";

@Component({
  selector: 'app-affichage-horaire',
  templateUrl: './affichage-horaire.component.html',
  styleUrl: './affichage-horaire.component.css'
})
export class AffichageHoraireComponent {

  @Input() _horaire: Horaire | null = null;
  @Input() _dateDebut: Date | undefined;
  @Input() referenceHoraire!: HoraireComponent
  protected readonly Quart = Quart;
  public formulaireHoraireAffiche: boolean = false;
  protected messageHoraireModifieAffiche: boolean = false;
  protected readonly DateUtils = DateUtils;

  protected readonly MESSAGE_HORAIRE_MODIFIE = "L'horaire a été modifié avec succès";

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  get horaire(): Horaire | null {
    return this._horaire;
  }

  set horaire(value: Horaire) {
    this._horaire = value;
  }

  get dateDebut(): Date {
    return <Date>this._dateDebut;
  }

  private calculerTempsDiner(debutRepas: Date | undefined, finRepas: Date | undefined) : number {
    if (debutRepas && finRepas) {
      return finRepas.getTime() - debutRepas.getTime();
    }
    return 0;
  }
  // TODO : Inclure le temps actuel en prenant en compte si l'employé est en pause ou non, a finit son quart ou non, etc.
  private calculerNombreHeures(quart: Quart): number {
    if (quart.heureFin === undefined) {
      return 0;
    }
    return quart.heureFin.getTime() - quart.heureDebut.getTime() - this.calculerTempsDiner(quart.debutRepas, quart.finRepas);
  }

  public calculerNombreHeuresTotal(): number {
    if (this.horaire === null) {
      return 0;
    }
    let total = 0;
    for (const quart of this.horaire?.quartsTravail) {
      total += this.calculerNombreHeures(quart);
    }
    // 2 décimales max
    return Math.round(total / 3600000 * 100) / 100;
  }

  protected estDateAujourdhui(date?: Date): boolean {
    if (date) {
      return date.toLocaleDateString() === new Date().toLocaleDateString();
    }
    return false;
  }

  protected datesModificationsPossibles(): boolean {
    if (this.router.url.includes("feuilleDeTemps")) {
      return true;
    }
    const dateDansDeuxJours = new Date();
    dateDansDeuxJours.setDate(dateDansDeuxJours.getDate() + 2);
    return dateDansDeuxJours <= this.dateDebut;
  }

  public routeModificationHoraireValide(): boolean {
    const route = this.router.url;
    // TODO : À modifier dans le futur pour donner la possibilité aux adjoints de modifier les feuille de temps des employés
    const typeHoraire = this.route.snapshot.queryParams['type-horaire'];
    return route.startsWith("/gestion-employes") && typeHoraire === "horaireQuotidien";
  }

  protected cacherMessageHoraireModifie() {
    this.messageHoraireModifieAffiche = false;
  }

  public afficherMessageHoraireModifie() {
    this.messageHoraireModifieAffiche = true;
  }

  protected afficherFormulaire() {
    this.formulaireHoraireAffiche = true;
    this.cacherMessageHoraireModifie();
    this.referenceHoraire.desactiverBoutons();
  }

  public cacherFormulaire() {
    this.formulaireHoraireAffiche = false;
    this.referenceHoraire.reactiverBoutons();
  }

}
