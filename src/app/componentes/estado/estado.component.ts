import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/servicios/estado.service';

interface Loading {
  activated: boolean;
  mensaje: string;
}

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})

export class EstadoComponent implements OnInit, OnDestroy {

  mensaje = '';
  status = false;
  subscription: any;

  constructor(private estado: EstadoService) {
    this.subscription = this.estado.getLoadingStatus().subscribe(data => {
      this.status = (data as Loading).activated;
      this.mensaje = (data as Loading).mensaje;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.deactivate();
  }

}
