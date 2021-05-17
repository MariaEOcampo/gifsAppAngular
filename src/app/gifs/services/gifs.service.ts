import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = '45xpgpWtuOK358g4tHu4eL7aHm2fULEI';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('history')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
    /* if (localStorage.getItem('history')) {
      this._historial = JSON.parse(localStorage.getItem('history')!);
    } */
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp: SearchGIFResponse) => {
        console.log(resp.data);
        this.resultado = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultado));
      });
  }
}
