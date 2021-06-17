import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaz/cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  formCliente: FormGroup
  dataCliente: Cliente
  idCliente: number
  titulo: string

  constructor(
    private http: ClientesService,
    private router: ActivatedRoute,
    private navigation: Router,
    private notificacion: NotificacionesService,
    private estado: EstadoService
  ) {
    this.titulo = 'Crear Cliente'
  }

  ngOnInit(): void {
    this.formCliente = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required])
    })

    this.router.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.idCliente = Number(params.get('id'))
        this.titulo = 'Actualizar Cliente'
        this.infoProducto()
      }
    })
  }



  agregar() {
    if (this.formCliente.invalid) {
      this.notificacion.show(
        'Debe llenar todos los campos',
          { classname: 'bg-danger text-light'}
      )
      return
    }

    this.dataCliente = {
      id: 0,
      nombre: this.formCliente.get('nombre').value,
      apellidos: this.formCliente.get('apellidos').value,
      telefono: this.formCliente.get('telefono').value,
      correo: this.formCliente.get('correo').value,
      nit: this.formCliente.get('nit').value
    }

    if (this.idCliente) {
      this.dataCliente.id = this.idCliente
      this.actualizar()
    } else {
      this.http.getMethod('').subscribe(data => {
        this.dataCliente.id = data.length + 1
        this.guardar()
      }, error => {
        console.log(error)
      })
    }
  }

  infoProducto() {
    this.estado.activate('Cargando cliente...')

    this.http.getMethod('/'+this.idCliente).subscribe(data => {
      if (data && data != {}) {
        this.formCliente.setValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          telefono: data.telefono,
          correo: data.correo,
          nit: data.nit
        })
      }
      this.estado.inactivate()
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al cargar información del cliente',
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

  guardar() {
    this.estado.activate('Guardando cliente...')

    this.http.postMethod('', this.dataCliente).subscribe(data => {
      this.estado.inactivate()
      this.notificacion.show(
        data.nombre + ' Creado',
        { classname: 'bg-success text-light'}
      );
      this.navigation.navigateByUrl("clientes")
    }, error => {
      if (error.status) {
        this.notificacion.show(
          'Error al guardar cliente',
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
    this.estado.activate('Actualizando cliente...')

    this.http.updateMethod('/'+this.idCliente, this.dataCliente).subscribe(data => {
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
