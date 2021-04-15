import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spieler} from "../../../../Models/spieler.model";
import {TischtennisService} from "../../../../Services/tischtennis.service";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tischtennis-mannschaften',
  templateUrl: './tischtennis-mannschaften.component.html',
  styleUrls: ['./tischtennis-mannschaften.component.css']
})
export class TischtennisMannschaftenComponent implements OnInit {

  tischtennisSpieler: Spieler[]; // Alle Spieler

  // Mannschaften

  ersteHerrenSpieler: Spieler[];
  zweiteHerrenSpieler: Spieler[];
  dritteHerrenSpieler: Spieler[];
  DamenSpieler: Spieler[];
  JugendSpieler: Spieler[];

  // Form

  mydeleteForm: FormGroup;
  myUpdateForm: FormGroup;

  // Konstruktor

  constructor(private formBuilder: FormBuilder, private ttService: TischtennisService, private router: Router) { }

  // OnInit

  ngOnInit(): void {

    this.getSpieler();

    this.updateAlleMannschaften();

    // reactive Form Control

    this.mydeleteForm = this.formBuilder.group({

      spielerid: ['', [
        Validators.required,
      ]]
    });

    this.myUpdateForm = this.formBuilder.group({

      spielerid: ['', [
        Validators.required,
      ]]
    });

  }

  getSpieler() {
    this.ttService.getSpieler().subscribe((userdata) => {
      this.tischtennisSpieler = userdata;
    });
  }

  getMannschaftSpieler(mannschaft) {
    this.ttService.getMannschaftSpieler(mannschaft).subscribe((userdata) => {
      if( mannschaft === '1. Herren') {
        this.ersteHerrenSpieler = userdata;
      }
      else if (mannschaft === '2. Herren') {
        this.zweiteHerrenSpieler = userdata;
      }
      else if (mannschaft === '3. Herren') {
        this.dritteHerrenSpieler = userdata;
      }
      else if (mannschaft === 'Damen') {
        this.DamenSpieler = userdata;
      }
      else if (mannschaft === 'Jugend') {
        this.JugendSpieler = userdata;
      }

    });
  }

  // Eigene Methoden

  updateAlleMannschaften() {
    // damit es direkt aktualisiert wird. Arrays neu laden
    this.getMannschaftSpieler('1. Herren');
    this.getMannschaftSpieler('2. Herren');
    this.getMannschaftSpieler('3. Herren');
    this.getMannschaftSpieler('Damen');
    this.getMannschaftSpieler('Jugend');
  }

  onSubmitEdit() {
    if (this.myUpdateForm.invalid) {
      return;
    }
    else {

      const spielerid = this.mydeleteForm.value.spielerid;

      this.mydeleteForm.reset();

      // den neuen Spieler in das Array aus dem Service hinzufügen
      this.ttService.loescheSpieler(spielerid)
        .subscribe();

      // damit es direkt aktualisiert wird. Arrays neu laden
      this.updateAlleMannschaften();

    }
  }

  onSubmitDelete() {
    if (this.mydeleteForm.invalid) {
      return;
    }
    else {

      const spielerid = this.mydeleteForm.value.spielerid;

      this.mydeleteForm.reset();

      // den neuen Spieler in das Array aus dem Service hinzufügen
      this.ttService.loescheSpieler(spielerid)
        .subscribe();

      // damit es direkt aktualisiert wird. Arrays neu laden
      this.updateAlleMannschaften();

    }
  }

  onDelete(spielerid: number) {

    // den neuen Spieler in das Array aus dem Service hinzufügen
    this.ttService.loescheSpieler(spielerid)
    .subscribe();

    // damit es direkt aktualisiert wird. Arrays neu laden
    this.updateAlleMannschaften();
  }

  deleteAlleSpieler() {
    this.ttService.loescheAlleSpieler().subscribe();
    // damit es direkt aktualisiert wird. Arrays neu laden
    this.updateAlleMannschaften();
  }




 /* Ende alles */
}

