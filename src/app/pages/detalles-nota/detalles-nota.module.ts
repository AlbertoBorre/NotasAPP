import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { PaginaDetalleNota } from './detalles-nota.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaDetalleNota
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PaginaDetalleNota
  ],
})
export class detallesNotaPageModule {}
