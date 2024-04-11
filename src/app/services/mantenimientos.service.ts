import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { panelPrueba } from '../models/panelPruebas.module';
import { Cliente } from '../models/cliente.module';
import { Equipo } from '../models/equipo.module';
import { Impresora } from '../models/impresora.module';
import { Marca } from '../models/marca.module';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getCrearImpresora(formData:Impresora){
      return this.http.post(`${baseUrl}/api/impresora`, formData,this.headers)
  }

  getCrearMarca(formData:Marca){
    return this.http.post(`${baseUrl}/api/marca`,formData, this.headers)
  }

  getCrearCliente(formData:Cliente){
    return this.http.post(`${baseUrl}/api/cliente`,formData, this.headers)
  }

  getCrearEquipo(formData:Equipo){
    return this.http.post(`${baseUrl}/api/equipos`,formData, this.headers)
  }
  getyCrearpanelPruebas(formData:panelPrueba){
    return this.http.post(`${baseUrl}/api/panelPruebas`,formData, this.headers)
  }
}
