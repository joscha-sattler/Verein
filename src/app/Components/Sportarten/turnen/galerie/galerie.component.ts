import { Component, OnInit } from '@angular/core';

interface Bilder {
  name: string;
}

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css'],
})
export class GalerieComponent implements OnInit {
  bilder: Bilder[] = [
    { name: 'assets/turnen1.jpg' },
    { name: 'assets/turnen2.jpg' },
    { name: 'assets/turnen3.jpg' },
    { name: 'assets/turnen4.jpg' },
    { name: 'assets/turnen5.jpg' },
    { name: 'assets/turnen6.jpg' },
    { name: 'assets/turnen7.jpg' },
    { name: 'assets/turnen8.jpg' },
    { name: 'assets/turnen9.jpg' },
    { name: 'assets/turnen10.jpg' },
    { name: 'assets/turnen11.jpg' },
    { name: 'assets/turnen12.jpg' },
    { name: 'assets/turnen13.jpg' },
    { name: 'assets/turnen14.jpg' },
    { name: 'assets/turnen15.jpg' },
    { name: 'assets/turnen16.jpg' },
    { name: 'assets/turnen17.jpg' },
  ];


  constructor() {}

  ngOnInit() {}
}
