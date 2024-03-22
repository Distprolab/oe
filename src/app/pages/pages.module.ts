import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { OrdenComponent } from './mantenimientos/orden/orden.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesComponent } from './mantenimientos/ordenes/ordenes.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { MuestrasComponent } from './mantenimientos/muestras/muestras.component';

import { ProductoComponent } from './mantenimientos/producto/producto.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ComponentsModule } from '../components/components.module';
import { MuestraComponent } from './mantenimientos/muestra/muestra.component';
import { MuestrasRechazoComponent } from './mantenimientos/muestras-rechazo/muestras-rechazo.component';
import { BuscarHisComponent } from './mantenimientos/buscar-his/buscar-his.component';
import { UppercaseDirective } from './uppercase.directive';
import { MuestraUpdateComponent } from './mantenimientos/muestra-update/muestra-update.component';
import { ResgistroPacientesComponent } from './mantenimientos/resgistro-pacientes/resgistro-pacientes.component';
import { ReportProduccionComponent } from './mantenimientos/report-produccion/report-produccion.component';
import { ReportQCComponent } from './mantenimientos/report-qc/report-qc.component';
import { AgendamientoComponent } from './mantenimientos/agendamiento/agendamiento.component';
import { ConsultaWebComponent } from './mantenimientos/consulta-web/consulta-web.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from 'src/environments/environment.prod';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AgendadosComponent } from './mantenimientos/agendados/agendados.component';
import { AgendamientoManualComponent } from './mantenimientos/agendamiento-manual/agendamiento-manual.component';
import { OrdenManualComponent } from './mantenimientos/orden-manual/orden-manual.component';
import { EstadisticaMicroComponent } from './mantenimientos/estadistica-micro/estadistica-micro.component';
import { ComprasComponent } from './mantenimientos/compras/compras.component';
const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    OrdenComponent,
    OrdenManualComponent,
    OrdenesComponent,
    UsuarioComponent,
    UsuariosComponent,
    PerfilComponent,
    MuestrasComponent,
    ProductosComponent,
    ProductoComponent,
    MuestraComponent,
    MuestrasRechazoComponent,
    BuscarHisComponent,
    UppercaseDirective,
    MuestraUpdateComponent,
    ResgistroPacientesComponent,
    ReportProduccionComponent,
    ReportQCComponent,
    AgendamientoComponent,
    ConsultaWebComponent,
    AgendadosComponent,
    AgendamientoManualComponent,
    EstadisticaMicroComponent,
    ComprasComponent,
  ],

  exports: [
    DashboardComponent,
    PagesComponent,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  imports: [
    FormsModule,
    ComponentsModule,

    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    MatToolbarModule,
    MatSliderModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FullCalendarModule,
    SocketIoModule.forRoot(config),
  ],
})
export class PagesModule {}
