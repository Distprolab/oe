import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo, Equipos } from 'src/app/interfaces/carga-equipos.interfaces';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
})
export class EquiposComponent implements OnInit {
  equipoForm!: UntypedFormGroup;
  cargando = false;
  public page!: number;
  listaequipos: Equipo[] = [];
  equipos: Equipo[] = [];
  equipoTemp: Equipo[] = [];
  listamarca: Marca[] = [];
  listaubicacion: Marca[] = [];
  listaestado: Marca[] = [];
  listamodelo: Modelo[] = [];
  showDetails: boolean[] = [];
  showPruebasHeader: boolean = false;

  openCoverages = false;
  indexSelectedCoverage = 1;
  selectedModelo:any;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private llenarcomboServices: LlenarCombosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
/* 
    this.covenants.forEach((_covenants) => {
      _covenants.isExpanded = false;
    }); */
    this.getEquipo();
    this.getMarca();
    this.getModelo();
    this.getEstado();
    this.getUbicacion();
   
  }

  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.showPruebasHeader = this.showDetails.some(detail => detail);

  }
 
  crearFormulario() {
    this.equipoForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      MARCA_ID: ['', [Validators.required]],
      ESTADO_ID: ['', [Validators.required]],
      UBICACION_ID: ['', [Validators.required]],
      SERIE: ['', [Validators.required]],
    });
  }
  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      console.log(marcas);

      this.listamarca = marcas;
    });
  }
  getEstado() {
    this.llenarcomboServices.getEstado().subscribe((estado) => {
      console.log(estado);

      this.listaestado = estado;
    });
  }
  getUbicacion() {
    this.llenarcomboServices.getUbicacion().subscribe((ubicacion) => {
      console.log(ubicacion);

      this.listaubicacion = ubicacion;
    });
  }




  getModelo() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo;
    });
  }

  getEquipo() {
    this.llenarcomboServices.getEquipo().subscribe((equipos) => {
      console.log(equipos);

      this.listaequipos = equipos;
    });
  }
  crearEquipo() {
    if (this.equipoForm.invalid) {
      this.equipoForm.markAllAsTouched();
      return;
    }
    console.log(this.equipoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });

    Swal.showLoading(null);
    this.manteniemintoService.getCrearEquipo(this.equipoForm.value).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        // this.router.navigateByUrl('/dashboard/equipos');
        this.equipoForm.reset(/* {
          NOMBRE: '',
          CATEGORIA: '',
        } */);
        this.router.navigateByUrl('/dashboard/equipos');
      },
      (err) => {
        console.log('error', err.error.msg);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.msg,
        });
      },
    );
  }

  borrarequipo(equipo: Equipo) {
    console.log(equipo);
    Swal.fire({
      title: 'Eliminar equipo?',
      text: `Esta seguro que desea eliminar el equipo  ${equipo.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEquipo(equipo)
          .subscribe((resp: any) => {
            const { msg } = resp;
              this.getEquipo();
            Swal.fire({
              title: 'Equipo eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
 /*  toggleExpand(equipo: Equipo) {
    equipo.expanded = !equipo.expanded;
  } */

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaequipos = this.equipoTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEquipo(termino)
        .subscribe((equipos) => {
          this.listaequipos = equipos;
        });
    }
  }
  getEdad(fecha){
    console.log(fecha)
    if (fecha) {
      console.log(fecha);
      const convertAge = new Date(fecha);

      const timeDiff = Math.abs(Date.now() - convertAge.getTime());

      return ( Math.floor(timeDiff / (1000 * 3600 * 24) / 365));
    } else {
      return null;
    }
  }
}
