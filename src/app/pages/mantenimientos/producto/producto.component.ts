import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { cargaProductos } from 'src/app/models/cargaProducto.module';

import { ImportacionService } from 'src/app/services/importacion.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productoseleccionado: cargaProductos;
  productoForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inportService: ImportacionService,
  ) {this.crearItemProducto();}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearProducto(id));
  }
  crearItemProducto() {
     this.fb.group({
      REFERENCIA: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      GENERACION: ['', [Validators.required]],
    });
  } 
  crearProducto(id: string) {
    this.inportService.obtenerProductoById(id).subscribe((productos) => {
      console.log(productos);
      const {
        REFERENCIA,
        NOMBRE,
        CATEGORIA,
        //  id,
        UNIDAD,
        GENERACION,
      } = productos;
      this.productoseleccionado = productos;

      this.productoForm.setValue({
        REFERENCIA,
        NOMBRE,
        CATEGORIA,

        UNIDAD,
        GENERACION,
      });
    });
  }
  guardar() {}
}
