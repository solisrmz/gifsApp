import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('termino') input!: ElementRef<HTMLInputElement>; 
  constructor(private gs: GifsService ) { 

  }

  ngOnInit(): void {
  }

  buscar(){
    const valor = this.input.nativeElement.value;
    if( valor.trim().length === 0){
      return;
    }else{
      this.gs.buscarGifs(valor);
    }
    this.input.nativeElement.value = '';
  }

}
