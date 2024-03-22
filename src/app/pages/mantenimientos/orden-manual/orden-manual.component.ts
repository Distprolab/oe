import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Inputmask from 'inputmask';
import { finalize, map } from 'rxjs';
import { PanelPruebas } from 'src/app/interfaces/cargarPanelPruebas.interface';
import { Listaordene } from 'src/app/interfaces/orden.interface';
import { Lista } from 'src/app/models/doctor.module';
import { Impresora } from 'src/app/models/impresora.module';
import { Pacientes } from 'src/app/models/muestra.module';
import { Orden } from 'src/app/models/orden.module';
import { Origin } from 'src/app/models/origin.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';
import { Provincia } from 'src/app/models/provincia.module';
import { Prueba } from 'src/app/models/pruebas.module';
import { Usuario } from 'src/app/models/usuario.module';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-orden-manual',
  templateUrl: './orden-manual.component.html',
  styleUrls: ['./orden-manual.component.css'],
})
export class OrdenManualComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  anio: number;
  dia: number;
  mes: number;
  public isLoading = false;
  public src: string;
  public data$: any;
  btnVal = 'Guardar';

  selectedItemsList = [];
  checkedIDs = [];
  data = [];
  data1 = [];
  data2 = [];
  data3 = [];
  data4 = [];
  data5 = [];
  data6 = [];
  data7 = [];
  data8 = [];
  data9 = [];
  // selectedItemsList = [];
  /* checkedIDs = []; */

  OrdenForm!: FormGroup; /* agregar codigo a lado de ItemName */

 /*  quimica = [
    { ItemName: '1001 GLU', ItemID: '1001-GLU' },
    { ItemName: '1021 GLUCCPP', ItemID: '1021-GLUCPP' },
    { ItemName: '1033 UREA', isChecked: false, ItemID: '1033-UREA' },
    { ItemName: '1036 CREA', isChecked: false, ItemID: '1036-CREA' },
    { ItemName: '504 BILIRRUBINA', isChecked: false, ItemID: '504-BILIRRUBIN' },
    { ItemName: '1072 AURIC', isChecked: false, ItemID: '1072-AURIC' },
    { ItemName: '1112 PROTT', isChecked: false, ItemID: '1112-PROTT' },
    { ItemName: '1114 ALB', isChecked: false, ItemID: '1114-ALB' },
    { ItemName: '4016 PCR', isChecked: false, ItemID: '4016-GLOB' },
    { ItemName: '1081 TGP', isChecked: false, ItemID: '1081-TGP' },
    { ItemName: '1078 TGO', isChecked: false, ItemID: '1078-TGO' },
    { ItemName: '1096 FALK', isChecked: false, ItemID: '1096-FALK' },

    { ItemName: '1057 COLT', isChecked: false, ItemID: '1057-COLT' },
    { ItemName: '1063 TG', isChecked: false, ItemID: '1063-TG' },
    { ItemName: '1242 FE', isChecked: false, ItemID: '1242-FE' },
    { ItemName: '1133 AMY', isChecked: false, ItemID: '1133-AMY' },

    { ItemName: '1130 LIPASA', isChecked: false, ItemID: '1130-LIPASA' },
    {
      ItemName: '507 GASES ARTERI..',
      isChecked: false,
      ItemID: '507-GASES ARTERI',
    },
    {
      ItemName: '519 ELECTROLITOS',
      isChecked: false,
      ItemID: '519-ELECTROLITOS',
    },
    { ItemName: '1115 GLOB', isChecked: false, ItemID: '1029-GLOB' },
    { ItemName: '1029  HBA1C', isChecked: false, ItemID: '1029-HBA1C' },

    { ItemName: '1099 LDH', isChecked: false, ItemID: '1099-LDH' },
    { ItemName: '1109 CKMB', isChecked: false, ItemID: '1109-CKMB' },
    { ItemName: '1106 CK', isChecked: false, ItemID: '1106-CK' },

    { ItemName: '1084 GGT', isChecked: false, ItemID: '1084-GGT' },

    {
      ItemName: '598 DEPURACION D',
      isChecked: false,
      ItemID: '598-DEPURACION D',
    },
    { ItemName: '4020 FACTOR R', isChecked: false, ItemID: '4020-FACTOR R' },
    { ItemName: '1145 CA', isChecked: false, ItemID: '1145-CA' },
    { ItemName: '1154 P', isChecked: false, ItemID: '1154-P' },
    { ItemName: '3470 TRF', isChecked: false, ItemID: '3470-TRF' },

    { ItemName: '1103 COLIN', isChecked: false, ItemID: '1103-COLIN' },
    { ItemName: '3619 C3', isChecked: false, ItemID: '3619-C3' },
    { ItemName: '3621 C4', isChecked: false, ItemID: '3621-C4' },
  ]; */

  /* hema = [
    {
      ItemName: '500 BIOMETRIA',
      isChecked: false,
      ItemID: '500-BIOMETRIA HEMATICA',
    },
    { ItemName: '2003 PLT', isChecked: false, ItemID: '2003-PLT' },
    {
      ItemName: '544 G.SANGUI..',
      isChecked: false,
      ItemID: '544-GRUPO SANGUINEO Y FACTOR RH',
    },
    { ItemName: '2066 TCOAG', isChecked: false, ItemID: '2066-TCOAG' },
    { ItemName: '2069 TP', isChecked: false, ItemID: '2069-TP' },
    { ItemName: '2082 TPT', isChecked: false, ItemID: '2082-TPT' },
    { ItemName: '2048 CDTO', isChecked: false, ItemID: '2048-CDTO' },
    { ItemName: '2051 COMND', isChecked: false, ItemID: '2051-COMIND' },
    { ItemName: '2087 TSANGR', isChecked: false, ItemID: '2087-TSANGR' },
    { ItemName: '2090 DIMER D', isChecked: false, ItemID: '2090-DIMER D' },
    { ItemName: '1004 GLUCTEST', isChecked: false, ItemID: '1004-GLUCTEST' },
    { ItemName: '2050 PPRETRAN', isChecked: false, ItemID: '2050-PPRETRAN' },
    { ItemName: '6410 PDCOOMBD', isChecked: false, ItemID: '6410-PDCOOMBD' },
    { ItemName: '6412 PCOOMBID', isChecked: false, ItemID: '6412-PCOOMBID' },
  ];

  
  hormonal = [
    { ItemName: '3009 FT3', ItemID: '3009-FT3', isChecked: false },
    { ItemName: '3017 FT4', ItemID: '3017-FT4', isChecked: false },
    { ItemName: '3001 TSH', ItemID: '3001-TSH', isChecked: false },
    { ItemName: '3031 FSH', ItemID: '3031-FSH', isChecked: false },
    { ItemName: '3035 E2', ItemID: '3035-E2', isChecked: false },
  
    { ItemName: '3027 PRL', ItemID: '3027-PRL', isChecked: false },
    { ItemName: '3033 PROG', ItemID: '3033-PROG', isChecked: false },
    { ItemName: '3081 INSULINA', ItemID: '3081-INSULINA', isChecked: false },
    { ItemName: '3201 HCG', ItemID: '3201-HCG', isChecked: false },
    { ItemName: '3203 TEST EMB', ItemID: '3203-TEST EMB', isChecked: false },
    { ItemName: '3029 LH', ItemID: '3029-LH', isChecked: false },
    { ItemName: '3250 NSE', ItemID: '3250-NSE', isChecked: false },
    { ItemName: '525 INDICE ROMA', ItemID: '525-INDICE  R', isChecked: false },
    { ItemName: '3052 TROP I', ItemID: '3052-TROP I', isChecked: false },
    { ItemName: '3706 IL6', ItemID: '3706-IL6', isChecked: false },
    { ItemName: '3087 INS120', ItemID: '3087-INS 120', isChecked: false },
  ];

  sero = [
    { ItemName: '1191 ANT PE C', ItemID: '1191-PEPT ANT', isChecked: false },
    {
      ItemName: '518 AGLUTINACION',      ItemID: '518-AGLUTINACIONES',      isChecked: false,
    },
    { ItemName: '4010 VDRL', ItemID: '4010-VDR', isChecked: false },
    { ItemName: '4025 ASTO ', ItemID: '4025-ASTO', isChecked: false },
    { ItemName: '3301 HIV RAPI', ItemID: '3301-HIV RAPID', isChecked: false },
    { ItemName: '3304 HIV1/2', ItemID: '3304-HIV 1/2', isChecked: false },
    { ItemName: '3310 SIF.ANT', ItemID: '3310-SIF.ANT', isChecked: false },
    { ItemName: '3352 HAVM', ItemID: '3352-HAVM', isChecked: false },
    { ItemName: '3355 HBsAg', ItemID: '3355-HBSAG', isChecked: false },
    { ItemName: '3373 HVC AC', ItemID: '3373-HVC', isChecked: false },
    { ItemName: '549 TORCH', ItemID: '549-TORCH', isChecked: false },
    { ItemName: '3419 NS1', ItemID: '3419-NS', isChecked: false },
    { ItemName: '3412 DENGM', ItemID: '3412-DENGM', isChecked: false },
    { ItemName: '3421 LEPTOS', ItemID: '3421-LEPTOS', isChecked: false },
    { ItemName: '3079 PEP C', ItemID: '3421-PEP C', isChecked: false },
  ];

 
  tumorales = [
    { ItemName: '3205 PSAT', ItemID: '3205-PSAT', isChecked: false },
    { ItemName: '3210 PSAL', ItemID: '3210-PSAL', isChecked: false },
    { ItemName: '3220 ACE', ItemID: '3220-ACE', isChecked: false },
    { ItemName: '3225 AFP', ItemID: '3225-AFP', isChecked: false },
    { ItemName: '3230 CA125', ItemID: '3230-CA125', isChecked: false },
    { ItemName: '3235 CA199', ItemID: '3235-CA199', isChecked: false },
    { ItemName: '3240 CA153', ItemID: '3240-CA153', isChecked: false },
    { ItemName: '3245 CA724', ItemID: '3245-CA724', isChecked: false },
  ];


  otros = [
    {
      ItemName: '558 LABOR PARTO',
      ItemID: '558-LABOR PARTO',
      isChecked: false,
    },
    { ItemName: '557 NEONATOS', ItemID: '557-NEONATOS', isChecked: false },
    {
      ItemName: '545 PANEL DROGAS',
      ItemID: '545-PANEL DROGAS',
      isChecked: false,
    },
    {
      ItemName: '528 CITOQUIMICO.',
      ItemID: '528-CITOQUIMICO DE LIQ. CEFALORAQ.',
      isChecked: false,
    },
    { ItemName: '8501 TOXICOLO', ItemID: '8501-TOXICOLO', isChecked: false },
    { ItemName: '591 HANSEN', ItemID: '591-HANSEN', isChecked: false },
    { ItemName: '8001 BACILOS', ItemID: '8001-BACILOS', isChecked: false },
    { ItemName: '2046 COMPATIB', ItemID: '2046-COMPATIB', isChecked: false },
    { ItemName: '8215 LEISH', ItemID: '8215-LEISH', isChecked: false },
    { ItemName: '1091 C.TB', ItemID: '1091-C.TB', isChecked: false },
  ];
 

  pruebasvirales = [
    {
      ItemName: '597 PRUEBAS VIRALES',
      ItemID: '597-PRUEBAS VIRALES',
      isChecked: false,
    },
    { ItemName: '3020 CD4', ItemID: '3020-CD4', isChecked: false },
    { ItemName: '3306 CV HIV', ItemID: '3306-CV HIV', isChecked: false },
  ];

  uro = [
    {
      ItemName: '513 ORINA EXAMEN',
      ItemID: '513-ORINA EXAMEN GENERAL',
      isChecked: false,
    },
    {
      ItemName: '543 PROTEINAS EN..',
      ItemID: '543-PROTEINAS EN ORINA 24H',
      isChecked: false,
    },
    {
      ItemName: '502 ACLARAMIENTO..',
      ItemID: '502-ACLARAMIENTO CREATININA',
      isChecked: false,
    },
    { ItemName: '4001 LAM', ItemID: '4001-LAM', isChecked: false },
    { ItemName: '1054 DEPURAC', ItemID: '1054-DEPURAC', isChecked: false },
  ];

  copro = [
    {
      ItemName: '506 COPROPARASIT',
      ItemID: '506-COPROPARASITARIO',
      isChecked: false,
    },
    {
      ItemName: '505 CITOLOGIA DE',
      ItemID: '505-CITOLOGIA DE',
      isChecked: false,
    },
    { ItemName: '6090 SANGOCU', ItemID: '6090-SANGOCU', isChecked: false },
    { ItemName: '6115 HELYHE', ItemID: '8123-POLINU', isChecked: false },
    { ItemName: '6095 ROTAVIRUS', ItemID: '6095-ROTAVIRU', isChecked: false },
  ];

   */

  prueba = [
    {
      ItemName: '900-9017 UROCULTIVO',
      ItemID: '9017-UROCULTIVO',
      isChecked: false,
    },
    { ItemName: '900-9088 HERIDA', ItemID: '9088-HERIDA', isChecked: false },
    {
      ItemName: '900-9040 EX FARINGEO',
      ItemID: '9040-EX FARINGEO',
      isChecked: false,
    },
    {
      ItemName: '900-9011 HEMOCULT',
      ItemID: '9011-HEMOCULTIVO',
      isChecked: false,
    },
    {
      ItemName: '900-9061 CSVAGINAL',
      ItemID: '9061-CSVAGINAL',
      isChecked: false,
    },
    {
      ItemName: '900-9031 SEC BONQU',
      ItemID: '9031-SEC BONQUIAL',
      isChecked: false,
    },
    {
      ItemName: '900-9049 SEC OTICA',
      ItemID: '9049-SEC OTICA',
      isChecked: false,
    },
    { ItemName: '900-9067 CATETER', ItemID: '9067-CATETER', isChecked: false },
    { ItemName: '900-9000 ESPUTO', ItemID: '9000-ESPUTO', isChecked: false },
    { ItemName: '900-9019 COPROCU ', ItemID: '9019-COPROCU', isChecked: false },
  ];

  seasons: string[] = ['1', '2'];

  liquido = [
    {
      ItemName: '9091 LIQ ASCITICO',
      ItemID: '9091-LIQ ASCITICO',
      isChecked: false,
    },
    {
      ItemName: '9083 LIQ PLEURAL',
      ItemID: '9083-LIQ PLEURAL',
      isChecked: false,
    },
    {
      ItemName: '9127 LIQ CEFALORAQ',
      ItemID: '9127-LIQ CEFALORAQUIDE',
      isChecked: false,
    },
    {
      ItemName: '9084 LIQ PERITONEAL',
      ItemID: '9084-LIQ PERITONEAL',
      isChecked: false,
    },
  ];

  microbacterias = [
    {
      ItemName: '9131 MICOBAC-PCR XDR',
      ItemID: '9131-MICOBACTER-PCR XDR',
      isChecked: false,
    },
    {
      ItemName: '9130 MICOBAC-PCR ULT',
      ItemID: '9130-MICOBACTER-PCR ULTR',
      isChecked: false,
    },
  ];

  showAge;
  showFecha;

  /*   get TIPOIDENTIFICADOR() {
      return this.OrdenForm?.get('TIPOIDENTIFICADOR')!.invalid && this.OrdenForm?.get('TIPOIDENTIFICADOR')!.touched
    } */
  get IDENTIFICADOR() {
    return (
      this.OrdenForm?.get('IDENTIFICADOR')!.invalid &&
      this.OrdenForm?.get('IDENTIFICADOR')!.touched
    );
  }
  get NOMBRETIPOORDEN() {
    return (
      this.OrdenForm?.get('NOMBRETIPOORDEN')!.invalid &&
      this.OrdenForm?.get('NOMBRETIPOORDEN')!.touched
    );
  }
  get NOMBRES() {
    return (
      this.OrdenForm?.get('NOMBRES')!.invalid &&
      this.OrdenForm?.get('NOMBRES')!.touched
    );
  }
  get APELLIDO() {
    return (
      this.OrdenForm?.get('APELLIDO')!.invalid &&
      this.OrdenForm?.get('APELLIDO')!.touched
    );
  }

  get CODPROVINCIA() {
    return (
      this.OrdenForm?.get('CODPROVINCIA')!.invalid &&
      this.OrdenForm?.get('CODPROVINCIA')!.touched
    );
  }

  get TELEFONO() {
    return (
      this.OrdenForm?.get('TELEFONO')!.invalid &&
      this.OrdenForm?.get('TELEFONO')!.touched
    );
  }

  get DIRECCION() {
    return (
      this.OrdenForm?.get('DIRECCION')!.invalid &&
      this.OrdenForm?.get('DIRECCION')!.touched
    );
  }

  get EMAIL() {
    return (
      this.OrdenForm?.get('EMAIL')!.invalid &&
      this.OrdenForm?.get('EMAIL')!.touched
    );
  }

  get EDAD() {
    return (
      this.OrdenForm?.get('EDAD')!.invalid &&
      this.OrdenForm?.get('EDAD')!.touched
    );
  }
  get FECHANACIMIENTO() {
    return (
      this.OrdenForm?.get('FECHANACIMIENTO')!.invalid &&
      this.OrdenForm?.get('FECHANACIMIENTO')!.touched
    );
  }

  get CODIMPRESORA() {
    return (
      this.OrdenForm?.get('CODIMPRESORA')!.invalid &&
      this.OrdenForm?.get('CODIMPRESORA')!.touched
    );
  }

  /*
    get HORACITA() {
      return this.OrdenForm?.get('HORACITA')!.invalid && this.OrdenForm?.get('HORACITA')!.touched
    } */
  get SEXO() {
    return (
      this.OrdenForm?.get('SEXO')!.invalid &&
      this.OrdenForm?.get('SEXO')!.touched
    );
  }
  get HIS() {
    return (
      this.OrdenForm?.get('HIS')!.invalid && this.OrdenForm?.get('HIS')!.touched
    );
  }

  get CODDOCTOR() {
    return (
      this.OrdenForm?.get('CODDOCTOR')!.invalid &&
      this.OrdenForm?.get('CODDOCTOR')!.touched
    );
  }
  get CODTIPOORDEN() {
    return (
      this.OrdenForm?.get('CODTIPOORDEN')!.invalid &&
      this.OrdenForm?.get('CODTIPOORDEN')!.touched
    );
  }
  get PRIORIDAD() {
    return (
      this.OrdenForm?.get('PRIORIDAD')!.invalid &&
      this.OrdenForm?.get('PRIORIDAD')!.touched
    );
  }
  get CODCENTROSALUD() {
    return (
      this.OrdenForm?.get('CODCENTROSALUD')!.invalid &&
      this.OrdenForm?.get('CODCENTROSALUD')!.touched
    );
  }

  get OPERADOR() {
    return (
      this.OrdenForm?.get('OPERADOR')!.invalid &&
      this.OrdenForm?.get('OPERADOR')!.touched
    );
  }
  get CODFLEBOTOMISTA() {
    return (
      this.OrdenForm?.get('CODFLEBOTOMISTA')!.invalid &&
      this.OrdenForm?.get('CODFLEBOTOMISTA')!.touched
    );
  }
  get CORRELATIVO() {
    return (
      this.OrdenForm?.get('CORRELATIVO')!.invalid &&
      this.OrdenForm?.get('CORRELATIVO')!.touched
    );
  }

  get pruebas() {
    return this.OrdenForm.get('pruebas') as FormArray;
  }
  public usuarios: Usuario[] = [];
  public listaordene: Listaordene[] = [];
  public page!: number;
  listaOperador: Origin[] = [];
  listaPanelpruebas: panelPrueba[] = [];
  listaFlebotomista: Origin[] = [];
  listaSala: Origin[] = [];
  listaImpresora: Impresora[] = [];
  listaCentrosalud: Origin[] = [];
  listadoctor: Lista[] = [];
  listaprovincia: Provincia[] = [];
  ordenseleccionada: Orden;
  listaprueba: Prueba[] = [];
  listaorigin: Origin[] = [];
  listaservice: Origin[] = [];
  listapacientes: Pacientes[] = [];
  listanombre = [];

  listahematologia: any[] = [];
  listauroanalisis: any[] = [];
  listaquimica: any[] = [];
  listacoprologia: any[] = [];

  listaserologia: any[] = [];

  listahormonal: any[] = [];
  listatumorales: any[] = [];
  listaotros: any[] = [];

  listapruebasVirales: any[] = [];

  usuarioLogueado: Usuario;
  public cargando: boolean = true;
  isFormDisabled: boolean = false;
  public usuario: Usuario;
  constructor(
    private fb: FormBuilder,

    private doctorservice: LlenarCombosService,
    public agendamientoService: AgendamientoService,
    private el: ElementRef,
    private ordenService: OrdenesService,
    private modalImagenService: ModalImagenService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private rolService: RolService,
  ) {
    //this.usuario = usuarioService.usuario,
    // console.log('datos del usuarios', this.usuario)
    this.anio = new Date().getFullYear();
    this.mes = new Date().getMonth();
    this.dia = new Date().getDay();
    this.crearformulario();
    // this.dataFormulario();
  }

  ngOnInit(): void {
    const valorAlmacenado = localStorage.getItem('IMPRESORA');
    console.log(`******`, valorAlmacenado);
    if (valorAlmacenado) {
      // Establecer el valor almacenado en el formulario
      this.OrdenForm.patchValue({ CODIMPRESORA: valorAlmacenado });
    }

    this.doctorservice.getDoctor().subscribe((resp) => {
      this.listadoctor = resp;

      console.log(`********************RT***`, this.listadoctor);
    });

    this.doctorservice.getOperador().subscribe((resp) => {
      this.listaOperador = resp;
    });

    this.doctorservice.getCentrosalud().subscribe((resp) => {
      this.listaCentrosalud = resp;
    });

    this.doctorservice.getFlebotomista().subscribe((resp) => {
      this.listaFlebotomista = resp;
    });

    this.doctorservice.getOrigin().subscribe((resp) => {
      this.listaorigin = resp;
    });

    this.doctorservice.getImpresora().subscribe((resp) => {
      this.listaImpresora = resp;

      console.log(`impresora`, this.listaImpresora);
    });
    this.doctorservice.getPanelPruebas().subscribe((resp) => {
      //  this.listaPanelpruebas = resp;
      this.listaquimica = resp.filter(
        (prueba) => prueba.CATEGORIA === 'QUIMICA',

      );
      this.listauroanalisis = resp.filter(
        (prueba) => prueba.CATEGORIA === 'UROANALISIS',

      );
      this.listahematologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'HEMATOLOGIA',

      );
      console.log(`pruebas panel`, this.listauroanalisis);
      this.listahormonal = resp.filter(
        (prueba) => prueba.CATEGORIA === 'HORMONAL',
      );
      this.listapruebasVirales = resp.filter(
        (prueba) => prueba.CATEGORIA === 'PRUEBAS VIRALES',
      );
    

      this.listaserologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'SEROLOGIA',
      );

      this.listaotros = resp.filter(
        (prueba) => prueba.CATEGORIA === 'OTROS',
      );
      this.listatumorales = resp.filter(
        (prueba) => prueba.CATEGORIA === 'TUMORALES',
      );
      this.listacoprologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'COPROLOGIA',
      );

    });
  }

  crearOrden(id: string) {
    if (id === 'Nuevo') {
      this.OrdenForm.reset();
      this.pruebas.clear();
      this.clearFilters();
      this.OrdenForm.enable();
      this.btnVal = 'Guardar';

      return;
    }

    this.btnVal = 'Editar';
    this.OrdenForm.disable();

    this.ordenService
      .obtenerOrdenById(id)

      .subscribe((orden) => {
        // this.OrdenForm.disable();
        !orden
          ? this.router.navigateByUrl('/dashboard/ordenes')
          : console.log('cabeecera', orden);
        const {
          //  TIPOIDENTIFICADOR,
          IDENTIFICADOR,
          NOMBRES,
          APELLIDO,
          CODPROVINCIA,
          DIRECCION,
          TELEFONO,
          EMAIL,
          //  FECHACITA,
          //   HORACITA,
          EDAD,
          FECHANACIMIENTO,
          SEXO,
          CODTIPOORDEN,
          CODDOCTOR,
          NOMBRETIPOORDEN,
          PRIORIDAD,
          HIS,
          //CODESPECIALIDADES,
          OPERADOR,
          CODFLEBOTOMISTA,
          CORRELATIVO,
          CODIMPRESORA,
          CODEMBARAZADA,
          // CODCENTROSALUD,

          as400,
        } = orden;

        this.ordenseleccionada = orden;

        //console.log('orden seleccionada', this.ordenseleccionada.pruebas)
        console.log(this.ordenseleccionada);
        this.OrdenForm.setValue({
          //TIPOIDENTIFICADOR,
          IDENTIFICADOR,
          NOMBRES,
          APELLIDO,
          // FECHACITA: FECHACITA == null ? '' : FECHACITA.slice(0, 10),
          //  HORACITA,
          CODPROVINCIA,
          DIRECCION,
          TELEFONO,
          EMAIL,
          FECHANACIMIENTO: FECHANACIMIENTO.slice(0, 10),
          SEXO,
          CODDOCTOR,
          EDAD,
          HIS,
          PRIORIDAD,
          //CODPROCEDENCIA,
          // CODCENTROSALUD,
          CODTIPOORDEN: CODTIPOORDEN,
          //  CODSALA,
          //CODESPECIALIDADES,
          OPERADOR,
          CODFLEBOTOMISTA,
          CORRELATIVO,
          CODEMBARAZADA,
          CODIMPRESORA:
            localStorage.getItem('IMPRESORA') == null
              ? CODIMPRESORA
              : localStorage.getItem('IMPRESORA'),
          pruebas: orden.as400.map((valor) =>
            this.pruebas.push(
              this.fb.group({
                ItemID: valor['ItemID'],
                ItemName: valor['ItemName'],
                ESTADO: valor['ESTADO'],
              }),
            ),
          ),
        });
      });
  }

  CalculateAge() {
    if (this.OrdenForm.value.FECHANACIMIENTO) {
      console.log(this.OrdenForm.value.FECHANACIMIENTO);
      const convertAge = new Date(this.OrdenForm.value.FECHANACIMIENTO);
      // console.log(convertAge)
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());

      return (this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365));
      //console.log(this.showAge)
    } else {
      return null;
    }
  }
  crearformulario() {
    this.OrdenForm = this.fb.group(
      {
        // TIPOIDENTIFICADOR: ['', [Validators.required]],
        IDENTIFICADOR: ['', [Validators.required]],
        NOMBRES: ['', [Validators.required]],
        APELLIDO: ['', [Validators.required]],
        FECHANACIMIENTO: ['', [Validators.required]],
        SEXO: ['', [Validators.required]],
        CODTIPOORDEN: ['', [Validators.required]],
        //NOMBRETIPOORDEN: [''],
        PRIORIDAD: ['', [Validators.required]],
        CODDOCTOR: ['', [Validators.required]],
        HIS: ['Manual'],
        TELEFONO: ['', [Validators.required]],
        EMAIL: [''],

        CODEMBARAZADA: [],

        CODPROVINCIA: [''],
        DIRECCION: [''],
        OPERADOR: ['', [Validators.required]],
        CODFLEBOTOMISTA: ['', [Validators.required]],
        CORRELATIVO: [],
        CODIMPRESORA: ['', [Validators.required]],
        EDAD: [],
        CODCENTROSALUD: ['', [Validators.required]],
        // HORACITA: [''],

        // CODSALA: ['', [Validators.required]],
        //CODESPECIALIDADES: ['', [Validators.required]],

        pruebas: this.fb.array([]),
      },
      { validators: this.validatePruebas },
    );

    this.changeValidators();
    /* 
        this.OrdenForm.get('FECHANACIMIENTO').valueChanges.subscribe((value) => {
          if (value) {
            const fechaNacimiento = new Date(value);
            const hoy = new Date();
            const edad = Math.floor((hoy.getTime() - fechaNacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
            this.OrdenForm.get('EDAD').setValue(edad);
          }
        }); */
    /*  this.OrdenForm.get('FECHANACIMIENTO').valueChanges.subscribe((value) => {
       if (value) {
         const fechaNacimiento = new Date(value);
         const hoy = new Date();
         const edad = Math.floor((hoy.getTime() - fechaNacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
         this.OrdenForm.get('EDAD').setValue(edad);
       }
     }); */

    this.OrdenForm.get('FECHANACIMIENTO').valueChanges.subscribe((value) => {
      if (value) {
        const parts = value.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          const fechaNacimiento = new Date(year, month - 1, day); // Resta 1 al mes porque los meses en JavaScript son de 0 a 11
          const hoy = new Date();
          const edad = Math.floor(
            (Number(hoy) - Number(fechaNacimiento)) /
              (365.25 * 24 * 60 * 60 * 1000),
          );
          console.log(edad); // Puedes mostrar la edad en la consola o asignarla a otra propiedad
        }
      }
    });

    this.OrdenForm.get('EDAD').valueChanges.subscribe((value) => {
      if (value) {
        const hoy = new Date();
        const fechaNacimiento = new Date(
          hoy.getFullYear() - value,
          hoy.getMonth(),
          hoy.getDate(),
        );
        this.OrdenForm.get('FECHANACIMIENTO').setValue(
          fechaNacimiento.toISOString().split('T')[0],
        );
      }
    });

    //this.OrdenForm.valueChanges.subscribe(data=>{this.changeValidators()})
    // const control = this.OrdenForm.controls['pruebas'];
  }
  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('pruebas') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true }; // Devuelve un error si no hay pruebas
    }
    return null; // Devuelve null si las pruebas son válidas
  }
  
  changeValidators() {
    this.usuario = this.usuarioService.usuario;

    if (this.usuario.rol == 'OPERADOR' || this.usuario.rol == 'ADMIN') {
      this.OrdenForm.controls['OPERADOR'].setValidators([Validators.required]);
      this.OrdenForm.controls['CODFLEBOTOMISTA'].setValidators([
        Validators.required,
      ]);
      this.OrdenForm.controls['CODIMPRESORA'].setValidators([
        Validators.required,
      ]);
    } else {
      //this.OrdenForm.controls['OPERADOR'].clearValidators();
    }

    this.OrdenForm.get('OPERADOR').updateValueAndValidity();
  }



  isFormValid(): boolean {
    return this.OrdenForm.valid;
  }
  guardarOrden() {
    if (this.OrdenForm.invalid) {
      return Object.values(this.OrdenForm.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    console.log('ESTADO DEL BOTON ', this.OrdenForm);
    if (this.ordenseleccionada) {
      const data = {
        ...this.OrdenForm.value,
        id: this.ordenseleccionada.id,
      };

      this.ordenService.actualizarOrden(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        // this.router.navigateByUrl('/dashboard/ordenes')
        localStorage.setItem('IMPRESORA', this.OrdenForm.value.CODIMPRESORA);
        /* localStorage.setItem('FLEBOTOMISTA', this.OrdenForm.value.FLEBOTOMISTA); */
        console.log('IMPRESORA', this.OrdenForm.value.CODIMPRESORA);
        this.OrdenForm.disable();
        this.btnVal = 'Editar';
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading();
      console.log(this.OrdenForm.value);
      this.ordenService
        .GuardarManualOrden(this.OrdenForm.value)

        .subscribe(
          (resp: any) => {
            const { msg } = resp;

            Swal.fire({
              icon: 'success',
              text: `${msg}`,
            });
            this.pruebas.clear();
            this.clearFilters();
            this.OrdenForm.reset({
              //TIPOIDENTIFICADOR: '',
              IDENTIFICADOR: '',
              NOMBRES: '',
              APELLIDO: '',
              CODPROVINCIA: '',
              DIRECCION: '',
              TELEFONO: '',
              EMAIL: '',
              HIS: 'Manual',
              FECHANACIMIENTO: '',

              CODEMBARAZADA: '',
              SEXO: '',
              CODDOCTOR: '',
              CODTIPOORDEN: '',
              CODSALA: '',
              // CODESPECIALIDADES: this.usuarioLogueado.doctor,
              OPERADOR: '',
              CODFLEBOTOMISTA: '',
              CORRELATIVO: '',
              CODIMPRESORA: '',
              pruebas: '',
            });

            // this.router.navigateByUrl('/dashboard/ordenes');
          },
          (err) => {
            console.log('error', err);
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: err.error.msg,
            });
          },
        );
    }

    //}

    //console.log(this.OrdenForm.value)
  }

  enviarorden() {
    if (this.OrdenForm.invalid) {
      return Object.values(this.OrdenForm.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    const data = {
      ...this.OrdenForm.getRawValue(),
      id: this.ordenseleccionada.id,
    };

    console.log('ENVIANDO A INIFINITY', data);

    this.ordenService.EnviarOrden(data).subscribe((resp: any) => {
      const { msg } = resp;

      Swal.fire('Archivo', `${msg}`, 'success');
      this.router.navigateByUrl('/dashboard/ordenes');
    });
  }
  borrarPasatiempo(i: number) {
    this.pruebas.removeAt(i);
  }

  seleccionarPaciente(paciente) {
    let fecha = paciente.PA_BIRTHDATE.slice(0, 10);
    let feha = fecha.split('/');
    console.log(`***********PACEINTE********`, paciente);
    $('#modal-info').modal('hide');
    this.OrdenForm.setValue({
      // TIPOIDENTIFICADOR: '',
      IDENTIFICADOR: paciente.PA_ID1,
      NOMBRES: paciente.PA_FIRSTNAME,
      APELLIDO: paciente.PA_LASTNAME + ' ' + paciente.PA_SESURNAME,
      EDAD: '',
      HIS: '',
      FECHANACIMIENTO: feha[2] + '-' + feha[1] + '-' + feha[0],
      FECHACITA: '',
      HORACITA: '',
      SEXO: paciente.PA_SEX,
      CODPROVINCIA: '',
      DIRECCION: '',
      TELEFONO: '',
      EMAIL: '',
      CODEMBARAZADA: '',
      // CODESPECIALIDADES: this.usuarioLogueado.doctor,
      CODDOCTOR: this.usuarioLogueado.id,
      CODTIPOORDEN: '',
      CODSALA: '',
      OPERADOR: '',
      CODFLEBOTOMISTA: '',
      CORRELATIVO: '',
      CODIMPRESORA: '',
      CODCENTROSALUD: '',
      pruebas: '',
    });
  }

  buscar(NOMBRE: string, CEDULA: string) {
    this.cargando = true;

    this.doctorservice
      .getpacientes(NOMBRE, CEDULA)
      .subscribe(({ listaordenes }) => {
        this.listaordene = listaordenes;

        this.cargando = false;
      });
  }

 

  abrirModal() {
    this.modalImagenService.abrirModal();
  }

  buscarHis(cedula: string) {
    this.cargando = true;
    this.ordenService.buscarOrdenHis(cedula).subscribe((orden) => {
      console.log('buscar HIS', orden.IDENTIFICADOR);
      

      this.OrdenForm.setValue({
        //TIPOIDENTIFICADOR,
        HIS: 'Manual',
        IDENTIFICADOR: orden.IDENTIFICADOR,
        NOMBRES: orden.NOMBRES,
        APELLIDO: orden.APELLIDO,

        FECHANACIMIENTO: orden.FECHANACIMIENTO,
        EDAD: '',
        SEXO: orden.SEXO,
        CODPROVINCIA: '',
        DIRECCION: orden.DIRECCION,
        CODEMBARAZADA: '',
        CODDOCTOR: '',
        CODTIPOORDEN: '',
        PRIORIDAD: '',
        EMAIL: orden.EMAIL,
        TELEFONO: orden.TELEFONO,
        OPERADOR: '',
        CODFLEBOTOMISTA: '',
        CODCENTROSALUD: '',
        CORRELATIVO: '',
        CODIMPRESORA: '',
        pruebas: '',
      });
      this.cargando = false;
    });
  }
  buscarSais(CEDULA: string) {
    console.log(CEDULA);
    this.ordenService.buscarOrderSais(CEDULA).subscribe((orden) => {
    
      console.log(`****orden23**`, orden);
      console.log(`****orden23**`, orden[0].IDENTIFICADOR);
      this.OrdenForm.setValue({
        //  TIPOIDENTIFICADOR:'',
        HIS: orden[0].HIS,
        IDENTIFICADOR: orden[0].IDENTIFICADOR,
        NOMBRES: orden[0].NOMBRES,
        APELLIDO: orden[0].APELLIDO,

        FECHANACIMIENTO: orden[0].FECHANACIMIENTO,
        EDAD: '',
        SEXO: orden[0].SEXO,
        CODPROVINCIA: '',
        DIRECCION: '',
        CODEMBARAZADA: '',
        CODDOCTOR: orden[0].CODDOCTOR,
        CODTIPOORDEN: orden[0].CODTIPOORDEN,
        PRIORIDAD: orden[0].PRIORIDAD,
        EMAIL: orden[0].EMAIL,
        TELEFONO: orden[0].TELEFONO,
        OPERADOR: '',
        CODFLEBOTOMISTA: '',
        CODCENTROSALUD: '',
        CORRELATIVO: '',
        CODIMPRESORA: '',
        //NUMEROORDEN,
        pruebas: orden[0].as400.map((valor) =>
          this.pruebas.push(
            this.fb.group({
              ItemID: valor['ItemID'],
              ItemName: valor['ItemName'],
              ESTADO: '1',
            }),
          ),
        ),
      });
    });
  }
  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.doctorservice.searchTrack({ q: value }).pipe(
      map(({ prueba }) => prueba),

      finalize(() => (this.isLoading = false)),
    );
  }
  searchMicro(value: any): any {
    this.isLoading = true;

    this.data$ = this.doctorservice.pruebasMicro({ q: value }).pipe(
      map(({ prueba }) => prueba),

      finalize(() => (this.isLoading = false)),
    );
  }

  seleccionarCategoria(nombre: any) {
      console.log(`********************N**`,nombre)
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
    if (Array.isArray(nombre)) {
      const pruebaExistente = pruebasArray.value;
      const pruebaExistente2 = pruebaExistente.find(
        (control) => control.ItemID === nombre[0],
      );

      if (!pruebaExistente2) {
        this.pruebas.push(
          this.fb.group({
            ItemID: nombre[0],
            ItemName: nombre[1],
            ESTADO: ['1', [Validators.required]],
          }),
        );
        this.inputRef.nativeElement.value = '';
      } else {
        console.log('Ya existe una prueba con el ItemID:', nombre);
      }
    } else {
      const itemID = nombre['TestID'];
      const itemNombre = nombre['TestName'];
      //const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
      const pruebaExistente = pruebasArray.value;
      const pruebaExistente2 = pruebaExistente.find(
        (control) => control.ItemID === itemID,
      );
      if (pruebaExistente2) {
        // Si ya existe una prueba con el mismo ItemID, no se agrega una nueva
        console.log('Ya existe una prueba con el ItemID:', itemID);
      } else {
        this.pruebas.push(
          this.fb.group({
            ItemID: [itemID, Validators.required],
            ItemName: [itemNombre, Validators.required],
            ESTADO: ['1', Validators.required],
          }),
        );
        console.log('Prueba agregada adicional:', itemID);
      }
    }
  }

  onchange(e: any) {
    const checkedValue = e.target.value;
    console.log(`*********************ONCHANGE*******`,checkedValue)
    const nombre = checkedValue.split('-');
    const checked = e.target.checked;

    if (checked) {
      this.seleccionarCategoria(nombre);
    } else {
      this.desmarcarCategoria(nombre);
    }
  }

  desmarcarCategoria(nombre) {
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
    const index = pruebasArray.controls.findIndex(
      (control) => control.value.ItemID === nombre[0],
    );
    if (index !== -1) {
      // Elimina la prueba del FormArray usando el índice
      pruebasArray.removeAt(index);
      console.log('Prueba eliminada:', nombre[0]);
    } else {
      console.log('No se encontró la prueba con el ItemID:', nombre[0]);
    }
  }

  removeItem(i: number) {
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
    pruebasArray.removeAt(i);
  }
  onreset() {
    this.OrdenForm.reset({ HIS: 'Manual' });
    this.pruebas.clear();
  }

  cambioestado() {
    //this.form.get('credentials').at(index).get('label').enable();

    console.log('ESTADO DEL BOTON', this.btnVal);
    if (this.btnVal != 'Editar') {
      this.guardarOrden();
    }
    this.OrdenForm.enable();
    this.btnVal = 'Guardar';
  }

  clearFilters() {
    const inputs = document.getElementsByName('checkbox');
    inputs.forEach((i) => (i['checked'] = false));
  }
  isPruebaDisabled(index: number): boolean {
    return this.OrdenForm.disabled; // Devuelve true si el formulario está desactivado, de lo contrario, devuelve false
  }
}
