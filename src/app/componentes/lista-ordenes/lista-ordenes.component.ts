import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaz/cliente';
import { Orden } from 'src/app/interfaz/orden';
import { Producto } from 'src/app/interfaz/producto';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { OrdenesService } from 'src/app/servicios/ordenes.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.scss']
})
export class ListaOrdenesComponent implements OnInit {

  ORDENES: Orden[]
  PRODUCTOS: Producto[]
  CLIENTES: Cliente[]

  constructor(
    private httpOrdenes: OrdenesService,
    private httpProductos: ProductosService,
    private httpClientes: ClientesService,
    private estado: EstadoService,
    private notificacion: NotificacionesService
  ) {}

  ngOnInit(): void {
    this.estado.activate('Cargando Ordenes...')
    this.httpOrdenes.getMethod('').subscribe(data => {
      this.ORDENES = data;
      // this.estado.inactivate()
      this.obtenerProductos()
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al actualizar Ordenes',
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

  obtenerProductos() {
    // this.estado.activate('Cargando productos...')
    this.httpProductos.getMethod('').subscribe(data => {
      this.PRODUCTOS = data;
      this.insertarNombreProducto()
      this.obtenerClientes()
      // this.estado.inactivate()
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

  obtenerClientes() {
    // this.estado.activate('Cargando clientes...')
    this.httpClientes.getMethod('').subscribe(data => {
      this.CLIENTES = data;
      this.insertarNombreCliente()
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

  buscarProducto(id: number): any {
    return this.PRODUCTOS.filter(item => item.id == id)
  }

  buscarCliente(id: number): any {
    return this.CLIENTES.filter(item => item.id == id)
  }

  insertarNombreProducto() {
    let producto: any
    for (var item of this.ORDENES) {
      producto = this.buscarProducto(item.idProducto)
      if (producto && producto.length > 0) item.nombreProducto = producto[0].nombre
    }
  }

  insertarNombreCliente() {
    let cliente: any
    for (var item of this.ORDENES) {
      cliente = this.buscarCliente(item.idCliente)
      if (cliente && cliente.length > 0) item.nombreCliente = cliente[0].nombre
    }
  }
}
