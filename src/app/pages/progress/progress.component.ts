import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progresoAzul = 50;
  progresoVerde = 60;

  constructor() { }

  ngOnInit(): void {
  }

  actualizar( event: number, barra: any ) {

    switch (barra) {
      case 'progresoAzul':
        this.progresoAzul = event;
        break;

      case 'progresoVerde':
        this.progresoVerde = event;
        break;
    }

  }

}
