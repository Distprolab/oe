import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { Subscriber, Subscription } from 'rxjs';
import { Product } from 'src/app/models/cargaPedido.module';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
  cargando = false;
  jsonData: any[];
  page;
  stockForm!: FormGroup;
  selectedFile: [] = [];
  inputsBloqueados: boolean = false;
  subscription?: Subscription;
  barcodeValue;
  //swipper
  // timer
  // geoloqueitor

  get productos() {
    return this.stockForm.get('productos') as FormArray;
  }
  get guia() {
    return (
      this.stockForm?.get('guia')!.invalid &&
      this.stockForm?.get('guia')!.touched
    );
  }
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started) {
    console.log(started);
  }
  crearFormulario() {
    this.stockForm = this.fb.group({
      guia: ['', [Validators.required]],
      productos: this.fb.array([]),
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (even: any) => {
      const data = new Uint8Array(even.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      //  this.productos.push({guia:this.jsonData['Documento origen']})
      console.log(this.jsonData);
      if (this.jsonData && this.jsonData.length > 0) {
        this.jsonData.forEach((item) => {
          if (item['Operaciones/Lote/Fecha caducidad']) {
            const fechaExcel = item['Operaciones/Lote/Fecha caducidad'];
            const fecha = this.convertirAFecha(fechaExcel);
            item['Operaciones/Lote/Fecha caducidad'] = fecha;
          }
        });
      }
      console.log(this.jsonData);
      this.productos.clear();
      this.stockForm.get('guia').setValue(this.jsonData[0]['Documento origen']);
      this.jsonData.forEach((item) => {
        this.productos.push(
          this.fb.group({
            referencia: item['Operaciones/Producto/Referencia Interna'],
            descripcion: item['Operaciones/Producto/Nombre'],
            lote: item['Operaciones/Lote/Lote/Nº de serie'],
            caducidad: item['Operaciones/Lote/Fecha caducidad'],
            cantidad: item['Operaciones/Cantidad Pedida'], //cantidad_recibida
            cantidad_recibida: item['Operaciones/Cantidad Pedida'], //cantidad_recibida: item['Operaciones/Cantidad Pedida'],//cantidad_recibida
            fabricante: item['Operaciones/Producto/Fabricante'],
            sanitario: item['Operaciones/Producto/Registro Sanitario'],
            comentario: '',
          }),
        );
      });
    };
    reader.readAsArrayBuffer(file);
  }
  guardar() {
    // this.productos.disable();
    console.log(this.stockForm.value);
    /*  if (this.stockForm.invalid) {
       return Object.values(this.stockForm.controls).forEach((control) => {
         control.markAsTouched();
       });
     } */
    this.stockService
      .getCreateStock(this.stockForm.value)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          title: `${msg}`,
          showConfirmButton: false,
        });
        this.router.navigateByUrl('/dashboard/stocks');
      },
    (err)=>{
      Swal.fire({
        icon:'error',
        title: 'Error ',
        text:err.error.msg
      });
    });
  }
  convertirAFecha(fechaExcel: number) {
    const d1 = new Date((fechaExcel - 25567 - 2) * 86400 * 1000);
    console.log(d1);
    const fechacorta = JSON.stringify(d1);

    console.log(fechacorta.slice(0, 11));
    return fechacorta.slice(1, 11);
  }
  onSubmit() {
    // this.productos.disable();
  }

  toggleInputs() {
    console.log(this.inputsBloqueados);
    /* this.subscription = this.productos.valueChanges.subscribe((productos) =>
      productos === this.inputsBloqueados ? this.productos.disable() : this.productos.enable(),
    ); */
  }
  borrarStock(i: number) {
    this.productos.removeAt(i);
  }
  async comments(index: number) {
    const currentComment =
      this.productos.at(index).get('comentario')?.value || '';
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comentario',
      inputPlaceholder: 'Comentario...',
      inputValue: currentComment,
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });
    if (text) {
      //  Swal.fire(text);
      console.log(`text`, text);
      this.productos.at(index).get('comentario')?.setValue(text);
      //   producto.COMENTARIO=text;
    }
    /*   const data={
      ...producto
    }
    console.log(`******agregar impre***`, data); */
  }
}
