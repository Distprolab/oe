import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { panelPrueba } from '../models/panelPruebas.module';
import { Cliente } from '../models/cliente.module';
import { Modelo, Modelos } from '../interfaces/cargaModelo.interface';

import { Impresora } from '../models/impresora.module';
import { Equipo, Equipos } from '../interfaces/carga-equipos.interfaces';

import { Observable, ObservedValueOf, map } from 'rxjs';
import { Prueba, Pruebastock } from '../interfaces/pruebastock.interfaces';
import { Correo } from '../models/correo.module';
import {
  Listaprueba,
  Pruebas,
} from '../interfaces/cargaListapruebas.interface';
import {
  Tipomuestra,
  Tipomuestras,
} from '../interfaces/cargarTipomuestras.interface';

import { Envase, Tubos } from '../interfaces/cargatubosinterface';
import { cargaProductos } from '../models/cargaProducto.module';
import {
  Tiposervicio,
  Tiposervicios,
} from '../interfaces/cargarTiposervicio.interface';
import {
  Tipoatencion,
  Tipoatenciones,
} from '../interfaces/cargarTipoatencion.interface';
import { Tipogrupo, Tipogrupos } from '../interfaces/cargarTipogrupo.interface';
import {
  Diagnostico,
  Diagnosticos,
} from '../interfaces/cargarDiagnostico.interface';
import { Perfiles } from '../models/cargarperfiles.module';
import {
  GrupoExam,
  Listaperfile,
} from '../interfaces/cargarGrupoExam.interface';
import {
  Provincia,
  Provincias,
} from '../interfaces/cargarProvincias.interface';
import {
  Equipocomplementario,
  Equiposcomplementarios,
} from '../interfaces/cargarEquipocomplementarios.interface';
import {
  EquipoByID,
  Equipocomplementarios,
  EquipoID,
} from '../interfaces/cargarIDEquipos.interface';
import {
  EquipoComplementarioByID,
  EquipocomplementarioID,
} from '../interfaces/cargarByIdEquipocomplementario.interface';
import { EstadoByID, EstadoID } from '../interfaces/cargarByIdEstado.interface';
import { UbicacionByID } from '../interfaces/cargarByIdUbicacion.interface';
import { ModeloByID, ModeloID } from '../interfaces/cargarByIdModelo.interface';
import { MarcaByID, MarcaID } from '../interfaces/cargarByIdMarca.interface';
import { Marca, Marcas } from '../interfaces/cargaMarca.interface';
import { Estado, Estados } from '../interfaces/cargaEstado.interface';
import { Ubicacion, Ubicaciones } from '../interfaces/cargaUbicacioninterface';
import { AnalizadorByID, AnalizadorID } from '../interfaces/cargarByIDAnalizador.interface';
import { Analizador, Analizadors } from '../interfaces/cargaAnalizador.interface';
import { Estadoproveedor, Estadoproveedores } from '../interfaces/cargarEstadoProveedores.interface';
import { EstadoByIdproveedore, EstadoproveedorID } from '../interfaces/cargarByIdEstadoProveedor.interface';
import { Estadocliente, Estadoclientes } from '../interfaces/cargarEstadoCliente.interface';
import { EstadoByIdcliente, EstadoclienteID } from '../interfaces/cargarByIdEstadoClilenteinterface';
import { Bodega, Bodegas } from '../interfaces/cargaBodega.interface';
import { BodegaById } from '../interfaces/cargarByIdBodegainterface';
//import { Pruebas } from '../interfaces/cargaReportPruebas.interfaces';

const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class MantenimientosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getCrearImpresora(formData: Impresora) {
    return this.http.post(`${baseUrl}/api/impresora`, formData, this.headers);
  }

  getCrearEquipoComplementario(formData: Equipocomplementarios) {
    return this.http.post(
      `${baseUrl}/api/equipocomplementario`,
      formData,
      this.headers,
    );
  }

  getDeleteEquipoComplementario(equipo: Equipocomplementarios) {
    return this.http.delete(
      `${baseUrl}/api/equipocomplementario/${equipo.id}`,
      this.headers,
    );
  }
  getByIDEquipoComplementario(id: string) {
    return this.http
      .get<EquipoComplementarioByID>(
        `${baseUrl}/api/equipocomplementario/${id}`,
        this.headers,
      )
      .pipe(map(({ equipocomplementarioId }) => equipocomplementarioId));
  }

  getCrearMarca(formData: Marca) {
    return this.http.post(`${baseUrl}/api/marca`, formData, this.headers);
  }

  getUpdateMarca(data: MarcaID) {
    return this.http.put(`${baseUrl}/api/marca/${data.id}`, data, this.headers);
  }

  getByIDMarca(id: string) {
    return this.http
      .get<MarcaByID>(`${baseUrl}/api/marca/${id}`, this.headers)
      .pipe(map(({ marcaId }) => marcaId));
  }

  buscarFiltroMarca(termino: string): Observable<Marca[]> {
    return this.http
      .get<Marcas>(
        `${baseUrl}/api/marca/busquedamarca/${termino}`,
        this.headers,
      )
      .pipe(map(({ marcas }) => marcas));
  }

  getCrearCorreo(formData: Correo) {
    return this.http.post(`${baseUrl}/api/correos`, formData, this.headers);
  }

  getCrearModalidad(formData: Marca) {
    return this.http.post(`${baseUrl}/api/modalidad`, formData, this.headers);
  }
  getCrearContrato(formData: Marca) {
    return this.http.post(
      `${baseUrl}/api/tipocontrato`,
      formData,
      this.headers,
    );
  }


  getEstadoProveedor(): Observable<Estadoproveedor[]> {
    return this.http
      .get<Estadoproveedores>(`${baseUrl}/api/estadofinancieroproveedor`, this.headers)
      .pipe(map(({ estadoproveedor }) => estadoproveedor));
  }

  getCrearEstadoProveedor(formData: Marca) {
    return this.http.post(`${baseUrl}/api/estadofinancieroproveedor`, formData, this.headers);
  }
  getUpdateEstadoProveedor(data: EstadoproveedorID) {
    return this.http.put(
      `${baseUrl}/api/estadofinancieroproveedor/${data.id}`,
      data,
      this.headers,
    );
  }
  getByIDEstadoProveedor(id: string) {
    return this.http
      .get<EstadoByIdproveedore>(`${baseUrl}/api/estadofinancieroproveedor/${id}`, this.headers)
      .pipe(map(({ estadoproveedorId }) => estadoproveedorId));
  }
  getDeleteEstadoProveedor(id: number) {
    return this.http.delete(`${baseUrl}/api/estadofinancieroproveedor/${id}`, this.headers);
  }

  buscarFiltroEstadoProveedor(termino: string): Observable<Estadoproveedor[]> {
    return this.http
      .get<Estadoproveedores>(
        `${baseUrl}/api/estadofinancieroproveedor/estadofinancieroproveedor/${termino}`,
        this.headers,
      )
      .pipe(map(({ estadoproveedor }) => estadoproveedor));
  }



  getEstadoCliente(): Observable<Estadocliente[]> {
    return this.http
      .get<Estadoclientes>(`${baseUrl}/api/estadofinancierocliente`, this.headers)
      .pipe(map(({ estadocliente }) => estadocliente));
  }

  getCrearEstadoCliente(formData: Marca) {
    return this.http.post(`${baseUrl}/api/estadofinancierocliente`, formData, this.headers);
  }
  getUpdateEstadoCliente(data: EstadoclienteID) {
    return this.http.put(
      `${baseUrl}/api/estadofinancierocliente/${data.id}`,
      data,
      this.headers,
    );
  }
  getByIDEstadoCliente(id: string) {
    return this.http
      .get<EstadoByIdcliente>(`${baseUrl}/api/estadofinancierocliente/${id}`, this.headers)
      .pipe(map(({ estadoclienteId }) => estadoclienteId));
  }
  getDeleteEstadoCliente(id: number) {
    return this.http.delete(`${baseUrl}/api/estadofinancierocliente/${id}`, this.headers);
  }





  getBodega(): Observable<Bodega[]> {
    return this.http
      .get<Bodegas>(`${baseUrl}/api/bodega`, this.headers)
      .pipe(map(({ bodega }) => bodega));
  }

  getCrearBodega(formData: Marca) {
    return this.http.post(`${baseUrl}/api/bodega`, formData, this.headers);
  }
  getUpdateBodega(data: EstadoclienteID) {
    return this.http.put(
      `${baseUrl}/api/bodega/${data.id}`,
      data,
      this.headers,
    );
  }
  getByIDBodega(id: string) {
    return this.http
      .get<BodegaById>(`${baseUrl}/api/bodega/${id}`, this.headers)
      .pipe(map(({ bodegaId }) => bodegaId));
  }
  getDeleteBdodega(id: number) {
    return this.http.delete(`${baseUrl}/api/bodega/${id}`, this.headers);
  }

  getResult(formData: FormData) {
    return this.http.post(`${baseUrl}/api/result`, formData, this.headers);
  }





















  buscarFiltroEstadoCliente(termino: string): Observable<Estadocliente[]> {
    return this.http
      .get<Estadoclientes>(
        `${baseUrl}/api/estadofinancierocliente/estadofinancierocliente/${termino}`,
        this.headers,
      )
      .pipe(map(({ estadocliente }) => estadocliente));
  }





  getCrearEstado(formData: Marca) {
    return this.http.post(`${baseUrl}/api/estado`, formData, this.headers);
  }
  getUpdateEstado(data: EstadoID) {
    return this.http.put(
      `${baseUrl}/api/estado/${data.id}`,
      data,
      this.headers,
    );
  }
  getByIDEstado(id: string) {
    return this.http
      .get<EstadoByID>(`${baseUrl}/api/estado/${id}`, this.headers)
      .pipe(map(({ estadoId }) => estadoId));
  }
  getDeleteEstado(id: number) {
    return this.http.delete(`${baseUrl}/api/estado/${id}`, this.headers);
  }

  buscarFiltroEstado(termino: string): Observable<Estado[]> {
    return this.http
      .get<Estados>(
        `${baseUrl}/api/estado/busquedaestado/${termino}`,
        this.headers,
      )
      .pipe(map(({ estado }) => estado));
  }








  getCrearUbicacion(formData: Marca) {
    return this.http.post(`${baseUrl}/api/ubicacion`, formData, this.headers);
  }
  getUpdateUbicaion(data: Marca) {
    return this.http.put(
      `${baseUrl}/api/ubicacion/${data.id}`,
      data,
      this.headers,
    );
  }
  buscarFiltroUbicacion(termino: string): Observable<Ubicacion[]> {
    return this.http
      .get<Ubicaciones>(
        `${baseUrl}/api/ubicacion/busquedaubicacion/${termino}`,
        this.headers,
      )
      .pipe(map(({ ubicacion }) => ubicacion));
  }

  getdeleteMarca(id: number) {
    return this.http.delete(`${baseUrl}/api/marca/${id}`, this.headers);
  }
  getByIDubicacion(id: string) {
    return this.http
      .get<UbicacionByID>(`${baseUrl}/api/ubicacion/${id}`, this.headers)
      .pipe(map(({ ubicacionId }) => ubicacionId));
  }
  getDeleteUbicacion(id: number) {
    return this.http.delete(`${baseUrl}/api/ubicacion/${id}`, this.headers);
  }
  getCrearCliente(formData: Cliente) {
    return this.http.post(`${baseUrl}/api/cliente`, formData, this.headers);
  }

  getCrearEquipo(formData: Equipo) {
    return this.http.post(`${baseUrl}/api/equipos`, formData, this.headers);
  }
  getUpdateEquipo(data: Equipo) {
    return this.http.put(
      `${baseUrl}/api/equipos/${data.id}`,
      data,
      this.headers,
    );
  }

  getIdEquipo(id: string) {
    return this.http
      .get<EquipoByID>(`${baseUrl}/api/equipos/${id}`, this.headers)
      .pipe(map(({ equipoId }) => equipoId));
  }
  getDeleteEquipo(equipo: Equipo) {
    return this.http.delete(
      `${baseUrl}/api/equipos/${equipo.id}`,
      this.headers,
    );
  }

  getProvincia(): Observable<Provincia[]> {
    return this.http
      .get<Provincias>(`${baseUrl}/api/provincia`, this.headers)
      .pipe(map(({ provincias }) => provincias));
  }
  getyCrearpanelPruebas(formData: panelPrueba) {
    return this.http.post(
      `${baseUrl}/api/panelPruebas`,
      formData,
      this.headers,
    );
  }

  getPanelPruebas(): Observable<Listaprueba[]> {
    return this.http
      .get<Pruebas>(`${baseUrl}/api/panelPruebas`, this.headers)
      .pipe(map(({ listapruebas }) => listapruebas));
  }

  getIdPanelPruebas(id: string) {
    return this.http
      .get(`${baseUrl}/api/panelPruebas/${id}`, this.headers)
      .pipe(
        map(
          (resp: { pk: boolean; listapruebas: cargaProductos }) =>
            resp.listapruebas,
        ),
      );
  }

  updatePanelPruebas(data: panelPrueba) {
    return this.http.put(
      `${baseUrl}/api/panelPruebas/${data.id}`,
      data,
      this.headers,
    );
  }

  deletePanelPruebas(pruebas: Listaprueba) {
    return this.http.delete(
      `${baseUrl}/api/panelPruebas/${pruebas.id}`,
      this.headers,
    );
  }

  postTipomuestra(formData: Tipomuestra) {
    return this.http.post(`${baseUrl}/api/tipomuestra`, formData, this.headers);
  }

  getTipomiuestra(): Observable<Tipomuestra[]> {
    return this.http
      .get<Tipomuestras>(`${baseUrl}/api/tipomuestra`, this.headers)
      .pipe(map(({ tipomuestra }) => tipomuestra));
  }

  deleteTipomuestra(pruebas: Tipomuestra) {
    return this.http.delete(
      `${baseUrl}/api/tipomuestra/${pruebas.id}`,
      this.headers,
    );
  }

  postTubo(formData: Envase) {
    return this.http.post(`${baseUrl}/api/tipotubo`, formData, this.headers);
  }

  getTubo(): Observable<Envase[]> {
    return this.http
      .get<Tubos>(`${baseUrl}/api/tipotubo`, this.headers)
      .pipe(map(({ envase }) => envase));
  }

  deleteTubo(tubo: Envase) {
    return this.http.delete(`${baseUrl}/api/tipotubo/${tubo.id}`, this.headers);
  }

  postServicio(formData: Envase) {
    return this.http.post(
      `${baseUrl}/api/tiposervicio`,
      formData,
      this.headers,
    );
  }

  getServicio(): Observable<Tiposervicio[]> {
    return this.http
      .get<Tiposervicios>(`${baseUrl}/api/tiposervicio`, this.headers)
      .pipe(map(({ tiposervicio }) => tiposervicio));
  }

  deleteServicio(servicio: Tiposervicio) {
    return this.http.delete(
      `${baseUrl}/api/tiposervicio/${servicio.id}`,
      this.headers,
    );
  }

  postAtencion(formData: Envase) {
    return this.http.post(
      `${baseUrl}/api/tipoatencion`,
      formData,
      this.headers,
    );
  }

  getAtencion(): Observable<Tipoatencion[]> {
    return this.http
      .get<Tipoatenciones>(`${baseUrl}/api/tipoatencion`, this.headers)
      .pipe(map(({ tipoatencion }) => tipoatencion));
  }

  deleteAtencion(atencion: Tipoatencion) {
    return this.http.delete(
      `${baseUrl}/api/tipoatencion/${atencion.id}`,
      this.headers,
    );
  }

  postGrupo(formData: Envase) {
    return this.http.post(`${baseUrl}/api/tipogrupo`, formData, this.headers);
  }

  getGrupo(): Observable<Tipogrupo[]> {
    return this.http
      .get<Tipogrupos>(`${baseUrl}/api/tipogrupo`, this.headers)
      .pipe(map(({ tipogrupo }) => tipogrupo));
  }

  consultaGrupo(): Observable<Listaperfile[]> {
    return this.http
      .get<GrupoExam>(`${baseUrl}/api/perfiles`, this.headers)
      .pipe(map(({ listaperfiles }) => listaperfiles));
  }

  deleteGrupo(grupo: Tipogrupo) {
    return this.http.delete(
      `${baseUrl}/api/tipogrupo/${grupo.id}`,
      this.headers,
    );
  }

  postDiagnostico(formData: Envase) {
    return this.http.post(
      `${baseUrl}/api/tipoatencion`,
      formData,
      this.headers,
    );
  }

  getDiagnostico(): Observable<Diagnostico[]> {
    return this.http
      .get<Diagnosticos>(`${baseUrl}/api/diagnostico`, this.headers)
      .pipe(map(({ diagnostico }) => diagnostico));
  }

  deleteDiagnostico(tubo: Envase) {
    return this.http.delete(
      `${baseUrl}/api/tipoatencion/${tubo.id}`,
      this.headers,
    );
  }

  getpostEquipoComplementario() {
    return this.http.post(`${baseUrl}/api/equipocomplementario`, this.headers);
  }
  buscarFiltroEquipoCom(termino: string): Observable<Equipocomplementario[]> {
    return this.http
      .get<Equiposcomplementarios>(
        `${baseUrl}/api/equipocomplementario/busquedaequipcom/${termino}`,
        this.headers,
      )
      .pipe(map(({ equipocomplementario }) => equipocomplementario));
  }
  getEquipoComplementario(): Observable<Equipocomplementario[]> {
    return this.http
      .get<Equiposcomplementarios>(
        `${baseUrl}/api/equipocomplementario`,
        this.headers,
      )
      .pipe(map(({ equipocomplementario }) => equipocomplementario));
  }

  getdeleteEquipoComplementario() {
    return this.http.delete(
      `${baseUrl}/api/equipocomplementario`,
      this.headers,
    );
  }

  buscarFiltroEquipo(termino: string): Observable<Equipo[]> {
    return this.http
      .get<Equipos>(
        `${baseUrl}/api/equipo/busquedaequipo/${termino}`,
        this.headers,
      )
      .pipe(map(({ equipos }) => equipos));
  }
  getUpdateEquipoComplementario(data: EquipocomplementarioID) {
    return this.http.put(
      `${baseUrl}/api/equipocomplementario/${data.id}`,
      data,
      this.headers,
    );
  }

  getCrearAnalizador(analizador: FormData) {
    return this.http.post(
      `${baseUrl}/api/analizador`,
      analizador,
      this.headers,
    );
  }

  getIdAnalizador(id: string) {
    return this.http
      .get<AnalizadorByID>(`${baseUrl}/api/analizador/${id}`, this.headers)
      .pipe(map(({ analizadorId }) => analizadorId));
  }


  UpdateAnalizador(data: AnalizadorID) {
    return this.http
      .put(`${baseUrl}/api/analizador/${data.id}`, data,this.headers)
      /* .pipe(map(({ analizadorId }) => analizadorId)); */
  }

  getDeleteAnalizador(id: number) {
    return this.http
      .delete(`${baseUrl}/api/analizador/${id}`, this.headers);
     /*  .pipe(map(({ analizadorId }) => analizadorId)); */
  }
  /* Inicio de modelo */
getfiltroAnalizador(termino: string): Observable<Analizador[]> {
  return this.http
    .get<Analizadors>(
      `${baseUrl}/api/modelo/busquedaanalizador/${termino}`,
      this.headers,
    )
    .pipe(map(({ analizador }) => analizador));
}
  getCrearcategoria(categoria: FormData) {
    return this.http.post(`${baseUrl}/api/modelo`, categoria, this.headers);
  }
  getUpdateModelo(data: ModeloID) {
    return this.http.put(
      `${baseUrl}/api/modelo/${data.id}`,
      data,
      this.headers,
    );
  }

  getByIDModelo(id: string) {
    return this.http
      .get<ModeloByID>(`${baseUrl}/api/modelo/${id}`, this.headers)
      .pipe(map(({ modeloId }) => modeloId));
  }
  buscarFiltroModelo(termino: string): Observable<Modelo[]> {
    return this.http
      .get<Modelos>(
        `${baseUrl}/api/modelo/busquedamodelo/${termino}`,
        this.headers,
      )
      .pipe(map(({ modelo }) => modelo));
  }
  getDeletecategoria(id: number) {
    return this.http.delete(`${baseUrl}/api/modelo/${id}`, this.headers);
  }

  /* Fin Modelo */

  getCargaExcelpruebas(formData: FormData) {
    return this.http.post(
      `${baseUrl}/api/stock-pruebas`,
      formData,
      this.headers,
    );
  }

  getPruebastock(): Observable<Prueba[]> {
    return this.http
      .get<Pruebastock>(`${baseUrl}/api/stock-pruebas`, this.headers)
      .pipe(map(({ pruebas }) => pruebas));
  }
  getDeletePrueba(prueba: Prueba) {
    return this.http.delete(
      `${baseUrl}/api/stock-pruebas/${prueba.id}`,
      this.headers,
    );
  }

  getPerfiles(formData: Perfiles) {
    return this.http.post(`${baseUrl}/api/perfiles`, formData, this.headers);
  }

  getPerfile(): Observable<Listaperfile[]> {
    return this.http
      .get<GrupoExam>(`${baseUrl}/api/perfiles`, this.headers)
      .pipe(map(({ listaperfiles }) => listaperfiles));
  }
}
