import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', null, '');
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService,
              public router: Router) {

                activatedRoute.params.subscribe(params => {
                  const id = params.id;

                  if (id !== 'nuevo') {
                    this.getMedico(id);
                  }

                });

              }

  ngOnInit(): void {
     this._hospitalService.cargarHospitales()
          .subscribe(hospitales => this.hospitales = hospitales);

     this._modalUploadService.notificacion
            .subscribe(resp => {
               this.medico.img = resp.medico.img;
            });
  }

  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
         .subscribe(medico => {
           this.medico._id = medico.id;
           this.router.navigate(['/medico', medico._id]);
         });

  }

  cambioHospital(id: string) {
     this._hospitalService.obtenerHospital(id)
         .subscribe(hospital => {
           this.hospital = hospital;
         });
  }

  getMedico(id: string) {
      this._medicoService.getMedico(id)
          .subscribe(medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital(this.medico.hospital);
          });
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

}
