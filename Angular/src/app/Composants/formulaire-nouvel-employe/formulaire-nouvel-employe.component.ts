import {Component, Input} from '@angular/core';
import {EmployeService} from "../../Service/employe.service";
import {GestionEmployesComponent} from "../gestion-employes/gestion-employes.component";

@Component({
  selector: 'app-formulaire-nouvel-employe',
  templateUrl: './formulaire-nouvel-employe.component.html',
  styleUrl: './formulaire-nouvel-employe.component.css'
})
export class FormulaireNouvelEmployeComponent {

  prenom: string = ""
  nom: string = ""
  role: string = "";
  tauxHoraire: number = 0;
  @Input() gestionEmploye!: GestionEmployesComponent

  constructor(private employeService: EmployeService) { }


}
