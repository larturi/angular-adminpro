import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               public router: Router,
               public _ngZone: NgZone) {}

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this._ngZone.run(() => this.router.navigate(['/login']));
      return false;
    }

  }

}
