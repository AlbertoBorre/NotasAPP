import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/lista-notas/lista-notas.module').then(m => m.ListaNotasPageModule)
  },
  {
    path: 'nota/:id',
    loadChildren: () => import('./pages/detalles-nota/detalles-nota.module').then(m => m.detallesNotaPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
