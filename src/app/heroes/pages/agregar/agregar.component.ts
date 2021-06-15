import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    height: 50%;
    border-radius: 5px;
    object-fit: contain;
  }`
  ]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: '',
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.heroeService.getHeroeById(id)
          .subscribe((heroe: Heroe) => this.heroe = heroe)
      })
  }

  guardar() {
    if (this.heroe.id) {
      this.heroeService.putHeroe(this.heroe)
        .subscribe((heroe: Heroe) => {
          this.heroe = heroe;
          this.mostrarSnakbar('Registro Actualizado');
        })
    } else {
      this.heroeService.postNewHeroe(this.heroe)
        .subscribe((heroe: Heroe) => {
          this.heroe = heroe;
          this.mostrarSnakbar('Registro Añadido');
          this.router.navigate(['heroes']);
        })
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroeService.deleteHeroe(this.heroe.id!)
          .subscribe(resp => {
            this.mostrarSnakbar('Registro Eliminado');
            this.router.navigate(['heroes']);
          })
      }
    })
  }

  mostrarSnakbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }
}
