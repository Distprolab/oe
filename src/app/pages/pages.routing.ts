import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MuestraComponent } from './mantenimientos/muestra/muestra.component';
import { MuestrasComponent } from './mantenimientos/muestras/muestras.component';
import { OrdenComponent } from './mantenimientos/orden/orden.component';
import { OrdenesComponent } from './mantenimientos/ordenes/ordenes.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { ProductoComponent } from './mantenimientos/producto/producto.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { MuestrasRechazoComponent } from './mantenimientos/muestras-rechazo/muestras-rechazo.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { AdminGuard } from '../guards/admin.guard';
import { MuestraUpdateComponent } from './mantenimientos/muestra-update/muestra-update.component';
import { ResgistroPacientesComponent } from './mantenimientos/resgistro-pacientes/resgistro-pacientes.component';
import { ReportProduccionComponent } from './mantenimientos/report-produccion/report-produccion.component';
import { ReportQCComponent } from './mantenimientos/report-qc/report-qc.component';
import { AgendamientoComponent } from './mantenimientos/agendamiento/agendamiento.component';
import { ConsultaWebComponent } from './mantenimientos/consulta-web/consulta-web.component';
import { AgendadosComponent } from './mantenimientos/agendados/agendados.component';
import { AgendamientoManualComponent } from './mantenimientos/agendamiento-manual/agendamiento-manual.component';
import { OrdenManualComponent } from './mantenimientos/orden-manual/orden-manual.component';
import { EstadisticaMicroComponent } from './mantenimientos/estadistica-micro/estadistica-micro.component';
import { RegistroComprasComponent } from './mantenimientos/registro-compras/registro-compras.component';
import { ComprasComponent } from './mantenimientos/compras/compras.component';
import { ConsultaComprasComponent } from './mantenimientos/consulta-compras/consulta-compras.component';
import { ImportacionComponent } from './mantenimientos/importacion/importacion.component';
import { ImportadosComponent } from './mantenimientos/importados/importados.component';
import { ListaproductosComponent } from './mantenimientos/listaproductos/listaproductos.component';
import { TotalPedidosComponent } from './mantenimientos/total-pedidos/total-pedidos.component';
import { ImpresoraComponent } from './mantenimientos/impresora/impresora.component';
import { MarcaComponent } from './mantenimientos/marca/marca.component';
import { ClienteComponent } from './mantenimientos/cliente/cliente.component';
import { panelPrueba } from '../models/panelPruebas.module';
import { PanelPruebasComponent } from './mantenimientos/panel-pruebas/panel-pruebas.component';
import { EquiposComponent } from './mantenimientos/equipos/equipos.component';
import { StockComponent } from './mantenimientos/stock/stock.component';
import { StocksComponent } from './mantenimientos/stocks/stocks.component';
import { PedidosComponent } from './mantenimientos/pedidos/pedidos.component';
import { SolicitudesPedidosComponent } from './mantenimientos/solicitudes-pedidos/solicitudes-pedidos.component';
import { ManualAs400Component } from './mantenimientos/manual-as400/manual-as400.component';
import { CargaOrdenesComponent } from './mantenimientos/carga-ordenes/carga-ordenes.component';
import { StockPruebasComponent } from './mantenimientos/stock-pruebas/stock-pruebas.component';
import { ManualComponent } from './mantenimientos/manual/manual.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactivosComponent } from './mantenimientos/reactivos/reactivos.component';
import { CategoriaComponent } from './mantenimientos/categoria/categoria.component';
import { EstadoComponent } from './mantenimientos/estado/estado.component';
import { UbicacionComponent } from './mantenimientos/ubicacion/ubicacion.component';
import { EquipoComponent } from './mantenimientos/equipo/equipo.component';
import { ReactivoComponent } from './mantenimientos/reactivo/reactivo.component';
import { Modalidad } from '../models/cargaModalidad.module';
import { ModalidadComponent } from './mantenimientos/modalidad/modalidad.component';
import { ParticipacionComponent } from './mantenimientos/participacion/participacion.component';
import { CotizacionComponent } from './mantenimientos/cotizacion/cotizacion.component';
import { CorreosComponent } from './mantenimientos/correos/correos.component';
import { StockManualComponent } from './mantenimientos/stock-manual/stock-manual.component';
import { StockmanoComponent } from './mantenimientos/stockmano/stockmano.component';
import { QRCODEComponent } from './mantenimientos/qrcode/qrcode.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    data: { titulo: 'Dashboard' },
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: 'usuarios' },
      },
      {
        path: 'reset-password',
        canActivate: [AdminGuard],
        component: ResetPasswordComponent,
        data: { titulo: 'reset-password' },
      },
      {
        path: 'usuario',
        canActivate: [AdminGuard],
        component: UsuarioComponent,
        data: { titulo: 'usuario' },
      },
      {
        path: 'agendamiento',
        component: AgendamientoComponent,
        data: { titulo: 'agendamiento' },
      },
      {
        path: 'agendamiento-manual',
        component: AgendamientoManualComponent,
        data: { titulo: 'agendamiento-manual' },
      },
      {
        path: 'agendados',
        component: AgendadosComponent,
        data: { titulo: 'agendados' },
      },
      {
        path: 'agendados/:id',
        component: AgendadosComponent,
        data: { titulo: 'agendados' },
      },
      { path: 'orden', component: OrdenComponent, data: { titulo: 'orden' } },
      {
        path: 'manual',
        component: ManualComponent,
        data: { titulo: 'manual' },
      },
      {
        path: 'manual/:id',
        component: ManualComponent,
        data: { titulo: 'manual' },
      },
      {
        path: 'orden/:id',
        component: OrdenComponent,
        data: { titulo: 'orden' },
      },
      {
        path: 'ordenes',
        component: OrdenesComponent,
        data: { titulo: 'ordenes' },
      },
      {
        path: 'perfil/:id',
        component: PerfilComponent,
        data: { titulo: 'perfil' },
      },
      {
        path: 'productos',
        component: ProductosComponent,
        data: { titulo: 'productos' },
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent,
        data: { titulo: 'cotizacion' },
      },

      {
        path: 'producto/:id',
        component: ProductoComponent,
        data: { titulo: 'producto' },
      },
      {
        path: 'producto',
        component: ProductoComponent,
        data: { titulo: 'producto' },
      },
      {
        path: 'muestras',
        component: MuestrasComponent,
        data: { titulo: 'muestras' },
      },
      {
        path: 'muestras-rechazo',
        component: MuestrasRechazoComponent,
        data: { titulo: 'muestras-rechazo' },
      },
      {
        path: 'correos',
        component: CorreosComponent,
        data: { titulo: 'correos' },
      },
      {
        path: 'muestras-actualización',
        component: MuestraUpdateComponent,
        data: { titulo: 'muestras-actualizar' },
      },
      {
        path: 'muestra',
        component: MuestraComponent,
        data: { titulo: 'muestra' },
      },
      {
        path: 'registro-Pacientes',
        component: ResgistroPacientesComponent,
        data: { titulo: 'registro' },
      },
      {
        path: 'reporte-produccion',
        component: ReportProduccionComponent,
        data: { titulo: 'reporte-produccion' },
      },
      {
        path: 'reporte-qc',
        component: ReportQCComponent,
        data: { titulo: 'reporte-qc' },
      },
      {
        path: 'consulta-web',
        component: ConsultaWebComponent,
        data: { titulo: 'consulta-web' },
      },
      {
        path: 'orden-manual',
        component: OrdenManualComponent,
        data: { titulo: 'orden-manual' },
      },
      {
        path: 'report-micro',
        component: EstadisticaMicroComponent,
        data: { titulo: 'report-micro' },
      },
      {
        path: 'reporte-compras',
        component: RegistroComprasComponent,
        data: { titulo: 'reporte-compras' },
      },
      {
        path: 'compras',
        component: ComprasComponent,
        data: { titulo: 'compras' },
      },
      {
        path: 'compras/:id',
        component: ComprasComponent,
        data: { titulo: 'compras' },
      },
      {
        path: 'consulta-compras',
        component: ConsultaComprasComponent,
        data: { titulo: 'consulta-compras' },
      },
      {
        path: 'pedido-importacion',
        component: ImportacionComponent,
        data: { titulo: 'pedido-importacion' },
      },
      {
        path: 'pedido-importacion/:id',
        component: ImportacionComponent,
        data: { titulo: 'pedido-importacion' },
      },
      {
        path: 'pedidos',
        component: ImportadosComponent,
        data: { titulo: 'pedidos' },
      },
      {
        path: 'lista-productos',
        component: ListaproductosComponent,
        data: { titulo: 'lista-productos' },
      },
      {
        path: 'total-pedidos',
        component: TotalPedidosComponent,
        data: { titulo: 'total-pedidos' },
      },
      {
        path: 'impresora',
        component: ImpresoraComponent,
        data: { titulo: 'impresora' },
      },
      {
        path: 'marca',
        component: MarcaComponent,
        data: { titulo: 'marca' },
      },
      {
        path: 'cliente',
        component: ClienteComponent,
        data: { titulo: 'cliente' },
      },
      {
        path: 'panelPruebas',
        component: PanelPruebasComponent,
        data: { titulo: 'panelPruebas' },
      },
      {
        path: 'equipo',
        component: EquipoComponent,
        data: { titulo: 'equipo' },
      },
      {
        path: 'equipos',
        component: EquiposComponent,
        data: { titulo: 'equipos' },
      },

      {
        path: 'stock',
        component: StockComponent,
        data: { titulo: 'stock' },
      },
      {
        path: 'stocks',
        component: StocksComponent,
        data: { titulo: 'stocks' },
      },
      {
        path: 'stock-manual',
        component: StockManualComponent,
        data: { titulo: 'stock-manual' },
      },
      {
        path: 'solicitud-pedidos',
        component: PedidosComponent,
        data: { titulo: 'solicitud-pedidos' },
      },
      {
        path: 'solicitud-pedidos/:id',
        component: PedidosComponent,
        data: { titulo: 'solicitud-pedidos' },
      },
      {
        path: 'solicitudes-pedidos',
        component: SolicitudesPedidosComponent,
        data: { titulo: 'solicitudes-pedidos' },
      },
      {
        path: 'carga-ordenes',
        component: CargaOrdenesComponent,
        data: { titulo: 'carga-ordenes' },
      },
      {
        path: 'stock-pruebas',
        component: StockPruebasComponent,
        data: { titulo: 'stock-pruebas' },
      },
      {
        path: 'reactivos',
        component: ReactivosComponent,
        data: { titulo: 'reactivos' },
      },
      {
        path: 'reactivo',
        component: ReactivoComponent,
        data: { titulo: 'reactivo' },
      },
      {
        path: 'reactivos/:id',
        component: ReactivosComponent,
        data: { titulo: 'reactivos' },
      },
      {
        path: 'categoria',
        component: CategoriaComponent,
        data: { titulo: 'categoria' },
      },
      {
        path: 'modalidad',
        component: ModalidadComponent,
        data: { titulo: 'modalidad' },
      },
      {
        path: 'contrato',
        component: ParticipacionComponent,
        data: { titulo: 'contrato' },
      },
      {
        path: 'estado',
        component: EstadoComponent,
        data: { titulo: 'estado' },
      },
      {
        path: 'ubicacion',
        component: UbicacionComponent,
        data: { titulo: 'ubicacion' },
      },

      {
        path: 'validacion',
        component: StockmanoComponent,
        data: { titulo: 'validacion' },
      },
      {
        path: 'QRCode',
        component: QRCODEComponent,
        data: { titulo: 'QRCode' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
