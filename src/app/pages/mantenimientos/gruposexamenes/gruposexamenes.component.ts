import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlobOptions } from 'buffer';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import Swal from 'sweetalert2';
import { Listaperfile } from 'src/app/interfaces/cargarGrupoExam.interface';
@Component({
  selector: 'app-gruposexamenes',

  templateUrl: './gruposexamenes.component.html',
  styleUrl: './gruposexamenes.component.css',
})
export class GruposexamenesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private manteniemintoService: MantenimientosService,
  ) {
    this.crearFormulario();
  }
  grupoform!: FormGroup;
  cargando: boolean = false;
  listapruebas: Listaprueba[] = [];
  listatipogrupo: Tipogrupo[] = [];
  listagrupoexam:Listaperfile[]=[];
  selectedProductIndex: number | null = null;
  page;

  get pruebas() {
    return this.grupoform.get('pruebas') as FormArray;
  }
  get codigo(){

    return this.grupoform?.get('codigo')!.touched && this.grupoform?.get('codigo')!.invalid;
  }
  get nombre(){

    return this.grupoform?.get('nombre')!.touched && this.grupoform?.get('nombre')!.invalid;
  }

  ngOnInit(): void {
    this.getPruebas();
    this.getGrupo();
    //this.getTipoGrupo();
  }

  getGrupo() {
    this.manteniemintoService.getGrupo().subscribe((tipogrupo) => {
      console.log(tipogrupo);
      this.listatipogrupo = tipogrupo;
    });
  }

 
  crearFormulario() {
    this.grupoform = this.fb.group({
      codigo:['', Validators.required],
      nombre: ['', Validators.required],
      tipogrupoId: ['', [Validators.required]],
      pruebas: this.fb.array([]),
    });
  }
  /* 
  crearPruebas(): FormGroup {
    return this.fb.group({
      codigoId: ['', [Validators.required]],
    });
  }

  addPruebas() {

    const add = this.grupoform.get('pruebas') as FormArray;
    this.selectedProductIndex = add.length;
    add.push(this.crearPruebas());
  } */

  getPruebas() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.listapruebas = listapruebas;
    });
  }

  crearGrupo() {


  /*   if (this.grupoform.invalid) {
      return Object.values(this.grupoform.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    } */
    this.manteniemintoService
      .getPerfiles(this.grupoform.value)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
      });
  }

  borrarPruebas() {}
  borrarequipo(termino: any) {}

  pruebaseleccionado(prueba: any) {
    console.log(prueba);
    const pruebasArray = this.grupoform.get('pruebas') as FormArray;
    console.log(pruebasArray.value);
    const pruebasExist = pruebasArray.value.find(
      (control) => control.codigoId === prueba.CODIGO,
    );
    console.log(pruebasExist);

    if (!pruebasExist) {
      this.pruebas.push(
        this.fb.group({
          pruebaId: [prueba.id, [Validators.required]],
          codigo: [prueba.CODIGO, Validators.required],
          nombre: [prueba.NOMBRE, Validators.required],
        }),
      );
    }
  }

  borrarPrueba(i) {
    this.pruebas.removeAt(i);
  }
  onSubmit() {}
}
