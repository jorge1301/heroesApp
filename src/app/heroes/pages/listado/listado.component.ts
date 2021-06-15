import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {
  listaHeroes: Heroe[] = [];

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
    this.heroeService.getHeroes()
      .subscribe((resp: Heroe[]) => this.listaHeroes = resp)

  }


}
