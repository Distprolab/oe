import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  cargando = false;
  page;
  selectedFile: File | null = null;
  constructor() {}

  ngOnInit(): void {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }
}
