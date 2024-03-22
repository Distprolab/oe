import { OrdenCalendar } from '../models/as400.module';

export interface cargaAs400 {
  /*  map(arg0: (resp: any) => { nombre: any; codigo: any; }): any;
     ok:string,
   lista:Lista[];
   } */

  ordenes: OrdenCalendar[];
}
