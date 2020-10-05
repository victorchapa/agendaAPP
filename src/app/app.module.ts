import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { ExtraFuncComponent } from './extra-func/extra-func.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationService } from './services/user-registration-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UsersComponent,
    AboutComponent,
    ExtraFuncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    UserRegistrationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
