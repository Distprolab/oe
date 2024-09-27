import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
// { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Listapruebas } from 'src/app/models/cargaIdPruebas.module';

@Component({
  selector: 'app-rangoreferencia',

  templateUrl: './rangoreferencia.component.html',
  styleUrl: './rangoreferencia.component.css',
})
export class RangoreferenciaComponent implements OnInit {
  rangosform!: FormGroup;
  listaseleecionadapruebas: Listapruebas;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private mantenimientoService: MantenimientosService,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearRangos(id));
  }
  crearRangos(id: string) {
    if (id === 'Nuevo') {
      return;
    }

    this.mantenimientoService
      .getIdPanelPruebas(id)
      .subscribe((listapruebas) => {
        console.log(listapruebas);
        
       this.listaseleecionadapruebas=listapruebas;
      });
  }
  crearRango(){}
  cambioEstado() {}

  borrarPruebas() {}
}
