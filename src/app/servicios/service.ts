import { Injectable } from '@angular/core';
import { interval, Observable, scan } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

crearObservableCronometro(): Observable<number> {
    return interval(1000).pipe(
      scan((contador) => contador + 1, 0)
    );
  }
}
