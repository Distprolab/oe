import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Orden } from 'src/app/models/orden.module';
import { OrdenesService } from 'src/app/services/ordenes.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
})
export class OrdenesComponent implements OnInit {
  constructor(
    private ordenServicie: OrdenesService,
    public agendamientoService: AgendamientoService,
    private router: Router,
  ) {}
  public totalAceptas: number = 0;
  ordenBorrarActivo = 1;
  public totalIngresada: number = 0;
  TotalEmergencia: number = 0;
  public ordenes: Orden[] = [];
  public ordenesTemp: Orden[] = [];
  public desde: number = 0;
  public page!: number;

  public cargando: boolean = true;
  ngOnInit(): void {
    this.cargarOrdenes();
    this.escucharSocket();
  }
  cargarOrdenes() {
    this.cargando = true;
    /*  this.ordenServicie.cargarOrdenes(this.desde) */
    this.ordenServicie
      .cargarOrdenes()
      .subscribe(({ TotalAcepta, TotalEmergencia, ordenes }) => {
        console.log('DETALES ESTAEDO', TotalAcepta);
        this.totalAceptas = TotalAcepta;
        this.totalIngresada = this.totalIngresada;
        this.TotalEmergencia = TotalEmergencia;
        this.ordenes = ordenes;
        this.ordenesTemp = ordenes;
        this.cargando = false;
      });
  }

  /* buscar(termino: string) {
    return (termino.length === 0) ? this.ordenes = this.ordenesTemp : this.ordenServicie.buscarFiltroOrdenes(termino)
      .subscribe(resultados => {
        this.ordenes = resultados; 
      });
  
    } */
  buscar(
    IDENTIFICADOR: string,
    ESTADO: string,
    HIS: string,
    SALA: string,
    PRIORIDAD: string,
    APELLIDO: string,
  ) {
    this.cargando = true;
    console.log({ IDENTIFICADOR, ESTADO, HIS, SALA, PRIORIDAD, APELLIDO });
    /* return (termino.length === 0) ? this.ordenes = this.ordenesTemp : this.ordenServicie.buscarFiltroOrdenes(termino)
      .subscribe(resultados => {string
        this.ordenes = resultados; 
      }); */
    this.ordenServicie
      .buscarFiltroOrdenes(
        IDENTIFICADOR,
        ESTADO,
        HIS,
        SALA,
        PRIORIDAD,
        APELLIDO,
      )
      .subscribe((resultados) => {
        this.ordenes = resultados;
        this.cargando = false;
      });
  }
  /*   cambinarPaginaOrden(valor: number) {
      this.desde += valor;
      console.log('primer desde', this.desde)
      if (this.desde < 0) {
        this.desde = 0
        console.log('segundo desde', this.desde)
      } else if (this.desde === this.totalOrdenes) {
        console.log('tercero desde', this.totalOrdenes)
        this.desde -= valor;
        console.log('cuarto desde', this.desde)
      }
      this.cargarOrdenes();
    } */

  eliminarOrden(orden: Orden) {
    if (orden.ESTADO != '1') {
      return; // No hacer nada si el estado es '1'
    }
    console.log(orden.id);

    /*    if (orden.ESTADO === '1') {
         Swal.fire({
           title: 'No puedes actualizar esta orden',
         })
       } */

    Swal.fire({
      title: 'Eliminar Orden?',
      text: `Esta seguro que desea eliminar la orden ${orden.HIS}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      console.log('NUMERO OBTENIDO', result.value);
      if (result.value) {
        this.ordenServicie.eliminarOrden(orden).subscribe(
          (resp) => {
            this.cargarOrdenes();
            Swal.fire(
              'Orden Eliminada',
              `${orden.HIS} fue desactivado correctamente`,
              'success',
            );
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.msg,
            });
            console.log('MSG ERROR', err.error.msg);
          },
        );
      }
    });
  }

  pdf2(orden: Orden) {
    this.ordenServicie.getPdf(orden).subscribe((blob: Blob) => {
      //console.log(resp)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
  imprimirOrden(orden) {
    console.log(`//////************`, orden.id);
    const storedOption = localStorage.getItem('selectedOption');
    Swal.fire({
      title: 'Seleccione una impresora',
      input: 'select',
      inputOptions: {
        Zebra: {
          ZBR1: 'Recepcion 1',
          ZBR2: 'Recepcion 2',
        },
      },
      inputValue: storedOption, // Establecer la opción almacenada como valor predeterminado
      inputPlaceholder: 'Seleccione una impresora',
      showCancelButton: true,

      inputAttributes: {
        style: 'font-size: 16px; margin: 10px auto;width:90%;', // Ajusta estos valores según tus preferencias
      },
      preConfirm: (selectedValue) => {
        localStorage.setItem('selectedOption', selectedValue);
        orden.CODIMPRESORA = selectedValue;
        const data = {
          ...orden,
        };

        console.log(`******agregar impre***`, data);
        this.ordenServicie.EnviarOrden(data).subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Envio a procesar a Infinity ', `${msg}`, 'success');
        });
      },
    });
  }

  escucharSocket() {
    this.agendamientoService
      .listen('orden-sais')
      .subscribe((ordenSais: any) => {
        console.log(ordenSais);
        this.ordenes = ordenSais;

        /*  this.calendarEvents = this.ordencalendar.map((order: any) => ({
          title: order.count, // O cualquier otro campo necesario
          start: order.FECHA,
        })); */

        // Actualizar el calendario con las órdenes recientes
        /*    this.fullCalendarRef.nativeElement.fullCalendar('removeEventSources');
        this.fullCalendarRef.nativeElement.fullCalendar('addEventSource', this.calendarEvents); */
      });
  }
}
