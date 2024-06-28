import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/interfaces/stock.interface';
import { cargaStock } from 'src/app/models/cargatotalSotck.module';

import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks',
  //standalone: true,
  // imports: [],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent implements OnInit {
  listaSotck: Stock[] = [];
  public listaStockTemp: Stock[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  public cargando: boolean = true;
  fechaActual: Date = new Date();
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getStock();
    // this.calcularMeses();
  }

  getStock() {
    this.cargando = true;
    this.stockService.getStock().subscribe((stock) => {
      this.listaSotck = stock;
      this.calcularMesesParaTodos();
      this.cargando = false;
    });
  }

  calcularMeses(caducidad: string) {
    console.log(this.fechaActual);
    const fechaconvertida = new Date(caducidad);
    const miliSegundos = fechaconvertida.getTime() - this.fechaActual.getTime();

    const diferenciaMeses = miliSegundos / (1000 * 3600 * 24 * 30);
    return Math.round(diferenciaMeses);
  }

  calcularMesesParaTodos() {
    this.listaSotck.forEach((item) => {
      this.calcularMeses(item.caducidad);
    });
  }
  obtenerFechaActualFormateada() {
    return this.fechaActual.toISOString().split('T')[0];
  }
  obtenerFechaCaducidadFormateada(caducidad: string): string {
    return caducidad.split('T')[0]; // Obtenemos solo la parte de la fecha
  }

  buscarProductos(termino: string) {
    return termino.length === 0
      ? (this.listaSotck = this.listaStockTemp)
      : this.stockService.getByfiltroStock(termino).subscribe((resultados) => {
          this.listaSotck = resultados;
        });
  }
}
