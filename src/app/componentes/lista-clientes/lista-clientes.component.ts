import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import {Cliente} from 'src/app/interfaz/cliente';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  CLIENTES: Cliente[]

  constructor(
    private httpClientes: ClientesService
  ) {
  }

  ngOnInit(): void {
    this.httpClientes.getMethod('').subscribe(data => {
      this.CLIENTES = data;
    }, error => {
      console.error(error)
    })
  }
}
