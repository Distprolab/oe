import { Component, OnInit } from '@angular/core';
import { Proceso } from 'src/app/interfaces/cargaProceso.interface';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.css'],
})
export class ConsultaComprasComponent implements OnInit {
  constructor(private registro: RegistroService) {}
  cargando = false;
  public listaproceso: Proceso[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  public proceso: Proceso[] = [];
  public procesoTemp: Proceso[] = [];


  ngOnInit(): void {
    this.cargando = true;
    this.registro.getConsultaRegistro().subscribe(({ proceso }) => {
      console.log(`proceso`, proceso);
      this.listaproceso = proceso;
      this.cargando = false;
    });
  }

  getConsultaRegistro() {}
  pdf2(proceso: Proceso) {
    console.log(proceso);
  }

  buscar(termino:string){
    return termino.length === 0
    ? (this.proceso = this.procesoTemp)
    : this.registro
        .buscarFiltroProceso(termino)
        .subscribe((resultados) => {
          this.proceso = resultados;
        });
  }
}
