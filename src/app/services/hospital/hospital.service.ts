import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {}

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
          .map( (resp: any) => {
            this.totalHospitales = resp.total;
            return resp.hospitales;
          });
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
          .map( (resp: any) => {
             return resp.hospital;
          });
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url)
          .map( (resp: any) => {
            Swal.fire(
              'Hospital borrado',
              'El hospital ha sido borrado correctamente',
              'success'
            );
          });
  }

  crearHospital(nombreHospital: string) {
    const url = URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre: nombreHospital})
         .map((resp: any) => resp.hospital);

  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
         .map( (resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
         .map( (resp: any) => {
          Swal.fire(
            'Hospital actualizado',
            'El hospital ha sido actualizado correctamente',
            'success'
          );
          return resp.hospital;
          });
  }


}
