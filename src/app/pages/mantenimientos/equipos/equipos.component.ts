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

  listamarca: Marca[] = [];
  listamodelo: Modelo[] = [];
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private llenarcomboServices: LlenarCombosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get NOMBRE() {
    return (
      this.equipoForm?.get('NOMBRE')!.invalid &&
      this.equipoForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.equipoForm?.get('CATEGORIA')!.invalid &&
      this.equipoForm?.get('CATEGORIA')!.touched
    );
  }

  get MARCA_ID() {
    return (
      this.equipoForm?.get('MARCA_ID')!.invalid &&
      this.equipoForm?.get('MARCA_ID')!.touched
    );
  }

  get SERIE() {
    return (
      this.equipoForm?.get('SERIE')!.invalid &&
      this.equipoForm?.get('SERIE')!.touched
    );
  }
  ngOnInit(): void {
    this.getEquipo();
    this.getMarca();
    this.getModelo();
  }
  crearFormulario() {
    this.equipoForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      MARCA_ID: ['', [Validators.required]],
      SERIE: ['', [Validators.required]],
    });
  }
  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      console.log(marcas);

      this.listamarca = marcas;
    });
  }
  getModelo() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo;
    });
  }

  getEquipo() {
    this.manteniemintoService.getEquipo().subscribe((equipos) => {
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

            Swal.fire({
              title: 'Equipo eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
}
