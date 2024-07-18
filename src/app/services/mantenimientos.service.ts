import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { panelPrueba } from '../models/panelPruebas.module';
import { Cliente } from '../models/cliente.module';
import { Equipo } from '../models/equipo.module';
import { Impresora } from '../models/impresora.module';
import { Marca } from '../models/marca.module';
import { Observable, map } from 'rxjs';
import { Prueba, Pruebastock } from '../interfaces/pruebastock.interfaces';
import { Equipos } from '../interfaces/carga-equipos.interfaces';
import { Correo } from '../models/correo.module';


const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class MantenimientosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getCrearImpresora(formData: Impresora) {
    return this.http.post(`${baseUrl}/api/impresora`, formData, this.headers);
  }

  getCrearMarca(formData: Marca) {
    return this.http.post(`${baseUrl}/api/marca`, formData, this.headers);
  }

  getCrearCorreo(formData: Correo) {
    return this.http.post(`${baseUrl}/api/correos`, formData, this.headers);
  }

  getCrearModalidad(formData: Marca) {
    return this.http.post(`${baseUrl}/api/modalidad`, formData, this.headers);
  }
  getCrearContrato(formData: Marca) {
    return this.http.post(`${baseUrl}/api/tipocontrato`, formData, this.headers);
  }

  getCrearEstado(formData: Marca) {
    return this.http.post(`${baseUrl}/api/estado`, formData, this.headers);
  }

  getCrearUbicacion(formData: Marca) {
    return this.http.post(`${baseUrl}/api/ubicacion`, formData, this.headers);
  }


  getCrearCliente(formData: Cliente) {
    return this.http.post(`${baseUrl}/api/cliente`, formData, this.headers);
  }

  getCrearEquipo(formData: Equipo) {
    return this.http.post(`${baseUrl}/api/equipos`, formData, this.headers);
  }

  

  getDeleteEquipo(equipo: Equipo) {
    return this.http.delete(`${baseUrl}/api/equipos/${equipo.id}`, this.headers);
  }


  getyCrearpanelPruebas(formData: panelPrueba) {
    return this.http.post(
      `${baseUrl}/api/panelPruebas`,
      formData,
      this.headers,
    );
  }
  getCrearcategoria(categoria: FormData){
    return this.http
      .post(`${baseUrl}/api/modelo`,categoria, this.headers)
      
  }

  getDeletecategoria(id: string){
    return this.http
      .delete(`${baseUrl}/api/modelo/${id}`, this.headers)
      
  }




  getCargaExcelpruebas(formData: FormData) {
    return this.http.post(
      `${baseUrl}/api/stock-pruebas`,
      formData,
      this.headers,
    );
  }

  getPruebastock(): Observable<Prueba[]> {
    return this.http
      .get<Pruebastock>(`${baseUrl}/api/stock-pruebas`, this.headers)
      .pipe(map(({ pruebas }) => pruebas));
  }
  getDeletePrueba(prueba: Prueba) {
    return this.http.delete(
      `${baseUrl}/api/stock-pruebas/${prueba.id}`,
      this.headers,
    );
  }
}
