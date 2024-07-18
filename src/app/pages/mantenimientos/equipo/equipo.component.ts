import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
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
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
})
export class EquipoComponent {
  equipoForm!: FormGroup;
  cargando = false;
  public page!: number;
  listaequipos: Equipo[] = [];

  listamarca: Marca[] = [];
  listaubicacion: Marca[] = [];
  listaestado: Marca[] = [];
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
  isSerieDisabled(index: number): boolean {
    // Add your logic to enable or disable the SERIEACC field
    return this.ACC.at(index).get('SERIEACC').disabled;
  }
  get ESTADO_ID() {
    return (
      this.equipoForm?.get('ESTADO_ID')!.invalid &&
      this.equipoForm?.get('ESTADO_ID')!.touched
    );
  }

  get UBICACION_ID() {
    return (
      this.equipoForm?.get('UBICACION_ID')!.invalid &&
      this.equipoForm?.get('UBICACION_ID')!.touched
    );
  }
  get SERIE() {
    return (
      this.equipoForm?.get('SERIE')!.invalid &&
      this.equipoForm?.get('SERIE')!.touched
    );
  }
/*   get SERIEACC(){
    return (
      this.ACC?.contro('SERIEACC')!.invalid &&
      this.ACC?.get('SERIEACC')!.touched
    );
  } */

  get ACC() {
    return this.equipoForm.get('ACC') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }
  ngOnInit(): void {
    this.getEquipo();
    this.getMarca();
    this.getModelo();
    this.getEstado();
    this.getUbicacion();
  }
  crearFormulario() {
    this.equipoForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      MARCA_ID: ['', [Validators.required]],
      ESTADO_ID: ['', [Validators.required]],
      UBICACION_ID: ['', [Validators.required]],
      SERIE: ['', [Validators.required]],
      ACC: this.fb.array([]),
    });
  }

  crearItemACC(): FormGroup {
    return this.fb.group({
      MODELO_ID: ['', [Validators.required]],
      SERIEACC: ['', [Validators.required]],
      CANTIDAD: ['', [Validators.required]],
    });
  }

  addACC() {
    this.ACC.push(this.crearItemACC());
  }

  actualizarInputs(i: number, $event: any) {
    const accId = Number($event.target.value);
    console.log(accId);
    const productoSeleccionado = this.listamarca.find(
      (producto) => producto.id === accId,
    );
    console.log(productoSeleccionado);
    console.log(productoSeleccionado.NOMBRE);
    const filaSeleccionada = (this.equipoForm.get('ACC') as FormArray).at(i);
    // console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        MODELO_ID: productoSeleccionado.NOMBRE,
        SERIEACC: null,
        CANTIDAD: null,
      });
    }
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
  borrarAccesorio(i: number) {
    this.ACC.removeAt(i);
  }
  onreset(){
    this.equipoForm.reset();
    this.ACC.reset();

  }
}
