import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HomePageModule } from './components/home/home.module';
import { DialogModule } from './components/dialog/dialog.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HomePageModule,
    DialogModule
  ],
  providers: [{ 
    provide: {
      RouteReuseStrategy,
      HttpClient,
    },
    useClass: IonicRouteStrategy,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
