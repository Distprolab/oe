import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-ubicacion',
 
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {

  ubicacionForm!: FormGroup;
  cargando: false;
  listaubicacion: Marca[] = [];
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario(); }
  get NOMBRE() {
    return (
      this.ubicacionForm?.get('NOMBRE')!.invalid &&
      this.ubicacionForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.ubicacionForm?.get('CATEGORIA')!.invalid &&
      this.ubicacionForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {

    this.getUbicacion();
  }
  getUbicacion() {
    this.llenarcomboService.getUbicacion().subscribe((ubicacion) => {
      console.log(ubicacion);

      this.listaubicacion = ubicacion;
    });
  }

  crearFormulario() {
    this.ubicacionForm = this.fb.group(
      {

        NOMBRE: ['', [Validators.required]],

      },

    );
  }


  crearUbicacion() {

    if (this.ubicacionForm.invalid) {
      this.ubicacionForm.markAllAsTouched();
      return;
    }
    console.log(this.ubicacionForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearUbicacion(this.ubicacionForm.value).subscribe(
      (resp: any) => {

        const { msg } = resp
        this.getUbicacion();
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500
        });
        $('#modal-info').modal('hide');
        this.ubicacionForm.reset({

          NOMBRE: '',
          CATEGORIA: '',

        });
        //this.router.navigateByUrl('/dashboard/usuarios');
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
  borrarMarca() {

  }
}
