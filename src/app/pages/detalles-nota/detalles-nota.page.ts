import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ServicioNotas } from '../../services/nota.service';

@Component({
  selector: 'app-detalles-nota',
  templateUrl: './detalles-nota.page.html',
  styleUrls: ['./detalles-nota.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule]
})
export class PaginaDetalleNota implements OnInit {
  formularioNota: FormGroup;
  idNota: string | null = null;
  esNuevaNota = false;
  opcionesColores = [
    '#FF5733',
    '#FFB733',
    '#FFFF33',
    '#33FF57',
    '#33FFEC',
    '#3357FF',
    '#B033FF',
    '#FF33F5',
    '#F5F5F5'
  ];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioNotas: ServicioNotas,
    private toastController: ToastController
  ) {
    this.formularioNota = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', Validators.maxLength(1000)],
      color: ['#F5F5F5'],
      isImportante: [false]
    });
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idNota = params.get('id');
      this.esNuevaNota = this.idNota === 'nueva';
      
      if (!this.esNuevaNota && this.idNota) {
        this.cargarNota(this.idNota);
      }
    });
  }
  
  cargarNota(id: string) {
    const nota = this.servicioNotas.obtenerNotaPorId(id);
    if (nota) {
      this.formularioNota.patchValue({
        titulo: nota.titulo,
        descripcion: nota.descripcion,
        color: nota.color,
        isImportante: nota.isImportante
      });
    } else {
      this.mostrarMensaje('Nota no encontrada.');
      this.router.navigate(['/']);
    }
  }
  
  async guardarNota() {
    if (this.formularioNota.invalid) {
      this.mostrarMensaje('Por favor, completa todos los campos requeridos.');
      return;
    }
    const datosNota = this.formularioNota.value;
    
    try {
      if (this.esNuevaNota) {
        await this.servicioNotas.agregarNota(datosNota);
        this.mostrarMensaje('Nota creada con éxito.');
      } else if (this.idNota) {
        await this.servicioNotas.actualizarNota(this.idNota, datosNota);
        this.mostrarMensaje('Nota actualizada con éxito.');
      }
      this.router.navigate(['/']);
    } catch (error) {
      this.mostrarMensaje('Error al guardar la nota.');
      console.error(error);
    }
  }
  
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  seleccionarColor(color: string) {
    this.formularioNota.patchValue({ color });
  }
}
