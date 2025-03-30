import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaListaNotas } from './lista-notas.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaListaNotas
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaListaNotasRoutingModule {}
