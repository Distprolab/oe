import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rangoreferencia',

  templateUrl: './rangoreferencia.component.html',
  styleUrl: './rangoreferencia.component.css',
})
export class RangoreferenciaComponent {
  rangosform!: FormGroup;
  constructor(private fb: FormBuilder) {}

  crearRangos() {}
  cambioEstado() {}

  borrarPruebas() {}
}
