import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

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
/* import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';

import { ModalComponent } from './components/modal/modal.component';

const config: SocketIoConfig = { url: environment.url, options: {} }; */

@NgModule({
  declarations: [
    AppComponent,
    FiltroPipe,
    FiltroUsuarioPipe,
    UppercaseDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    AppRoutingModule,
    AuthModule,
    PagesRoutingModule,
    PagesModule,
    MatSliderModule,
    NgxPaginationModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
