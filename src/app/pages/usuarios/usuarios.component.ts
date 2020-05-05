import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string) {
     this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)

        .subscribe((resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });

  }

  cambiarDesde(valor: number) {

      const newDesde = this.desde + valor;

      if (newDesde >= this.totalRegistros) {
         return;
      }

      if (newDesde < 0) {
        return;
      }

      this.desde += valor;

      this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length === 0) {
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }

  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        'No se puede borrar el usuario',
        'No puede borrarse a usted mismo',
        'error'
      );
      return;
    }

    Swal.fire({
      title: 'Estas seguro de eliminar a ' + usuario.nombre,
      text: 'Esta acción no podrá revertirse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {

        this.cargando = true;

        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe((resp: any) => {
              this.desde = 0;
              this.cargarUsuarios();
            });

        Swal.fire(
          'Usuario borrado!',
          'El usuario se ha borrado correctamente',
          'success'
        );
      }
    });

  }

  guardarUsuario(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario)
         .subscribe(resp => {
           console.log(resp);
         });

  }

}
