import { Injectable, NgZone } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token = '';

  constructor(public http: HttpClient,
              public router: Router,
              public _ngZone: NgZone) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarLocalStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._ngZone.run(() => this.router.navigate(['/login']));
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
          .map ( (resp: any) => {
              this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
              return true;
          });
  }

  login(usuario: Usuario, recordar: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
      localStorage.setItem('password', usuario.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
        .map( (resp: any) => {
           this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
           return true;
        });

  }

  crearUsuario(usuario: Usuario) {

     const url = URL_SERVICIOS + '/usuario';

     return this.http.post(url, usuario)
         .map((resp: any) => {
          Swal.fire(
            'Usuario creado',
            usuario.email,
            'success'
          );
          return resp.usuario;
         });

  }


}