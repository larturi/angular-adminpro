import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  imagenOld = '';

  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) {
   }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire(
        'Solo imagenes',
        'El archivo seleccionado no es una imagen valida',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir,
                                           this._modalUploadService.tipo,
                                           this._modalUploadService.id)
                           .then( resp => {
                             this._modalUploadService.notificacion.emit(resp);
                             this._modalUploadService.ocultarModal();
                           })
                           .catch( err => {
                             console.log('Error en la carga de la imagen');

                           });
  }

}
