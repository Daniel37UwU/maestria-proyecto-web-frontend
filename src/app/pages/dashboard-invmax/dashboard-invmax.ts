import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InventarioService } from '../../services/ai';
@Component({
  selector: 'app-dashboard-invmax',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './dashboard-invmax.html', // Verifica que coincida con el nombre de tu archivo html
  styleUrl: './dashboard-invmax.css'     // Verifica que coincida con tu archivo css
})
export class DashboardInvmax {
  descripcionProducto: string = '';
  resultadoAnalisis: string = '';
  procesando: boolean = false;

  constructor(private inventarioService: InventarioService, private cdr: ChangeDetectorRef) {}

  procesarProducto() {
    if (!this.descripcionProducto.trim()) return;

    this.procesando = true;
    this.resultadoAnalisis = '';

    this.inventarioService.clasificarProducto(this.descripcionProducto).subscribe({
      next: (res) => {
        this.resultadoAnalisis = res.analisis; 
        this.procesando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la integración con InvenMax IA:', err);
        this.resultadoAnalisis = 'Error de conexión: El servidor central de InvenMax no responde. Verifica que tu backend en Spring Boot esté corriendo.';
        this.procesando = false;
        this.cdr.detectChanges();
      }
    });
  }
}