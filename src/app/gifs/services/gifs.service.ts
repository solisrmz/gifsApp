import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { GifsResponse, Datum } from '../../interfaces/gifs.interface';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apikey: string = 'GxU394T66OYQa4MEs2TJTL4Z82Wa2w0W'; 
  public gifs: Datum[] = [];

  constructor(private http: HttpClient) {
    if(localStorage.getItem('historial') && localStorage.getItem('resultados')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];
      this.gifs = JSON.parse(localStorage.getItem('resultados')!)|| [];
    }
  }
  
  get historial(){
    this._historial = this._historial.splice(0,10);
    return [...this._historial];
  }

  buscarGifs(termino: string = '') {
    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', termino);

    termino = termino.trim().toLocaleLowerCase();
    const url = `${base_url}search?`;

    if(!this._historial.includes(termino)){
      this._historial.unshift(termino);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    console.log(this._historial);
    this.http.get<GifsResponse>(url, {params}).subscribe( (resp) => {
      console.log(resp.data);
      this.gifs = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.gifs));
    });
  }
  
}
