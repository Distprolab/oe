import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-pruebas',
  templateUrl: './panel-pruebas.component.html',
  styleUrls: ['./panel-pruebas.component.css'],
})
export class PanelPruebasComponent implements OnInit {
  panelform!: UntypedFormGroup;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get CODIGO() {
    return (
      this.panelform?.get('CODIGO')!.invalid &&
      this.panelform?.get('CODIGO')!.touched
    );
  }
  get NOMBRE() {
    return (
      this.panelform?.get('NOMBRE')!.invalid &&
      this.panelform?.get('NOMBRE')!.touched
    );
  }
  get CATEGORIA() {
    return (
      this.panelform?.get('CATEGORIA')!.invalid &&
      this.panelform?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {}

  crearFormulario() {
    this.panelform = this.fb.group(
      {
        CODIGO: ['', [Validators.required]],
        NOMBRE: ['', [Validators.required]],
        CATEGORIA: ['', [Validators.required]],
      },
      
    );
  }


  crearPanel() {

    if (this.panelform.invalid) {
      this.panelform.markAllAsTouched();
      return;
    }
    console.log(this.panelform.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getyCrearpanelPruebas(this.panelform.value).subscribe(
      (resp:any) => {

        const {msg}=resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer:1500
        });
        this.panelform.reset({
          CODIGO: '',
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
