import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apikey: string = 'GxU394T66OYQa4MEs2TJTL4Z82Wa2w0W'; 
  public gifs: any[] = [];
  constructor(private http: HttpClient) { }
  

  get historial(){
    this._historial = this._historial.splice(0,10);
    return [...this._historial];
  }

  buscarGifs(termino: string): any{
    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', termino);
    termino = termino.trim().toLocaleLowerCase();
    if(!this._historial.includes(termino)){
      this._historial.unshift(termino);
      this._historial = this._historial.splice(0,10);
      const url = `${base_url}search?`;
      return this.http.get<any>(url, {params}).subscribe( (resp: any) => {
        console.log(resp.data);
        this.gifs = resp.data;
      });
    }
    console.log(this._historial);
  }
  
}
