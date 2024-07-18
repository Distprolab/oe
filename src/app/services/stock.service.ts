import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Inventario, Stock } from '../interfaces/stock.interface';
import {
  pedidoStock,
  stocksPedido,
} from '../interfaces/pedidos-stocks.interface';
import { StockPedidoDespacho } from '../models/stockForm.module';
import { StockForm } from '../interfaces/stockMasivoExcel.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      // headers: { 'x-token': this.token },
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getStock(): Observable<Stock[]> {
    return this.http
      .get<Inventario>(`${baseUrl}/api/stock`, this.headers)

      .pipe(map(({ stock }) => stock));
  }

  getAllPedidoStock(): Observable<pedidoStock[]> {
    return this.http
      .get<stocksPedido>(`${baseUrl}/api/pedidos-stock`, this.headers)
      .pipe(map(({ pedidoStock }) => pedidoStock));
  }

  getDeletePedidoStock(pedido:pedidoStock) {
    return this.http
      .delete(`${baseUrl}/api/pedidos/${pedido.id}`, this.headers)
     
  }
  getByfiltroStock(termino: string) {
    return this.http
      .get(`${baseUrl}/api/stock/buscar/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }
  getDespacharStock(data: StockPedidoDespacho) {
    return this.http.put(
      `${baseUrl}/api/pedidos-stock/${data.id}`,
      data,
      this.headers,
    );
  }
  
  getCreateStock(formData:StockForm) {

    return this.http.post(`${baseUrl}/api/stock`,formData,this.headers)
  }
  /*  getCreateStock() {} */
}
