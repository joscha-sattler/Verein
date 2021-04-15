import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TischtennisService } from '../../../../Services/tischtennis.service';
import { Spieler } from '../../../../Models/spieler.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-erstelle-spieler',
  templateUrl: './erstelle-spieler.component.html',
  styleUrls: ['./erstelle-spieler.component.css'],
})
export class ErstelleSpielerComponent implements OnInit {
  // Attribute ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  myForm: FormGroup;
  selectedFile: File;
  ttspieler: Spieler[];
  preview: string;

  private spieleridstring: string;
  private spieleridnumber: number;
  mode = 'erstelleSpieler';

  // Konstruktor ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  constructor(
    private formBuilder: FormBuilder,
    private ttService: TischtennisService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  // INIT ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  ngOnInit(): void {
    // reactive Form Control
    this.myForm = this.formBuilder.group({
      ganzername: ['', [Validators.required, Validators.minLength(3)]],

      lebensjahr: ['', [Validators.required, Validators.min(5)]],

      mannschaft: ['', [Validators.required, Validators.minLength(5)]],

      qttr: [
        '',
        [Validators.required, Validators.min(700), Validators.max(3000)],
      ],
      pfad: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('spielerid')) {
        this.mode = 'bearbeiten';
        this.spieleridstring = paramMap.get('spielerid');
        this.spieleridnumber = +this.spieleridstring;

        this.ttService
          .getEinenSpieler(this.spieleridnumber)
          .subscribe((spielerData) => {
            const ganzername = spielerData[0].ganzername;
            const lebensjahr = spielerData[0].lebensjahr;
            const qttr = spielerData[0].qttr;
            const mannschaft = spielerData[0].mannschaft;
            const bildpfad = '';

            this.myForm.setValue({
              ganzername,
              lebensjahr,
              mannschaft,
              qttr,
              pfad: bildpfad,
            });
          });
      } else {
        this.mode = 'erstelleSpieler';
        this.spieleridnumber = null;
      }
    });
  }

  // Bild-Vorschau ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  onFileChanged(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  // ONSUBMIT ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    } else if (this.mode === 'erstelleSpieler') {
      // Bild erst lokal hochladen

      this.ttService.onUpload(this.selectedFile);

      // neuen Spieler mit den Werten aus der Form und dem Bild-File anlegen
      const neuerSpieler = new Spieler(
        this.myForm.value.spielerid,
        this.myForm.value.ganzername,
        this.myForm.value.lebensjahr,
        this.myForm.value.qttr,
        this.myForm.value.mannschaft,
        this.selectedFile.name
      );

      this.myForm.reset();
      this.router.navigate(['/tischtennis/mannschaften']);

      // den neuen Spieler in das Array aus dem Service hinzufügen
      this.ttService.erstelleSpieler(neuerSpieler).subscribe((data) => {
        console.log(data);
      });
    } else {
      // Bild erst lokal hochladen

      this.ttService.onUpload(this.selectedFile);

      const spielerid = this.spieleridnumber;
      const ganzername = this.myForm.value.ganzername;
      const lebensjahr = this.myForm.value.lebensjahr;
      const qttr = this.myForm.value.qttr;
      const mannschaft = this.myForm.value.mannschaft;
      const pfad = this.selectedFile.name;

      this.ttService
        .bearbeiteSpieler(
          spielerid,
          ganzername,
          lebensjahr,
          mannschaft,
          qttr,
          pfad
        )
        .subscribe((data) => {
          console.log(data);
        });

      this.myForm.reset();
      this.router.navigate(['/tischtennis/mannschaften']);
    }
  }
}
