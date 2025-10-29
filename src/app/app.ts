import { Component, OnDestroy, signal} from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Service } from './servicios/service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   protected readonly title = signal('cronometro');

  tiempo = signal(0);
  private subscripcion?: Subscription;

  constructor(private cronometroService : Service){}

  empezar(): void{
    if(!this.subscripcion){
      this.subscripcion = this.cronometroService.crearObservableCronometro().subscribe(seg => this.tiempo.set( seg ))
    }
  }

  reiniciar(): void{
    this.subscripcion?.unsubscribe();
    this.tiempo.set(0);
    this.subscripcion = this.cronometroService.crearObservableCronometro().subscribe(seg => this.tiempo.set( seg ))
  }
}
