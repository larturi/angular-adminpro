import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

    this.suscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    const contador = 0;

    const salida = {
      valor: contador
    };

    return new Observable( (observer: Subscriber<any>) => {

      const intervalo = setInterval( () => {

        salida.valor += 1;

        observer.next(salida);

        // if (salida.valor === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

      }, 1000);

   }).pipe(
     map( resp => resp.valor),
     filter( (valor, index) => {

       if ( (valor % 2 === 1) ) {
          // impar
          return true;
       } else {
         // par
         return false;
       }

     })
   );

  }

}
