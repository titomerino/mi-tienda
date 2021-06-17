import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CrearClienteComponent } from './componentes/crear-cliente/crear-cliente.component';
import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { ListaClientesComponent } from './componentes/lista-clientes/lista-clientes.component';
import { ListaOrdenesComponent } from './componentes/lista-ordenes/lista-ordenes.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProductosComponent
  },
  {
    path: 'productos',
    component: ListaProductosComponent
  },
  {
    path: 'productos/agregar',
    component: CrearProductoComponent
  },
  {
    path: 'productos/mostrar/:id',
    component: CrearProductoComponent
  },
  {
    path: 'clientes',
    component: ListaClientesComponent
  },
  {
    path: 'clientes/agregar',
    component: CrearClienteComponent
  },
  {
    path: 'clientes/mostrar/:id',
    component: CrearClienteComponent
  },
  {
    path: 'ordenes',
    component: ListaOrdenesComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
