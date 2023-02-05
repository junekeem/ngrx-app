import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from "./customers/customers.module";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
