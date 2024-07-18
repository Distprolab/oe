import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { groupBy } from 'rxjs';
import { Accesorio } from 'src/app/interfaces/cargaAccCotizacion.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { Equipo } from 'src/app/models/equipo.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';

@Component({
  selector: 'app-cotizacion',

  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css',
})
export class CotizacionComponent implements OnInit {
  cotizacionForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private llenarcomboService: LlenarCombosService,
  ) {
    //this.crearFormulario();
  }
  listamodelo: Modelo[] = [];
   listaAcccotizacion: Accesorio[] = [];
  selectedModelo: any;
  equipos: Equipo[] = [];
  btnVal = 'Guardar';

  ngOnInit(): void {
    this.getModelo();
   // this.getAcCotizacion();
   this.llenarcomboService.getAccCotizacion().subscribe((accesorio) => {
    this.listaAcccotizacion = accesorio;
   const ctrls = this.listaAcccotizacion.map((control) =>
    this.fb.control(false),
  );
  console.log(ctrls);
   this.cotizacionForm = this.fb.group(
    {
      razonsocial: ['', Validators.required],
      ruc: ['', Validators.required],
      correo: ['', Validators.required],
      modalidad: ['', Validators.required],
      estadistica: ['', Validators.required],
      carga:[''],
      acc: this.fb.array(ctrls),
      comentarios: ['', Validators.required],

      EQUIPO_ID: this.fb.array([]),
    },
    { validators: this.validatePruebas },
  );


  });
    console.log(this.listaAcccotizacion)
  }
/*   getAcCotizacion() {
    this.llenarcomboService.getAccCotizacion().subscribe((accesorio) => {
      this.listaAcccotizacion = accesorio;
    });
  } */
  get razonsocial() {
    return (
      this.cotizacionForm?.get('razonsocial')!.invalid &&
      this.cotizacionForm?.get('razonsocial')!.touched
    );
  }
  get ruc() {
    return (
      this.cotizacionForm?.get('ruc')!.invalid &&
      this.cotizacionForm?.get('ruc')!.touched
    );
  }
  get correo() {
    return (
      this.cotizacionForm?.get('correo')!.invalid &&
      this.cotizacionForm?.get('correo')!.touched
    );
  }
  get modalidad() {
    return (
      this.cotizacionForm?.get('modalidad')!.invalid &&
      this.cotizacionForm?.get('modalidad')!.touched
    );
  }
  get estadistica() {
    return (
      this.cotizacionForm?.get('estadistica')!.invalid &&
      this.cotizacionForm?.get('estadistica')!.touched
    );
  }
  get carga() {
    return (
      this.cotizacionForm?.get('carga')!.invalid &&
      this.cotizacionForm?.get('carga')!.touched
    );
  }
  get comentarios() {
    return (
      this.cotizacionForm?.get('comentarios')!.invalid &&
      this.cotizacionForm?.get('comentarios')!.touched
    );
  }

  get acc() {
    return this.cotizacionForm.get('acc') as FormArray;
  }

 /*  get carga() {
    return this.cotizacionForm.get('carga') as FormArray;
  } */
  get EQUIPO_ID() {
    return this.cotizacionForm.get('EQUIPO_ID') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }

  getModelo() {
    this.llenarcomboService.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo;
    });
  }

/*   crearFormulario() {
    console.log(this.listaAcccotizacion);
    const ctrls = this.listaAcccotizacion.map((control) =>
      this.fb.control(false),
    );
    console.log(ctrls);

    this.cotizacionForm = this.fb.group(
      {
        razonsocial: ['', Validators.required],
        ruc: ['', Validators.required],
        correo: ['', Validators.required],
        modalidad: ['', Validators.required],
        estadistica: ['', Validators.required],
        carga: [''],
        acc: this.fb.array(ctrls),
        comentarios: ['', Validators.required],

        EQUIPO_ID: this.fb.array([]),
      },
      { validators: this.validatePruebas },
    );
  } */
  getSelectedRoles() {
    return this.cotizacionForm.value.areas
      .map((checked, i) => (checked ? this.listaAcccotizacion[i].CODIGO : null))
      .filter((CODIGO) => CODIGO !== 'null');
  }

  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('acc') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true };
    }
    return null;
  }

  guardar() {
    if (this.cotizacionForm.invalid) {
      this.cotizacionForm.markAllAsTouched();
      return;
    }
  }
  onSelectModelo(event: any) {
    const selectedId = +event.target.value;
    console.log(selectedId);

    this.selectedModelo = this.listamodelo.find(
      (m) => Number(m.id) === selectedId,
    );

    console.log(this.selectedModelo);
    this.equipos = this.selectedModelo ? this.selectedModelo.instrumento : [];

    console.log(this.equipos);
  }

  onSelectEquipo(event: any) {
    const equipoId = +event.target.value;
    console.log(equipoId);
    const selectedEquipo = this.equipos.find((e) => Number(e.id) === equipoId);
    console.log(selectedEquipo);
    if (selectedEquipo) {
      //const EQUIPO_ID = this.cotizacionForm.get('EQUIPO_ID') as FormArray;
      this.EQUIPO_ID.push(
        this.fb.group({
          Itemequipo: selectedEquipo.id,
          modeloEquipo: this.selectedModelo.NOMBRE,
          nombre: selectedEquipo.NOMBRE,
          CANTIDAD: '',
        }),
      );
    }
  }
  select(value: string): boolean {
    console.log(value);
    return this.cotizacionForm.get('acc')?.value.includes(value);
  }
  onFileSelected(event: any) {
  console.log(event.target.files)


  }

  enviarArchivo() {}

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      console.log(this.btnVal);
      this.guardar();
    }
    this.cotizacionForm.enable();
    this.btnVal = 'Guardar';
  }
}
