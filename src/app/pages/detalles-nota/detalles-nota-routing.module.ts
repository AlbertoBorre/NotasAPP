import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaDetalleNota } from './detalles-nota.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaDetalleNota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaDetalleNotaRoutingModule {}
