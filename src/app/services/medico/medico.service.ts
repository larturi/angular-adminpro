import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
            .map( (resp: any) => {
               this.totalMedicos = resp.total;
               return resp.medicos;
            });

  }

  buscarMedico(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
         .map((res: any) => res.medicos);
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url)
          .map( (resp: any) => {
            Swal.fire(
              'Médico borrado',
              'El médico ha sido borrado correctamente',
              'success'
            );
          });
  }

  getMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
        .map((res: any) => res.medico);
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizando
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
          .map((resp: any) => {
            Swal.fire(
              'Médico actualizado',
              medico.nombre,
              'success'
            );
            return resp.medico;
          });

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
          .map((resp: any) => {
            Swal.fire(
              'Médico creado',
              medico.nombre,
              'success'
            );
            return resp.medico;
          });

    }

  }

}
