import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenID } from 'src/app/interfaces/carga-IngresordenId.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';

@Component({
  selector: 'app-validacionresultados',

  templateUrl: './validacionresultados.component.html',
  styleUrl: './validacionresultados.component.css',
})
export class ValidacionresultadosComponent implements OnInit {
  listaordenesid:OrdenID;
  showAge;
  constructor(
    private manteniminetoService: MantenimientosService,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => this.orden(id));
  }
  orden(id:string) {
    console.log(id);
    if (id === 'Nuevo') {
      return;
    }

    this.manteniminetoService.getIngresoOrdenId(id)
    .subscribe((ordenId)=>{
      console.log(ordenId)
      this.listaordenesid=ordenId
    })
  }
  CalculateAge() {
    if (this.listaordenesid.paciente.fechanac) {
      console.log(this.listaordenesid.paciente.fechanac);
      const convertAge = new Date(this.listaordenesid.paciente.fechanac);

      const timeDiff = Math.abs(Date.now() - convertAge.getTime());

      return (this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365));
    } else {
      return null;
    }
  }

  Validarrangos(){
  /*  if( this.listaordenesid.paciente.fechanac){{}
   */
}
}
