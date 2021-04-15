import { Component, OnInit } from '@angular/core';

interface Bilder {
  img: string;
  caption: string;
}

@Component({
  selector: 'app-tischtennis-galerie',
  templateUrl: './tischtennis-galerie.component.html',
  styleUrls: ['./tischtennis-galerie.component.css'],
})
export class TischtennisGalerieComponent implements OnInit {
  bilder: Bilder[] = [
    { img: 'assets/1.4.jpg', caption: 'Punktspiel der 1. Herren' },
    { img: 'assets/1.2.jpg', caption: 'Punktspiel der 2. Herren' },
    { img: 'assets/1.1.jpg', caption: 'Punktspiel der Damen' },
    { img: 'assets/1.3.jpg', caption: 'Vereinsmeisterschaften' },
    { img: 'assets/1training.jpg', caption: 'Ja auch zu dritt oder...' },
    { img: 'assets/3training.jpg', caption: 'zu viert geht Tischtennis' },
    { img: 'assets/2training.jpg', caption: 'Erst ein Topsin...' },
    { img: 'assets/4training.jpg', caption: 'und dann etwas Ballonabwehr' },
    {
      img: 'assets/1auszeit.jpg',
      caption: 'Gemeinsam eine Pause gönnen und lecker essen & trinken',
    },
    { img: 'assets/2auszeit.jpg', caption: 'Grillen geht immer' },
    { img: 'assets/1pokal.jpg', caption: 'Siegerin Damen' },
    { img: 'assets/2pokal.jpg', caption: 'Sieger im Doppel' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
