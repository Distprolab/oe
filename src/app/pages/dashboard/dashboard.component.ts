import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proceso, TotalProcesosPorAprobarBI } from 'src/app/interfaces/cargaProceso.interface';
import { MuestrasService } from 'src/app/services/muestras.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public totalAceptas: number = 0;
  public totalIngresadaTubo: number = 0;
  listaporAporbar:TotalProcesosPorAprobarBI[]=[];
  public totalIngresadaRecahzoTubo: number = 0;
  TotalEmergencia: number = 0;
  public totalIngresada: number = 0;
  constructor(
    private ordenServicie: OrdenesService,
    private muestraService: MuestrasService,
    private registro: RegistroService,
    
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registro.getConsultaRegistro().subscribe(({ totalProcesos,totalProcesosPorAprobarBI}) => {
     this.listaporAporbar=totalProcesosPorAprobarBI;

     console.log(this.listaporAporbar['estado_aprobar_bi'])
      this.totalIngresada = totalProcesos;
    });
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
