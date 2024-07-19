import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthRoutingModule } from './auth/auth.routing';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { PagesRoutingModule } from './pages/pages.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app.routing';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroUsuarioPipe } from './pipes/filtro-usuario.pipe';

import { UppercaseDirective } from './uppercase.directive';
import 'moment-timezone';
import { FilterPipe } from './pipes/filter.pipe';
import { filter } from 'rxjs';
import { DisabledIfDirective } from './directiva/disabled-if.directive';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

/* import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';

import { ModalComponent } from './components/modal/modal.component';

const config: SocketIoConfig = { url: environment.url, options: {} }; */
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    FiltroPipe,
    FiltroUsuarioPipe,
    UppercaseDirective,
    //DisabledIfDirective,
    FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    AppRoutingModule,
    AuthModule,
    PagesRoutingModule,
    PagesModule,
    //MatSliderModule,
    NgxPaginationModule,
    DisabledIfDirective,
    NgxScannerQrcodeModule
    
   
    // SocketIoModule.forRoot(config)
  ],
 
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
