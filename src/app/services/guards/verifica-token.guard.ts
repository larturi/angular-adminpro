import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  verificaRenuevaToken(fechaExp: number): Promise<boolean> {
     return new Promise( (resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      // Siempre actualizo el token por 4 horas mas
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
         resolve(true);
      } else {
        // Token proximo a vencer, lo renuevo
        this._usuarioService.renuevaToken()
             .subscribe( () => {
                 resolve(true);
             }, () => {
               this.router.navigate(['/login']);
               reject(false);
             });
      }

     });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
       return true;
    } else {
      return false;
    }
  }

}
