import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(public activatedRoute: ActivatedRoute,
              public httpClient: HttpClient) {
    activatedRoute.params
         .subscribe(params => {
           const termino = params.termino;
           this.buscar(termino);

         });
   }

  ngOnInit(): void {
  }

  buscar(termino: string) {
     const url = URL_SERVICIOS + '/busqueda/all/' + termino;
     this.httpClient.get(url)
         .subscribe((resp: any) => {
            this.usuarios = resp.usuarios;
            this.hospitales = resp.hospitales;
            this.medicos = resp.medicos;
         });
  }

}
