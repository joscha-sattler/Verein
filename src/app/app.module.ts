import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { SliderComponent } from './Components/navigation/slider/slider.component';
import { TischtennisComponent } from './Components/Sportarten/tischtennis/tischtennis.component';
import { TischtennisMannschaftenComponent } from './Components/Sportarten/tischtennis/tischtennis-mannschaften/tischtennis-mannschaften.component';
import { StartseiteComponent } from './Components/startseite/startseite.component';
import { HandballComponent } from './Components/Sportarten/handball/handball.component';
import { VolleyballComponent } from './Components/Sportarten/volleyball/volleyball.component';
import { ErstelleSpielerComponent } from './Components/Sportarten/tischtennis/erstelle-spieler/erstelle-spieler.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TischtennisGalerieComponent } from './Components/Sportarten/tischtennis/tischtennis-galerie/tischtennis-galerie.component';
import { TurnenComponent } from './Components/Sportarten/turnen/turnen.component';
import { GalerieComponent } from './Components/Sportarten/turnen/galerie/galerie.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SliderComponent,
    TischtennisComponent,
    TischtennisMannschaftenComponent,
    StartseiteComponent,
    HandballComponent,
    VolleyballComponent,
    ErstelleSpielerComponent,
    TischtennisGalerieComponent,
    TurnenComponent,
    GalerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
