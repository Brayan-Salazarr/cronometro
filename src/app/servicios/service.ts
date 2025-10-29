import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor() {}

  crearObservableCronometro() : Observable<number>{
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(()=> {
        contador++;
        observer.next(contador);
      },1000);

      return () => clearInterval(intervalo); 
    });
  }
}
