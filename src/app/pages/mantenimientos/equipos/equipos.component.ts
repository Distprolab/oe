import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipoForm!: FormGroup;
  constructor( 
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario();}
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
  ngOnInit(): void {
  }
  crearFormulario() {
    this.equipoForm = this.fb.group(
      {
       
        NOMBRE: ['', [Validators.required]],
        CATEGORIA: ['', [Validators.required]],
      },
      
    );
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
    Swal.showLoading();
    this.manteniemintoService.getCrearEquipo(this.equipoForm.value).subscribe(
      (resp:any) => {

        const {msg}=resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer:1500
        });
        this.equipoForm.reset({
         
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
