import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  title = 'formulario-Compras';
  private tempFile: any;
  licencia = [
    {
      ItemName: 'Parametros reportables modo fluido corporal',
      value: 'Parametros reportables modo fluido corporal',
    },
    {
      ItemName: 'Parametros reportables canal reticulocitos',
      value: 'Parametros reportables canal reticulocitos',
    },
    {
      ItemName: 'Parametros investigacion canal reticulocitos',
      value: 'Parametros investigacion canal reticulocitos',
    },
  ];
  equipos = [
    { ItemName: 'QUIMICA', value: 'QUIMICA' },
    { ItemName: 'INMUNOLOGIA', value: 'INMUNOLOGIA' },
    { ItemName: 'HEMATOLOGIA', value: 'HEMATOLOGIA' },
    { ItemName: 'COAGULACION', value: 'COAGULACION' },
    { ItemName: 'GASOMETRIA', value: 'GASOMETRIA' },
    { ItemName: 'INSUMOS', value: 'INSUMOS' },
    { ItemName: 'ELECTROLITOS', value: 'ELECTROLITOS' },
    { ItemName: 'MICROBIOLOGIA', value: 'MICROBIOLOGIA' },
    { ItemName: 'UROANALISIS', value: 'UROANALISIS' },
    { ItemName: 'PRUEBAS RAPIDAS', value: 'PRUEBAS RAPIDAS' },
  ];

  get institucion() {
    return (
      this.RegistroForm?.get('institucion')!.invalid &&
      this.RegistroForm?.get('institucion')!.touched
    );
  }

  get codigo() {
    return (
      this.RegistroForm?.get('codigo')!.invalid &&
      this.RegistroForm?.get('codigo')!.touched
    );
  }

  get linkproceso() {
    return (
      this.RegistroForm?.get('linkproceso')!.invalid &&
      this.RegistroForm?.get('linkproceso')!.touched
    );
  }

  get tiempoconsumo() {
    return (
      this.RegistroForm?.get('tiempoconsumo')!.invalid &&
      this.RegistroForm?.get('tiempoconsumo')!.touched
    );
  }

  get determinacion() {
    return (
      this.RegistroForm?.get('determinacion')!.invalid &&
      this.RegistroForm?.get('determinacion')!.touched
    );
  }

  get presupuesto() {
    return (
      this.RegistroForm?.get('presupuesto')!.invalid &&
      this.RegistroForm?.get('presupuesto')!.touched
    );
  }

  get entregacarpeta() {
    return (
      this.RegistroForm?.get('entregacarpeta')!.invalid &&
      this.RegistroForm?.get('entregacarpeta')!.touched
    );
  }
  get terceraopcion() {
    return (
      this.RegistroForm?.get('terceraopcion')!.invalid &&
      this.RegistroForm?.get('terceraopcion')!.touched
    );
  }

  get sistema() {
    return (
      this.RegistroForm?.get('sistema')!.invalid &&
      this.RegistroForm?.get('sistema')!.touched
    );
  }
  get observacion() {
    return (
      this.RegistroForm?.get('observacion')!.invalid &&
      this.RegistroForm?.get('observacion')!.touched
    );
  }
  get areas() {
    return this.RegistroForm.get('areas') as FormArray;
  }
  get licenciaEquiposHematologicos() {
    return this.RegistroForm.get('licenciaEquiposHematologicos') as FormArray;
  }
  get adjunto() {
    return this.RegistroForm.get('adjunto') as FormArray;
  }
  get licenciaEquiposHematologico() {
    return (
      this.RegistroForm?.get('licenciaEquiposHematologicos')!.invalid &&
      this.RegistroForm?.get('licenciaEquiposHematologicos')!.touched
    );
  }
  get quimica() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.touched
    );
  }
  get inmunologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.touched
    );
  }
  get hematologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.touched
    );
  }
  get coagulacion() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.touched
    );
  }
  get gasometria() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.touched
    );
  }

  get electrolitros() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.touched
    );
  }
  get uroanalisis() {
    return (
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.touched
    );
  }
  get microbiologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.touched
    );
  }

  get poc() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.touched
    );
  }

  get bkquimica() {
    return (
      this.RegistroForm?.get('equipobackup.bkquimica')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.touched
    );
  }
  get bkinmunologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkinmunologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.touched
    );
  }
  get bkhematologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkhematologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.touched
    );
  }
  get bkcoagulacion() {
    return (
      this.RegistroForm?.get('equipobackup.bkcoagulacion')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.touched
    );
  }
  get bkgasometria() {
    return (
      this.RegistroForm?.get('equipobackup.bkgasometria')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.touched
    );
  }

  get bkelectrolitros() {
    return (
      this.RegistroForm?.get('equipobackup.bkelectrolitros')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.touched
    );
  }
  get bkuroanalisis() {
    return (
      this.RegistroForm?.get('equipobackup.bkuroanalisis')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.touched
    );
  }
  get bkmicrobiologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkmicrobiologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.touched
    );
  }

  get bkpoc() {
    return (
      this.RegistroForm?.get('equipobackup.bkpoc')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.touched
    );
  }

  ngOnInit(): void {
    const equipoprincipalGroup = this.RegistroForm.get(
      'equipoprincipal',
    ) as FormGroup;
    const equipobackupGroup = this.RegistroForm.get(
      'equipobackup',
    ) as FormGroup;

    Object.keys(equipoprincipalGroup.controls).forEach((controlName) => {
      equipoprincipalGroup.get(controlName)?.valueChanges.subscribe((value) => {
        console.log(`equipo principal`, value);
        this.toggleValorControl(value, equipoprincipalGroup, controlName);
      });
    });

    Object.keys(equipobackupGroup.controls).forEach((controlName) => {
      equipobackupGroup.get(controlName)?.valueChanges.subscribe((value) => {
        console.log(`equipo bk`, value);
        this.toggleValorControl(value, equipobackupGroup, controlName);
      });
    });
  }

  toggleValorControl(value: any, group: FormGroup, controlName: string) {
    const valorCampo = group.get(controlName)?.value;

    if (valorCampo === 'NO APLICA') {
      group.get(`val${controlName.slice(2)}`)?.disable();
      group.get(`valbk${controlName.slice(2)}`)?.disable();
    } else {
      group.get(`val${controlName.slice(2)}`)?.enable();
    }
  }

  RegistroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroServices: RegistroService,
    private router: Router,
  ) {
    this.crearformulario();
  }

  crearformulario() {
    this.RegistroForm = this.fb.group(
      {
        institucion: ['', [Validators.required]],
        codigo: ['', [Validators.required]],
        linkproceso: ['', [Validators.required]],
        tiempoconsumo: ['', [Validators.required]],
        determinacion: ['', [Validators.required]],
        presupuesto: ['', [Validators.required]],
        entregacarpeta: ['', [Validators.required]],
        areas: this.fb.array([]),

        terceraopcion: ['', [Validators.required]],
        sistema: ['', [Validators.required]],
        equipoprincipal: this.fb.group({
          eqquimica: ['', [Validators.required]],
          valquimica: ['', [Validators.required]],
          eqinmunologia: ['', [Validators.required]],
          valinmunologia: ['', [Validators.required]],
          eqhematologia: ['', [Validators.required]],
          valhematologia: ['', [Validators.required]],
          eqcoagulacion: ['', [Validators.required]],
          valcoagulacion: ['', [Validators.required]],
          eqgasometria: ['', [Validators.required]],
          valgasometria: ['', [Validators.required]],
          eqelectrolitros: ['', [Validators.required]],
          valelectrolitros: ['', [Validators.required]],
          equroanalisis: ['', [Validators.required]],
          valuroanalisis: ['', [Validators.required]],
          eqmicrobiologia: ['', [Validators.required]],
          valmicrobiologia: ['', [Validators.required]],
          eqpoc: ['', [Validators.required]],
          valpoc: ['', [Validators.required]],
        }),
        equipobackup: this.fb.group({
          bkquimica: ['', [Validators.required]],
          valbkquimica: ['', [Validators.required]],
          bkinmunologia: ['', [Validators.required]],
          valbkinmunologia: ['', [Validators.required]],
          bkhematologia: ['', [Validators.required]],
          valbkhematologia: ['', [Validators.required]],
          bkcoagulacion: ['', [Validators.required]],
          valbkcoagulacion: ['', [Validators.required]],
          bkgasometria: ['', [Validators.required]],
          valbkgasometria: ['', [Validators.required]],
          bkelectrolitros: ['', [Validators.required]],
          valbkelectrolitros: ['', [Validators.required]],
          bkuroanalisis: ['', [Validators.required]],
          valbkuroanalisis: ['', [Validators.required]],
          bkmicrobiologia: ['', [Validators.required]],
          valbkmicrobiologia: ['', [Validators.required]],
        }),
        observacion: ['', [Validators.required]],
        correo: [''],
        adjunto: this.fb.array([]),

        licenciaEquiposHematologicos: this.fb.array([]),
      },
      { validators: this.validatePruebas },
    );
  }
  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('areas') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true };
    }
    return null;
  }

  guardarRegistro() {
    if (this.RegistroForm.invalid) {
      this.RegistroForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      input: 'textarea',
      inputLabel: 'Adjunte los correos',
      inputPlaceholder: 'Ingrese los correos necesarios...',
      inputAttributes: {
        'aria-label': 'Escriba su mensaje aquí',
      },
      showCancelButton: true,
      inputValidator: (input) => {
        if (!input) {
          return '¡Debe escribir algo!';
        } else {
          return null;
        }
      },
      preConfirm: (input) => {
        if (this.RegistroForm && this.RegistroForm.get('correo')) {
          if (input) {
            this.RegistroForm.value.correo = input;
            this.registroServices
              .getRegistro(this.RegistroForm.value)
              .subscribe((res: any) => {
                const { msg } = res;
                Swal.fire({
                  icon: 'success',
                  title: `${msg}`,
                  showConfirmButton: false,
                  /*  timer: 1500, */
                });
                this.RegistroForm.reset();
                this.areas.clear();
                this.licenciaEquiposHematologicos.clear();
                this.router.navigateByUrl('dashboard/consulta-compras');
              });
          }
        }
      },
    });
  }

  onAreasChange(e: any) {
    const area = this.RegistroForm.get('areas') as FormArray;

    const areas = e.target.value;
    const checkboxArea = e.target;

    if (checkboxArea.checked) {
      area.push(
        this.fb.group({
          areas,
        }),
      );
    } else {
      area.controls.findIndex((z) =>
        console.log(`control checkbox`, z.value.areas),
      );
      const indexArea = area.controls.findIndex((z) => z.value.areas === areas);
      console.log(`area eliminada`, indexArea);
      area.removeAt(indexArea);
    }
  }
  onCheckboxChange(e: any) {
    const pruebasArray = this.RegistroForm.get(
      'licenciaEquiposHematologicos',
    ) as FormArray;

    const valorinput = e.target.value;
    const checkbox = e.target;

    if (checkbox.checked) {
      pruebasArray.push(
        this.fb.group({
          valorinput,
        }),
      );
    } else {
      pruebasArray.controls.findIndex((y) => console.log(y.value.valorinput));
      const index = pruebasArray.controls.findIndex(
        (x) => x.value.valorinput === valorinput,
      );

      pruebasArray.removeAt(index);
    }
  }
  onreset() {
    this.RegistroForm.reset();
    this.areas.clear();
    this.licenciaEquiposHematologicos.clear();
    //this.rout
  }

  upload(event: any) {
    const [file] = event.target.files;
    const adjuntos = this.RegistroForm.get('adjunto') as FormArray;

    // Iterar sobre los archivos seleccionados y agregarlos al FormArray
    const fi = file;
    console.log(`fi`, fi);
   
    console.log(`fi2`, fi);
    adjuntos.push(this.fb.group({
      fi
    }));
  }
}
