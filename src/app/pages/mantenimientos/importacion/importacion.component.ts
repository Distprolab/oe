import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { Cliente } from 'src/app/interfaces/cargaCliente.interface';
import { Marca, Marcas } from 'src/app/interfaces/cargaMarca.interface';
import { Pedido } from 'src/app/interfaces/cargar-pedido.interface';

import { ImportacionService } from 'src/app/services/importacion.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css'],
})
export class ImportacionComponent implements OnInit {
  listaproductos: Producto[] = [];
  listamarca: Marca[] = [];
  listacliente: Cliente[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  importForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();

    this.activatedRoute.params.subscribe(({ id }) => this.crearImport(id));
  }

  get ID_PROVEEDOR() {
    return (
      this.importForm.get('ID_PROVEEDOR')!.invalid &&
      this.importForm?.get('ID_PROVEEDOR')!.touched
    );
  }

  get MARCA() {
    return (
      this.importForm.get('MARCA')!.invalid &&
      this.importForm?.get('MARCA')!.touched
    );
  }
  get PRODUCTOS() {
    return this.importForm.get('PRODUCTOS') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }

  getAllProductos() {
    this.inportService.getProductos().subscribe((productos) => {
      this.listaproductos = productos.slice(0, 5);
    });
  }
  crearFormulario() {
    this.importForm = this.fb.group({
      ID_PROVEEDOR: ['', [Validators.required]],
      MARCA: ['', [Validators.required]],
      PRODUCTOS: this.fb.array([]),
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CANTIDAD: ['', [Validators.required]],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;

    this.PRODUCTOS.push(this.crearItemProducto());

    console.log(`add`, add.pristine);
    console.log(`add`, add.status);
  }

  actualizarInputs(i: number, $event: any) {
    console.log(i);
    const productoId = Number($event.target.value);

    const productoSeleccionado = this.listaproductos.find(
      (producto) => producto.id === productoId,
    );

    const filaSeleccionada = (this.importForm.get('PRODUCTOS') as FormArray).at(
      i,
    );
    console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        NOMBRE: productoSeleccionado.NOMBRE,
        UNIDAD: productoSeleccionado.UNIDAD,
        CANTIDAD: null,
      });
    }
  }
  onreset() {}
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
  }
  crearImport(id: string) {

    console.log(`ID`,id)
    if (id === 'Nuevo') {
      this.importForm.reset();

      return;
    }

    if (this.importForm.invalid) {
      return Object.values(this.importForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

   /*  this.inportService.obtenerImportById(id)
    .subscribe((res:any=>{

    })) */
  }
  guardar() {
    if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    }
    this.inportService
      .getRegistroImport(this.importForm.value)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
        this.router.navigateByUrl("/dashboard/pedidos")
        this.importForm.reset();
      });
  }

  getMarca() {
    this.llenarcomboService.getMarca().subscribe((marcas) => {
      console.log(marcas);
      this.listamarca = marcas;
    });
  }

  getCliente() {
    this.llenarcomboService.getCliente().subscribe((clientes) => {
      this.listacliente = clientes;
    });
  }

  /*  getByImport(termino:string){
    console.log(termino);
    return termino.length === 0
      ? (this.importado = this.importadoTemp)
      : this.inportService.getByImport(termino).subscribe((pedidos) => {
          console.log(pedidos);

          this.importado = pedidos;
        });
  
  } */
}
