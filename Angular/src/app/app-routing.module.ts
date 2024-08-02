import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Composants/login/login.component";
import {HomeComponent} from "./Composants/home/home.component";
import {FeuilleDeTempsEmployeConnecteComponent} from "./Composants/feuille-de-temps/feuille-de-temps-employe-connecte.component";
import {GestionEmployesComponent} from "./Composants/gestion-employes/gestion-employes.component";
import {
  HoraireEmployeConnecteComponent
} from "./Composants/horaire-employe-connecte/horaire-employe-connecte.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'gestion-employes', component: GestionEmployesComponent },
  { path: 'feuille-de-temps', component: FeuilleDeTempsEmployeConnecteComponent },
  { path: 'horaire', component: HoraireEmployeConnecteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
