import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-estado',
 
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export class EstadoComponent {

  estadoForm!: FormGroup;
  cargando: false;
  listaestado: Marca[] = [];
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario(); }
  get NOMBRE() {
    return (
      this.estadoForm?.get('NOMBRE')!.invalid &&
      this.estadoForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.estadoForm?.get('CATEGORIA')!.invalid &&
      this.estadoForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {

    this.getEstado();
  }
  getEstado() {
    this.llenarcomboService.getEstado().subscribe((estado) => {
      console.log(estado);

      this.listaestado = estado;
    });
  }

  crearFormulario() {
    this.estadoForm = this.fb.group(
      {

        NOMBRE: ['', [Validators.required]],

      },

    );
  }


  crearMarca() {

    if (this.estadoForm.invalid) {
      this.estadoForm.markAllAsTouched();
      return;
    }
    console.log(this.estadoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearEstado(this.estadoForm.value).subscribe(
      (resp: any) => {

        const { msg } = resp
        this.getEstado();
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500
        });
        $('#modal-info').modal('hide');
        this.estadoForm.reset({

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
