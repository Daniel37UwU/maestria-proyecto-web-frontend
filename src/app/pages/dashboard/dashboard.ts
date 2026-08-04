import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AiService } from '../../services/ai';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    NavbarComponent
  ], // Importamos los componentes visuales necesarios
  templateUrl: './dashboard.html', // o './dashboard.component.html'
  styleUrl: './dashboard.css'      // o './dashboard.component.css'
})
export class Dashboard {
  textoUsuario: string = '';
  respuestaIA: string = '';
  cargando: boolean = false;

  constructor(private aiService: AiService, private cdr: ChangeDetectorRef, private router: Router) {}

  irAlProyecto() {
    console.log('Navegando al dashboard de InvenMax...');
    this.router.navigate(['/dashboard-invmax']); // Fuerza el cambio de pantalla
  }
  
  cerrarSesion() {
  // 🧼 1. Borramos físicamente el token de la memoria del navegador
    localStorage.removeItem('auth_token'); 

    // 📝 2. Dejamos el registro en la consola
    console.log('Sesión cerrada correctamente y token eliminado.');

    // 🚪 3. Redirigimos al usuario a la pantalla de login 
    this.router.navigate(['/login']);
  }
  
  enviarPregunta() {
    if(!this.textoUsuario.trim()) {
      return; // No enviar si el campo está vacío
    }
    this.cargando = true; // Mostrar indicador de carga
    this.respuestaIA = ''; // Limpiar la respuesta anterior
    
    this.aiService.consultarInteligenciaArtificial(this.textoUsuario).subscribe({
      next: (res) => {
        console.log("NEXT ejecutando...")
        this.respuestaIA = res.respuesta;
        this.cargando = false;

        this.cdr.detectChanges(); // Forzar la detección de cambios para actualizar la vista
        
        console.log("cargando =", this.cargando);
        console.log("respuestaIA =", this.respuestaIA);
      },
      error: (err) => {
        console.error('Error al consultar la IA:', err);
        this.respuestaIA = 'Ocurrió un error al procesar tu solicitud con el cerebro.';
        this.cargando = false;
      },
      complete: () => {
        console.log("COMPLETE")
      }
    });
  }
}