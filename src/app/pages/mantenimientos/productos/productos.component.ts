import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  exceldata: any;
  productoForm!: FormGroup;
  data = [];
  control: FormArray;

  constructor(private fb: FormBuilder) {
    //this.crearformulario();
  }

  ngOnInit() {
    this.productoForm = this.fb.group({
      tableRows: this.fb.array([]),
      /*    company: ['', Validators.required],
      testNestedRows: this.fb.array([])
   */
    });
    if (this.data.length == 0) this.addRow();
    else this.populateTableWithData(this.data);
  }

  addRow() {
    const control = this.productoForm.get('tableRows') as FormArray;
    control.push(this.initiateForm());
    this.addValueChanges(this.getIndexControl());
  }

  getIndexControl(): number {
    //pizzico l'indice del controllo appena creato
    return (this.productoForm.get('tableRows') as FormArray).length - 1;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      referenciaInterna: [''],

      Nombre: ['', [Validators.required, 'Nombre', this.data]],

      cantidadPedida: [''],
      realizado: [''],
      lote: [''],
      caducidad: [''],
      fabricante: [''],
    });
  }

  populateTableWithData(data: any[]) {
    console.log('populateTableWithData - log data', data);

    let control = this.productoForm.controls['tableRows'] as FormArray; // <FormArray>this.userTable.controls.tableRows;
    data.forEach((elem) => {
      control.push(this.fb.group(elem));
      this.addValueChanges(this.getIndexControl());
    });
  }

  addValueChanges(indexOfControl: number) {
    console.log('addValueChanges - log indexOfControl', indexOfControl);

    let arrayControl = this.getFormControls;
  }

  deleteRow(index: number) {
    const control = this.productoForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  get getFormControls() {
    const control = this.productoForm.get('tableRows') as FormArray;
    return control;
  }

  /*   get getNestedFormControls(){
    const control = this.productoForm.get('testNestedRows') as FormArray;
    return control;
  } */

  submitForm() {
    const control = this.productoForm.get('tableRows') as FormArray;
    //this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(control.getRawValue());
    console.log('Full log form: ', this.productoForm.getRawValue());
    this.productoForm.reset(''); //clear form
  }

  readExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const shetNames = workBook.SheetNames;
      this.exceldata = XLSX.utils.sheet_to_json(workBook.Sheets[shetNames[0]]);

      this.data = this.exceldata;
    };
  }
}
