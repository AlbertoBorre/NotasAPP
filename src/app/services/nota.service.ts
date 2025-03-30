import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nota } from '../models/nota.model';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ServicioNotas {
  private notas: Nota[] = [];
  private flujoNotas = new BehaviorSubject<Nota[]>([]);
  
  constructor(private storage: Storage) {
    this.inicializar();
  }
  
  async inicializar() {
    await this.storage.create();
    this.cargarNotas();
  }
  
  async cargarNotas() {
    const notasGuardadas = await this.storage.get('notas');
    if (notasGuardadas) {
      this.notas = notasGuardadas;
      this.flujoNotas.next([...this.notas]);
    }
  }
  
  obtenerNotas(): Observable<Nota[]> {
    return this.flujoNotas.asObservable();
  }
  
  obtenerNotaPorId(id: string): Nota | undefined {
    return this.notas.find(nota => nota.id === id);
  }
  
  async agregarNota(nota: Omit<Nota, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Promise<Nota> {
    const nuevaNota: Nota = {
      ...nota,
      id: uuidv4(),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.notas.unshift(nuevaNota);
    this.flujoNotas.next([...this.notas]);
    await this.guardarNotasEnStorage();
    
    return nuevaNota;
  }
  
  async actualizarNota(id: string, datosNota: Partial<Nota>): Promise<Nota | null> {
    const indice = this.notas.findIndex(nota => nota.id === id);
    if (indice === -1) {
      return null;
    }
    
    const notaActualizada: Nota = {
      ...this.notas[indice],
      ...datosNota,
      fechaActualizacion: new Date()
    };
    
    this.notas[indice] = notaActualizada;
    this.flujoNotas.next([...this.notas]);
    await this.guardarNotasEnStorage();
    
    return notaActualizada;
  }
  
  async eliminarNota(id: string): Promise<boolean> {
    const longitudInicial = this.notas.length;
    this.notas = this.notas.filter(nota => nota.id !== id);
    
    if (longitudInicial !== this.notas.length) {
      this.flujoNotas.next([...this.notas]);
      await this.guardarNotasEnStorage();
      return true;
    }
    
    return false;
  }
  
  private async guardarNotasEnStorage() {
    await this.storage.set('notas', this.notas);
  }
}
