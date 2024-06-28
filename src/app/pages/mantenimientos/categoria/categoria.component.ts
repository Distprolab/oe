import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  cargando = false;
  public page!: number;
  listacategoria: Modelo[] = [];
  categoriaForm!: FormGroup;
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }
  get NOMBRE() {
    return (
      this.categoriaForm?.get('NOMBRE')!.invalid &&
      this.categoriaForm?.get('NOMBRE')!.touched
    );
  }
  ngOnInit(): void {
    this.getCategoria();
  }

  crearFormulario() {
    this.categoriaForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
    });
  }

  crearCategoria() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    console.log(this.categoriaForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService
      .getCrearcategoria(this.categoriaForm.value)
      .subscribe(
        (resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.categoriaForm.reset({
            NOMBRE: '',
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
  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listacategoria = modelo;
    });
  }
  borrarCategoria(categoria: Modelo) {
    console.log(categoria);

    Swal.fire({
      title: 'Eliminar categoria?',
      text: `Esta seguro que desea eliminar la categoria  ${categoria.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeletecategoria(categoria.id)
          .subscribe((resp: any) => {
            const { msg } = resp;

            Swal.fire({
              title: 'Categoria eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarCategoria(categoria: Modelo) {
    console.log(categoria);
  }
}
/*   */
