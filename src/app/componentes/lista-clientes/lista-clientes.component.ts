import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import {Cliente} from 'src/app/interfaz/cliente';
import { EstadoService } from 'src/app/servicios/estado.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  CLIENTES: Cliente[]

  constructor(
    private httpClientes: ClientesService,
    private estado: EstadoService,
    private notificacion: NotificacionesService
  ) {
  }

  ngOnInit(): void {
    this.estado.activate('Cargando clientes...')
    this.httpClientes.getMethod('').subscribe(data => {
      this.CLIENTES = data;
      this.estado.inactivate()
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al actualizar cliente',
          { classname: 'bg-danger text-light'}
        );
      } else {
        this.notificacion.show(
          'Error de conexión',
          { classname: 'bg-danger text-light'}
        );
      }
      this.estado.inactivate()
    })
  }
}
