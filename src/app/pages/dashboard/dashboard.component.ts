import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MuestrasService } from 'src/app/services/muestras.service';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public totalAceptas: number = 0;
  public totalIngresadaTubo: number = 0;
  public totalIngresadaRecahzoTubo: number = 0;
  TotalEmergencia: number = 0;
  public totalIngresada: number = 0;
  constructor(
    private ordenServicie: OrdenesService,
    private muestraService: MuestrasService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    /*   this.ordenServicie.cargarOrdenes()
    .subscribe(({ TotalAcepta,TotalEmergencia,TotalIngresada }) => {

      console.log('DETALES ESTAEDO', TotalEmergencia)
      this.totalAceptas = TotalAcepta;
      this.totalIngresada=TotalIngresada;
  this.TotalEmergencia=TotalEmergencia;


    })

    this.muestraService.getMuestras()
    .subscribe(({ totalDia,rechazo }) => {


      this.totalIngresadaTubo = totalDia;
      this.totalIngresadaRecahzoTubo=rechazo;
  


    }) */
  }
}
