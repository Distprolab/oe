import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Import } from '../models/import.module';
import { Observable, map } from 'rxjs';
import {
  Producto,
  Productos,
} from '../interfaces/carga-productosImport.interfaces';
import { ImportProductos, Pedido } from '../interfaces/cargarImport.interface';
import { Filtro, filtrosImport } from '../interfaces/cargaFiltroItem.interface';

const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class ImportacionService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  constructor(private http: HttpClient) {}

  getImportacion(formData: Import) {
    return this.http.post(`${baseUrl}/api/pedido-importacion`, formData);
  }

  getAllImportacion():Observable<Pedido[]> {
    return this.http
      .get<ImportProductos>(`${baseUrl}/api/pedido-importacion`, this.headers)
      .pipe(map(({pedido})=>pedido))


     ;
  }

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<Productos>(`${baseUrl}/api/productos`, this.headers)
      .pipe(map(({ productos }) => productos));
  }

  getCargaExcelproductos(formData: FormData) {
    return this.http.post(`${baseUrl}/api/productos`, formData, this.headers);
  }
  getDeleteProducto(producto: Producto) {
    return this.http.delete(
      `${baseUrl}/api/productos/${producto.id}`,
      this.headers,
    );
  }
  getRegistroImport(formData: Import) {
    return this.http.post(
      `${baseUrl}/api/pedido-importacion`,
      formData,
      this.headers,
    );
  }

 /*  getByImport(termino: string): Observable<Pedido[]> {
    return this.http
      .get<Importados>(
        `${baseUrl}/api/pedido-importacion/${termino}`,
        this.headers,
      )
      .pipe(map(({ pedido }) => pedido));
  } */
  obtenerImportById(id:string){

  }
  getDeleteImport(pedido: Pedido) {
    return this.http.delete(
      `${baseUrl}/api/pedido-importacion/${pedido.id}`,
      this.headers,
    );
  }


  getFiltroImport(FECHADESDE:string, FECHAHASTA:string):Observable<Filtro[]>{
    return this.http.get<filtrosImport>(`${baseUrl}/api/pedido-importacion/filtros?FECHADESDE=${FECHADESDE}&FECHAHASTA=${FECHAHASTA}`,this.headers)
    .pipe(map( ({filtro})=>filtro))
  }
}
