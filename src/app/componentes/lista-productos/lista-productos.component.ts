import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaz/producto';
import { EstadoService } from 'src/app/servicios/estado.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  PRODUCTOS: Producto[]

  constructor(
    private httpProductos: ProductosService,
    private estado: EstadoService,
    private notificacion: NotificacionesService
  ) {}

  ngOnInit(): void {
    this.estado.activate('Cargando productos...')
    this.httpProductos.getMethod('').subscribe(data => {
      this.PRODUCTOS = data;
      this.estado.inactivate()
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al actualizar producto',
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
