import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
import { AiService} from '../../services/ai';

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
  templateUrl: './ia-reporte.html', // Verifica que coincida con el nombre de tu archivo html
  styleUrls: ['./ia-reporte.css']     // Verifica que coincida con tu archivo css
})
export class iaReporte implements OnInit {
  reporteMarkdown: string = '';
  cargandoReporte: boolean = false;
  errorReporte: string | null = null;

  constructor(private AiService: AiService) {}

  ngOnInit(): void {
    this.cargarAnalisisIA();
  }

  cargarAnalisisIA(): void {
    this.cargandoReporte = true;
    this.errorReporte = null;

    this.AiService.obtenerReporteOperativo().subscribe({
      next: (data) => {
        // Almacenamos el texto plano del reporte predictivo
        this.reporteMarkdown = data.reporte;
        this.cargandoReporte = false;
      },
      error: (err) => {
        console.error('Error al conectar con InvenMax IA:', err);
        this.errorReporte = 'No se pudo generar el reporte predictivo en este momento. Verifique la conexión con el servidor.';
        this.cargandoReporte = false;
      }
    });
  }
}