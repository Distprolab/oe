import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { subscribeOn } from 'rxjs';
import { Modalidad } from 'src/app/interfaces/cargaModalidad.interface';
import { Proceso } from 'src/app/interfaces/cargaProceso.interface';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.css'],
})
export class ConsultaComprasComponent implements OnInit {
  constructor(
    private registro: RegistroService,
    private activateRoute: ActivatedRoute,
    private llenarcomboService: LlenarCombosService,
  ) {}
  cargando = false;
  public listaproceso: Proceso[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  public proceso: Proceso[] = [];
  public procesoTemp: Proceso[] = [];
  selectedFile: File | null = null;
  listamodalidad: Modalidad[] = [];
  ngOnInit(): void {
    /* y */
    this.llenarcomboService.getModalidad().subscribe((modalidad) => {
      console.log(modalidad);
      this.listamodalidad = modalidad;
    });

    this.getProcesos();
  }
  getProcesos() {
    this.cargando = true;
    this.registro.getConsultaRegistro().subscribe(({ proceso }) => {
      console.log(proceso);
      this.proceso = proceso;
      this.procesoTemp = this.listaproceso;
      this.cargando = false;
    });
  }
  async EnvioCorreo(proceso: Proceso) {
    const id = proceso.id;
    Swal.fire({
      title: 'Select Excel file',
      html:
        '<input type="file" id="file-input" accept=".xls,.xlsx">' +
        '<textarea id="text-input" placeholder="Ingrese un correo "style="width: 100%; height: 100px; resize: vertical; margin-bottom: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"></textarea>',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'custom-swal-container',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
      preConfirm: () => {
        const fileInput = document.getElementById(
          'file-input',
        ) as HTMLInputElement;
        const textInput = document.getElementById(
          'text-input',
        ) as HTMLTextAreaElement;

        console.log(`text area`, textInput);
        const file = fileInput.files[0];
        const text = textInput.value;

        // Aquí puedes manejar la lógica de carga del archivo y el texto adicional
        this.uploadFile(file, text, id);
      },
    });
  }
  uploadFile(file: File, text: string, id: any) {
    console.log(`TEXT `, text);
    /*   if (!file) {
      console.log('No file selected');
      return;
    } */

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('id', id);
    this.registro.getEnvioCorreo(formData).subscribe((res: any) => {
      console.log('File uploaded successfully');
      const { msg } = res;
      Swal.fire('Success', `${msg}`, 'success');
    });
  }

  pdf2(proceso: Proceso) {
    this.registro.getReportePdf(proceso).subscribe((blob: Blob) => {
      //console.log(resp)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
  ObtnerById(proceso: Proceso) {
    console.log(proceso);

    const data = {
      PROCESO_ID: proceso.id,
    };
  }
  buscar(termino: string) {
    console.log(termino);
    return termino.length === 0
      ? (this.proceso = this.procesoTemp)
      : this.registro.buscarFiltroProceso(termino).subscribe((resultados) => {
          console.log(resultados);

          this.proceso = resultados;
        });
  }

  aprobarProceso(proceso: Proceso) {
    console.log(`//////************`, proceso);
    if (!proceso.aprobar) {
      Swal.fire({
        title: 'Seleccione una opcion',
        input: 'select',
        inputOptions: {
          Option: {
            1: 'Rentable',
            0: 'No Rentable',
          },
        },

        inputPlaceholder: '--Seleccione--',
        showCancelButton: true,

        inputAttributes: {
          style: 'font-size: 16px; margin: 10px auto;width:90%;',
        },
        preConfirm: (selectedValue) => {
          const data = {
            PROCESO_ID: proceso.id,
            ESTADOBI: selectedValue,
          };
          console.log(`******agregar impre***`, data);
          this.registro.getAprobarProceso(data).subscribe((resp: any) => {
            const { msg } = resp;
            Swal.fire('Actualizado', `${msg}`, 'success');
          });
        },
      });
    } else {
      if (proceso.aprobar.ESTADOBI != true) {
        console.log(`PERRO TRUE`, proceso);
        Swal.fire({
          title: 'Seleccione una opcion',
          input: 'select',
          inputOptions: {
            Option: {
              1: 'Rentable',
              // 0: 'No Rentable',
            },
          },

          inputPlaceholder: '--Seleccione--',
          showCancelButton: true,

          inputAttributes: {
            style: 'font-size: 16px; margin: 10px auto;width:90%;',
          },
          preConfirm: (selectedValue) => {
            const data = {
              PROCESO_ID: proceso.id,
              ESTADOBI: selectedValue,
            };
            console.log(data);
            this.registro.getUpdateProceso(data).subscribe(
              (resp: any) => {
                const { msg } = resp;
                Swal.fire('Actualizado', `${msg}`, 'success');
              },
              (err) => {
                Swal.fire({
                  icon: 'error',
                  text: err.error.msg,
                });
              },
            );
          },
        });
      }
    }
    /*   */
  }
}
