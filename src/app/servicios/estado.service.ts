import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  internal = new Subject();
  currentState = false;

  getLoadingStatus(): Observable<any> {
    return this.internal.asObservable();
  }

  activate(txt: string): void {
    this.internal.next({activated: true, mensaje: txt});
  }

  inactivate(): void {
    this.internal.next({activated: false});
  }
}
