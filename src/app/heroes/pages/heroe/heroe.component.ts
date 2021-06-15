import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(private activatedRoute: ActivatedRoute, private heroeService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.heroeService.getHeroeById(id)
          .subscribe((heroe: Heroe) => {
            this.heroe = heroe;
          })
      });
  }

  regresar(): void {
    this.router.navigate(['/heroes/listado'])
  }

}
