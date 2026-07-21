import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    CommonModule
  ], // Importamos los componentes visuales necesarios
  templateUrl: './dashboard.html', // o './dashboard.component.html'
  styleUrl: './dashboard.css'      // o './dashboard.component.css'
})
export class Dashboard implements OnInit {
  inventario: any[] = []; // Arreglo para almacenar los productos recibidos del backend

  // Inyectamos el router para poder cambiar de pantalla
  constructor(private router: Router, private http: HttpClient) {}

  cerrarSesion(): void {
    console.log('Cerrar sesión'); // Mensaje de depuración en la consola
    // Te regresa de forma segura a la pantalla de Login
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
// Consumimos el endpoint real de tus productos de InvenMax
    this.http.get<any[]>('http://localhost:8080/api/v1/productos')
      .subscribe({
        next: (data) => {
          this.inventario = data;
        },
        error: (err) => {
          console.error('Error al conectar con el backend:', err);
        }
    });
  }
}