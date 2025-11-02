import { Component, signal} from '@angular/core';
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
  
 readonly title = signal('cronometro');
  tiempo = signal(0);
  private subscripcion?: Subscription;
  private running = signal(false);

  constructor(private cronometroService: Service) {}

  empezar(): void {
    if (this.running()) return; // ya está corriendo
    this.running.set(true);
    this.subscripcion = this.cronometroService
      .crearObservableCronometro()
      .subscribe(seg => this.tiempo.set(seg));
  }

  reiniciar(): void {
    this.detener();
    this.tiempo.set(0);
    this.empezar();
  }

  detener(): void {
    this.subscripcion?.unsubscribe();
    this.subscripcion = undefined;
    this.running.set(false);
  }
}
