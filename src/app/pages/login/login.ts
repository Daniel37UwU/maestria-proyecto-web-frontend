import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; // Para navegar mediante código
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.html', // (o './login.component.html')
  styleUrl: './login.css'      // (o './login.component.css')
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  password = '';

  hacerLogin() {
    // Empaquetamos las credenciales que el usuario escribió
    const credenciales = {
      email: this.email,
      password: this.password
    };

    // Llamamos a la API enviando el paquete
    this.http.post<any>('https://maestria-proyecto-web-backend-production.up.railway.app/api/v1/auth/login', credenciales).subscribe({
      next: (respuesta) => {
        // Guardamos el token en la memoria del navegador (Caja Fuerte)
        localStorage.setItem('auth_token', respuesta.token);
        // Lo mandamos al dashboard
        this.router.navigate(['/dashboard-invmax']);
      },
      error: (err) => {
        alert("Error al iniciar sesión: Revisa tus credenciales.");
      }
    });
  }
}