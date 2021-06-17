import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaClientesComponent } from './componentes/lista-clientes/lista-clientes.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';
import { ListaOrdenesComponent } from './componentes/lista-ordenes/lista-ordenes.component';
import { ClientesService } from './servicios/clientes.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { CrearClienteComponent } from './componentes/crear-cliente/crear-cliente.component';
import { NotificacionComponent } from './componentes/notificacion/notificacion.component';
import { EstadoComponent } from './componentes/estado/estado.component';

/** Forms */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/** Input mask */
import {NgxMaskModule, IConfig} from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    ListaProductosComponent,
    ListaOrdenesComponent,
    CrearProductoComponent,
    NotificacionComponent,
    EstadoComponent,
    CrearClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
