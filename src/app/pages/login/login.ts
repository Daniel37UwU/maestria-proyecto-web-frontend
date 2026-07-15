import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; // Para navegar mediante código

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule], // Importar Componentes de Material
  templateUrl: './login.html', // (o './login.component.html')
  styleUrl: './login.css'      // (o './login.component.css')
})
export class Login {
  // Inyectamos el router para poder cambiar de pantalla
  constructor(private router: Router) {}

  ingresarSistema() {
    // Redirige al dashboard de InvenMax IA al dar clic en ingresar
    this.router.navigate(['/dashboard']);
  }
}