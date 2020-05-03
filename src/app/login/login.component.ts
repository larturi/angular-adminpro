import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  password: string;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _ngZone: NgZone) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    this.password = localStorage.getItem('password') || '';

    if (this.email.length > 0) {
       this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
       this.auth2 = gapi.auth2.init({
         client_id: '682059001098-1at0l6aqugrm47g89jgtri3gjigtgbf1.apps.googleusercontent.com',
         cookiepolicy: 'single_host_origin',
         scope: 'profile email'
       });

       this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn(element) {
     this.auth2.attachClickHandler(element, {}, (googleuser) => {
        // const profile = googleuser.getBasicProfile();
        const token = googleuser.getAuthResponse().id_token;
        this._usuarioService.loginGoogle(token)
               .subscribe( () => this._ngZone.run(() => this.router.navigate(['/dashboard'])));
     });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
         .subscribe(loginCorrecto => this.router.navigate(['/dashboard']));

  }

}
