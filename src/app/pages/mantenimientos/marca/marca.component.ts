import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcaForm!: FormGroup;
  constructor( 
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario();}
    get NOMBRE() {
      return (
        this.marcaForm?.get('NOMBRE')!.invalid &&
        this.marcaForm?.get('NOMBRE')!.touched
      );
    }
  
    get CATEGORIA() {
      return (
        this.marcaForm?.get('CATEGORIA')!.invalid &&
        this.marcaForm?.get('CATEGORIA')!.touched
      );
    }
  ngOnInit(): void {
  }
  crearFormulario() {
    this.marcaForm = this.fb.group(
      {
       
        NOMBRE: ['', [Validators.required]],
       
      },
      
    );
  }


  crearMarca() {

    if (this.marcaForm.invalid) {
      this.marcaForm.markAllAsTouched();
      return;
    }
    console.log(this.marcaForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading();
    this.manteniemintoService.getCrearMarca(this.marcaForm.value).subscribe(
      (resp:any) => {

        const {msg}=resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer:1500
        });
        this.marcaForm.reset({
         
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

}
