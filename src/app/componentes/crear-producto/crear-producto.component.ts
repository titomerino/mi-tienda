import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaz/producto';
import { EstadoService } from 'src/app/servicios/estado.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  formProducto: FormGroup
  dataProducto: Producto
  modoEditar: boolean
  idProducto: number
  titulo: string

  constructor(
    private http: ProductosService,
    private router: ActivatedRoute,
    private navigation: Router,
    private notificacion: NotificacionesService,
    private estado: EstadoService
  ) {
    this.modoEditar = false
    this.titulo = 'Crear producto'
  }

  ngOnInit(): void {
    this.formProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required])
    })

    this.router.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.idProducto = Number(params.get('id'))
        this.modoEditar = true
        this.titulo = 'Actualizar producto'
        this.infoProducto()
      }
    })
  }

  agregar() {
    if (this.formProducto.invalid) return

    this.dataProducto = {
      id: 0,
      nombre: this.formProducto.get('nombre').value,
      descripcion: this.formProducto.get('descripcion').value,
      precio: this.formProducto.get('precio').value
    }

    if (this.idProducto) {
      this.dataProducto.id = this.idProducto
      this.actualizar()
    } else {
      this.http.getMethod('').subscribe(data => {
        this.dataProducto.id = data.length + 1
        console.log(this.dataProducto)
        this.guardar()
      }, error => {
        console.log(error)
      })
    }
  }

  guardar() {
    this.estado.activate('Guardando producto...')

    this.http.postMethod('', this.dataProducto).subscribe(data => {
      this.estado.inactivate()
      this.notificacion.show(
        data.nombre + ' Creado',
        { classname: 'bg-success text-light'}
      );
      this.navigation.navigateByUrl("productos")
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al guardar producto',
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

  actualizar() {
    this.estado.activate('Actualizando producto...')

    this.http.updateMethod('/'+this.idProducto, this.dataProducto).subscribe(data => {
      if (data && data !={}) {
        this.estado.inactivate()
        this.notificacion.show(
          data.nombre + ' Actualizado.',
          { classname: 'bg-success text-light'}
        );
      }
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

  infoProducto() {
    this.estado.activate('Cargando producto...')

    this.http.getMethod('/'+this.idProducto).subscribe(data => {
      if (data && data != {}) {
        this.formProducto.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio
        })
      }
      this.estado.inactivate()
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al cargar información del producto',
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
