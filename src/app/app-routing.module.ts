import { GalerieComponent } from './Components/Sportarten/turnen/galerie/galerie.component';
import { TurnenComponent } from './Components/Sportarten/turnen/turnen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TischtennisMannschaftenComponent } from './Components/Sportarten/tischtennis/tischtennis-mannschaften/tischtennis-mannschaften.component';
import { StartseiteComponent } from './Components/startseite/startseite.component';
import { HandballComponent } from './Components/Sportarten/handball/handball.component';
import { VolleyballComponent } from './Components/Sportarten/volleyball/volleyball.component';
import { ErstelleSpielerComponent } from './Components/Sportarten/tischtennis/erstelle-spieler/erstelle-spieler.component';
import { TischtennisComponent } from './Components/Sportarten/tischtennis/tischtennis.component';
import { TischtennisGalerieComponent } from './Components/Sportarten/tischtennis/tischtennis-galerie/tischtennis-galerie.component';

const routes: Routes = [
  { path: '', redirectTo: '/startseite', pathMatch: 'full' },
  { path: 'startseite', component: StartseiteComponent },

  // Sportseiten
  { path: 'tischtennis/allgemein', component: TischtennisComponent },
  {
    path: 'tischtennis/mannschaften',
    component: TischtennisMannschaftenComponent,
  },
  { path: 'tischtennis/galerie', component: TischtennisGalerieComponent },
  { path: 'erstelleSpieler', component: ErstelleSpielerComponent },
  { path: 'bearbeiten/:spielerid', component: ErstelleSpielerComponent },

  { path: 'handball', component: HandballComponent },
  { path: 'volleyball', component: VolleyballComponent },

  { path: 'turnen/allgemein', component: TurnenComponent },
  { path: 'turnen/galerie', component: GalerieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
