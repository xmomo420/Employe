import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Composants/navbar/navbar.component';
import { HomeComponent } from './Composants/home/home.component';
import {FormsModule} from "@angular/forms";
import {AuthentificationService} from "./Service/authentification.service";
import {LoginComponent} from './Composants/login/login.component';
import { HoraireComponent } from './Composants/horaire/horaire.component';
import { GestionEmployesComponent } from './Composants/gestion-employes/gestion-employes.component';
import { FeuilleDeTempsEmployeConnecteComponent } from './Composants/feuille-de-temps/feuille-de-temps-employe-connecte.component';
import { NonAuthoriseComponent } from './Composants/non-authorise/non-authorise.component';
import { PageInexistanteComponent } from './Composants/page-inexistante/page-inexistante.component';
import { AffichageHoraireComponent } from './Composants/Abstrait/affichage-horaire/affichage-horaire.component';
import { HoraireEmployeConnecteComponent } from './Composants/horaire-employe-connecte/horaire-employe-connecte.component';
import { AffichageEmployeComponent } from './Composants/affichage-employe/affichage-employe.component';
import { FormulaireNouvelEmployeComponent } from './Composants/formulaire-nouvel-employe/formulaire-nouvel-employe.component';
import { HoraireEmployeGestionComponent } from './Composants/horaire-employe-gestion/horaire-employe-gestion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    HoraireComponent,
    GestionEmployesComponent,
    FeuilleDeTempsEmployeConnecteComponent,
    NonAuthoriseComponent,
    PageInexistanteComponent,
    AffichageHoraireComponent,
    HoraireEmployeConnecteComponent,
    AffichageEmployeComponent,
    FormulaireNouvelEmployeComponent,
    HoraireEmployeGestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    AuthentificationService,
    AffichageHoraireComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
