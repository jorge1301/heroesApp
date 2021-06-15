import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  listaHeroes: Heroe[] = [];
  heroeSelected!: Heroe | undefined;
  
  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscar() {
    this.heroeService.getSuggestion(this.termino.trim())
      .subscribe(heroes => this.listaHeroes = heroes);
  }

  chosenOption(event: MatAutocompleteSelectedEvent) {
    const { value }: { value: Heroe } = event.option;
    if (!value) {
      this.heroeSelected = undefined;
      return;
    }
    this.termino = value.superhero;
    this.heroeSelected = value;
  }
}
