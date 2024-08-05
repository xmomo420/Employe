import {Component, Input} from '@angular/core';
import { Horaire } from '../../../Model/horaire';
import {Quart} from "../../../Model/Quart";
import {HoraireComponent} from "../../horaire/horaire.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-affichage-horaire',
  templateUrl: './affichage-horaire.component.html',
  styleUrl: './affichage-horaire.component.css'
})
export class AffichageHoraireComponent {

  @Input() _horaire: Horaire | null = null;
  @Input() _dateDebut: Date | undefined;
  protected readonly Quart = Quart;
  protected afficherInputsModifications: boolean = false;

  constructor(private readonly router: Router) { }

  get horaire(): Horaire | null {
    return this._horaire;
  }

  set horaire(value: Horaire) {
    this._horaire = value;
  }

  get dateDebut(): Date {
    return <Date>this._dateDebut;
  }

  set dateDebut(value: Date) {
    this._dateDebut = value;
  }

  public joursSemaine: { [key: string]: string } = {
    0: "Lundi",
    1: "Mardi",
    2: "Mercredi",
    3: "Jeudi",
    4: "Vendredi",
    5: "Samedi",
    6: "Dimanche"
  };

  public getDateByJourSemaine(jourSemaine: number): Date {
    const nouvelleDate = new Date(this.dateDebut);
    nouvelleDate.setDate(nouvelleDate.getDate() + jourSemaine);
    return nouvelleDate;
  }

  public getJoursSemaineKeys(): number[] {
    return Object.keys(this.joursSemaine).map(Number);
  }

  private moisToString(mois: number): string {
    switch (mois) {
      case 0:
        return "janvier";
      case 1:
        return "février";
      case 2:
        return "mars";
      case 3:
        return "avril";
      case 4:
        return "mai";
      case 5:
        return "juin";
      case 6:
        return "juillet";
      case 7:
        return "août";
      case 8:
        return "septembre";
      case 9:
        return "octobre";
      case 10:
        return "novembre";
      case 11:
        return "décembre";
      default:
        return "";
    }
  }

  public formatterDate(date?: Date): string {
    // TODO : Fonction qui affiche les dates dans un format plus lisible, ex : 28 janvier
    if (date) {
      const dateParam = new Date(date);
      return dateParam.getDate() + " " + this.moisToString(dateParam.getMonth());
    }
    return "";
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
    return route.startsWith("/gestion-employes");
  }

}
