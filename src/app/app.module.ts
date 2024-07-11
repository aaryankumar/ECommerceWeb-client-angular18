import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {HttpClientModule} from '@angular/common/http'; it is deprecated
import { provideHttpClient } from '@angular/common/http'; //use this instead of importing HttpClientModule

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  // exports: [DemoAngularMaterialModule],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  //use this provideHttpClient() instead of HttpClientModule otherwise it will
  // give error -  NullInjectorError: NullInjectorError: No provider for _HttpClient
  bootstrap: [AppComponent],
})
export class AppModule {}
