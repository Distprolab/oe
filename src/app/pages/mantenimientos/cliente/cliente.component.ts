import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clienteForm!: UntypedFormGroup;
  constructor( 
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario();}
    get NOMBRE() {
      return (
        this.clienteForm?.get('NOMBRE')!.invalid &&
        this.clienteForm?.get('NOMBRE')!.touched
      );
    }
 
  ngOnInit(): void {
  }
  crearFormulario() {
    this.clienteForm = this.fb.group(
      {
       
        NOMBRE: ['', [Validators.required]],
       
      },
      
    );
  }


  crearCliente() {

    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
    console.log(this.clienteForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearCliente(this.clienteForm.value).subscribe(
      (resp:any) => {

        const {msg}=resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer:1500
        });
        this.clienteForm.reset({
         
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
