import { Component } from '@angular/core';
import {Employe} from "../../Model/Employe";

@Component({
  selector: 'app-affichage-employe',
  templateUrl: './affichage-employe.component.html',
  styleUrl: './affichage-employe.component.css'
})
export class AffichageEmployeComponent {

  private employe?: Employe;

}
