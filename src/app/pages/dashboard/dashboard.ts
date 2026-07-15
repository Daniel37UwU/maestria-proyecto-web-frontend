import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule
  ], // Importamos los componentes visuales necesarios
  templateUrl: './dashboard.html', // o './dashboard.component.html'
  styleUrl: './dashboard.css'      // o './dashboard.component.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  cerrarSesion() {
    // Te regresa de forma segura a la pantalla de Login
    this.router.navigate(['/login']);
  }
}