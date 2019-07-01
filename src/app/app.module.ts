import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    AkitaNgRouterStoreModule.forRoot(),
    environment.production ?
      [] :
      [
        AkitaNgDevtools.forRoot()
      ],
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
