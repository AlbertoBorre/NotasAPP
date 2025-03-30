import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { PaginaListaNotas } from './lista-notas.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaListaNotas
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PaginaListaNotas
  ],
})
export class ListaNotasPageModule {}
