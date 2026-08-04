import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Añadido para menús dinámicos
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  irAlProyecto() {
    console.log('Navegando al dashboard de InvenMax...');
    this.router.navigate(['/dashboard-invmax']);
  }

  irAlProducto() {
    console.log('Navegando a la gestión de productos...');
    this.router.navigate(['/productos']);
  }

  irAlAsistente() {
    this.router.navigate(['/dashboard']);
  }

  cerrarSesion() {
    localStorage.removeItem('auth_token'); 
    console.log('Sesión cerrada correctamente y token eliminado.');
    this.router.navigate(['/login']);
  }
}