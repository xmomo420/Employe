import {Component, Inject, Input, OnInit} from '@angular/core';
import {Quart} from "../../Model/Quart";
import {AffichageHoraireComponent} from "../Abstrait/affichage-horaire/affichage-horaire.component";
import {DateUtils} from "../../Utils/date-utils";
import {Horaire} from "../../Model/horaire";
import {HoraireService} from "../../Service/horaire.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-formulaire-horaire',
  templateUrl: './formulaire-horaire.component.html',
  styleUrl: './formulaire-horaire.component.css'
})
export class FormulaireHoraireComponent implements OnInit{
  @Input() dateDebut!: Date;
  @Input() idEmploye!: number;
  protected messageErreurAffiche: boolean = false;
  protected readonly Quart = Quart;
  // Pour le formulaire du quart
  @Input() horaire!: Horaire | null;
  protected readonly DateUtils = DateUtils;
  protected formulaireQuartAffiche: boolean = false;
  protected messageQuartAjouteOuSupprime: boolean = false;
  protected dateQuart!: Date;
  protected messageIndicationApproprie: string = "";

  protected readonly MESSAGE_ERREUR_HORAIRE = "Erreur lors de l'ajout de l'horaire";
  protected readonly MESSAGE_QUART_AJOUTE = "Le quart de travail a été ajouté";
  protected readonly MESSAGE_QUART_SUPPRIME = "Le quart de travail a été supprimé";
  protected readonly MESSAGE_AUCUN_HORAIRE_A_SUPPRIMER = "Aucun horaire à supprimer";



  constructor(
    @Inject(AffichageHoraireComponent) protected referenceAffichageHoraire: AffichageHoraireComponent,
    private readonly horaireService: HoraireService,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.horaire === null) {
      this.horaire = new Horaire(new Array<Quart>(), this.idEmploye, this.dateDebut);
    }
  }

  protected async supprimerHoraire() {
    const typeHoraire = this.route.snapshot.queryParams['type-horaire'];
    const idEmploye = this.route.snapshot.queryParams['id'];
    if (await this.horaireService.supprimerHoraire(idEmploye, typeHoraire, this.dateDebut)) {
      this.cacherFormulaire();
      this.referenceAffichageHoraire.afficherMessageHoraireModifie();
      await this.referenceAffichageHoraire.referenceHoraire.chargerHoraire();
    } else {
      this.afficherMessageErreur(this.MESSAGE_AUCUN_HORAIRE_A_SUPPRIMER);
    }
  }

  protected async soummettreHoraire() {
    if (this.horaire?.quartsTravail.length === 0) {
      await this.supprimerHoraire();
      return;
    }
    this.horaire!.employe = this.route.snapshot.queryParams['id'];
    this.horaire!.dateDebut = this.dateDebut;
    const horaireModifie = await this.horaireService.ajouterNouvelHoraire(this.horaire!);
    if (horaireModifie) {
      this.cacherFormulaire();
      this.referenceAffichageHoraire.afficherMessageHoraireModifie();
      await this.referenceAffichageHoraire.referenceHoraire.chargerHoraire();
    } else {
      this.afficherMessageErreur(this.MESSAGE_ERREUR_HORAIRE);
    }
  }

  public afficherFormulaireQuart(jour: number) {
    this.dateQuart = DateUtils.getDateByJourSemaine(jour, this.dateDebut);
    this.cacherMessageQuartAjouteOuSupprime();
    this.cacherMessageErreur();
    this.formulaireQuartAffiche = true;
  }

  public cacherFormulaireQuart() {
    this.formulaireQuartAffiche = false;
  }

  protected cacherFormulaire() {
    this.referenceAffichageHoraire.cacherFormulaire();
  }

  public afficherMessageQuartAjouteOuSupprime() {
    this.messageQuartAjouteOuSupprime = true;
  }

  public cacherMessageQuartAjouteOuSupprime() {
    this.messageQuartAjouteOuSupprime = false;
  }

  public ajouterQuart(quart: Quart) {
    this.horaire?.ajouterQuart(quart);
    this.messageIndicationApproprie = this.MESSAGE_QUART_AJOUTE;
    this.afficherMessageQuartAjouteOuSupprime();
  }

  protected quartByJourExiste(jour: number): boolean {
    return this.horaire?.getQuartByJour(jour) !== undefined;
  }

  supprimerQuart(dateDuQuart: Date) {
    this.horaire?.supprimerQuart(dateDuQuart);
    this.messageIndicationApproprie = this.MESSAGE_QUART_SUPPRIME;
    this.afficherMessageQuartAjouteOuSupprime();
  }

  private afficherMessageErreur(message: string) {
    this.messageIndicationApproprie = message;
    this.messageErreurAffiche = true;
  }

  private cacherMessageErreur() {
    this.messageErreurAffiche = false;
  }
}
