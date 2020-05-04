import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): unknown {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      // Muestro imagen por defecto
      return url + '/usuarios/default';
    }

    if (img.indexOf('http') >= 0) {
      // Imagen viene de google
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de usuario no existe: usuarios, medicos, hospitales');
        url += '/usuarios/default';

    }

    return url;
  }

}
