import {Component, Inject, Input} from '@angular/core';
import {FormulaireHoraireComponent} from "../formulaire-horaire/formulaire-horaire.component";
import {Quart} from "../../Model/Quart";
import {DateUtils} from "../../Utils/date-utils";

@Component({
  selector: 'app-formulaire-quart',
  templateUrl: './formulaire-quart.component.html',
  styleUrl: './formulaire-quart.component.css'
})
export class FormulaireQuartComponent {

  @Input() date!: Date;
  protected heureDebut!: Date;
  protected heureFin!: Date;
  protected debutRepas!: Date;
  protected finRepas!: Date;
  protected afficherErreur: boolean = false;

  protected readonly MESSAGE_ERREUR = "Erreur lors de l'ajout du quart";

  constructor(@Inject(FormulaireHoraireComponent) protected referenceFormulaireHoraire: FormulaireHoraireComponent) { }

  protected async ajouterQuart() {
    this.ajouterJoursAuxDates();
    const nouveauQuart: Quart = new Quart(this.date, this.heureDebut, this.heureFin, this.debutRepas, this.finRepas);
    // Le formulaire valide le quart
    this.referenceFormulaireHoraire.ajouterQuart(nouveauQuart);
    this.referenceFormulaireHoraire.cacherFormulaireQuart();
  }

  protected cacherFormulaire() {
    this.referenceFormulaireHoraire.cacherFormulaireQuart();
  }

  protected dateFormattee(): string {
    const jourSemaine = this.date.getDay() === 0 ? 6 : this.date.getDay() - 1;
    const jourSemaineString = DateUtils.joursSemaine[jourSemaine];
    return `${jourSemaineString} le ${DateUtils.formatterDate(this.date)}`;
  }

  private getDateAvecTemps(heure: Date) : string {
    return `${this.date.toLocaleDateString()}T${heure.toString()}:00`;
  }

  private ajouterJoursAuxDates() {
    let dateAvecTemps = this.getDateAvecTemps(this.heureDebut);
    this.heureDebut = new Date(dateAvecTemps);
    dateAvecTemps = this.getDateAvecTemps(this.heureFin);
    this.heureFin = new Date(dateAvecTemps);
    if (this.debutRepas) {
      dateAvecTemps = this.getDateAvecTemps(this.debutRepas);
      this.debutRepas = new Date(dateAvecTemps);
    }
    if (this.finRepas) {
      dateAvecTemps = this.getDateAvecTemps(this.finRepas);
      this.finRepas = new Date(dateAvecTemps);
    }
  }

  protected supprimerQuart(dateDuQaurt: Date) {
    this.referenceFormulaireHoraire.supprimerQuart(dateDuQaurt);
  }
}
