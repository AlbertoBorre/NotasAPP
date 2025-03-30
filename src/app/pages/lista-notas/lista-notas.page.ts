import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Nota } from '../../models/nota.model';
import { ServicioNotas } from '../../services/nota.service';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.page.html',
  styleUrls: ['./lista-notas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class PaginaListaNotas implements OnInit {
  notas: Nota[] = [];
  
  constructor(
    private servicioNotas: ServicioNotas,
    private alertController: AlertController,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.servicioNotas.obtenerNotas().subscribe(notas => {
      this.notas = notas;
    });
  }
  
  agregarNuevaNota() {
    this.router.navigate(['/nota', 'nueva']);
  }
  
  editarNota(id: string) {
    this.router.navigate(['/nota', id]);
  }
  
  async confirmarEliminarNota(id: string, event: Event) {
    event.stopPropagation();
    
    const alerta = await this.alertController.create({
      header: '¿Eliminar nota?',
      message: '¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarNota(id);
          }
        }
      ]
    });
    
    await alerta.present();
  }
  
  async eliminarNota(id: string) {
    await this.servicioNotas.eliminarNota(id);
  }
  
  async cambiarImportancia(nota: Nota, event: Event) {
    event.stopPropagation();
    await this.servicioNotas.actualizarNota(nota.id, { isImportante: !nota.isImportante });
  }
}
