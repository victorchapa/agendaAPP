import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { AboutComponent } from "./about/about.component";
import { ExtraFuncComponent } from "./extra-func/extra-func.component";

const routes: Routes = [
  {
       path: '',
       component: AppComponent,
  },
  {
       path: 'users',
       component: UsersComponent 
  },
  {
       path: 'extra-func',
       component: ExtraFuncComponent
  },
  {
       path: 'about',
       component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
