import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AuthService } from './services/auth.service';
import { GithubService } from './services/github.service';
import { ProgressService } from './services/progress.service';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { GithubBrowserComponent } from './components/github-browser/github-browser.component';
import { FormsModule } from '@angular/forms';

import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  declarations: [
    AppComponent,
    GithubBrowserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppMaterialModule
  ],
  providers: [AuthService, GithubService, ProgressService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
