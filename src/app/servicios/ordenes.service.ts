import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpBaseService } from '../interfaz/http-servicio-base';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService extends HttpBaseService {

  constructor(protected http: HttpClient) {
    super(http, environment.urlOrdenes);
  }
}
