import {EventEmitter, Injectable} from '@angular/core';
import {Spieler} from "../Models/spieler.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TischtennisService {

  // Konstruktor

  constructor(private http: HttpClient) { }

  // Attribute

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  // Methoden


  onUpload(image: File) {
    const uploadData = new FormData();
    uploadData.append('myFile', image);

    this.http.post('http://localhost:3000/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }


  erstelleSpieler(spieler: Spieler): Observable<Spieler> {

    const datenDesNeuenSpielers = {
        ganzername:   spieler.ganzername,
        lebensjahr:   spieler.lebensjahr,
        qttr:         spieler.qttr,
        mannschaft:   spieler.mannschaft,
        bildpfad:     'assets/' + spieler.bildpfad
    };

    return this.http.post<Spieler>('http://localhost:3000/erstelleSpieler', { datenDesNeuenSpielers }, this.httpOptions);

  }

  bearbeiteSpieler(spielerid: number, name: string, alter: number, mannschaft: string, qttr: number, bild: string) {

    const datenDesBearbeitetenSpielers = {
      spielerid,
      ganzername:   name,
      lebensjahr:   alter,
      mannschaft,
      qttr,
      bildpfad:     'assets/' + bild
  }
    return this.http.patch<Spieler>('http://localhost:3000/bearbeiten/' + spielerid, { datenDesBearbeitetenSpielers },  this.httpOptions);
  }

  loescheSpieler(spielerid: number): Observable<Spieler> {

    return this.http.delete<Spieler>('http://localhost:3000/loescheSpieler/' + spielerid, this.httpOptions);

  }

  loescheAlleSpieler() {
    return this.http.delete<Spieler>('http://localhost:3000/loescheSpieler', this.httpOptions);
  }

  // Getter & Setter

  getEinenSpieler(spielerid: number) {
    return this.http.get<Spieler>('http://localhost:3000/bekommeEinenSpieler/' + spielerid );
  }

  getSpieler(): Observable<Spieler[]> {
    return this.http.get<Spieler[]>('http://localhost:3000/bekommeSpieler');
  }

  getMannschaftSpieler(mannschaft: string): Observable<Spieler[]> {
    return this.http.get<Spieler[]>('http://localhost:3000/bekommeSpieler/' + mannschaft, this.httpOptions);
  }



}
