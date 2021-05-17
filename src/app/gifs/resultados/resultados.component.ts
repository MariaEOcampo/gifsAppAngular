import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  get resultados() {
    return this.gifsService.resultado;
  }

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}
}
