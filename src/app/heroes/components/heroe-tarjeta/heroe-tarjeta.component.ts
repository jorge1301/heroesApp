import { Component, OnInit, Input } from '@angular/core';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 20px;
  }
  `
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input()
  heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {

  }

}
