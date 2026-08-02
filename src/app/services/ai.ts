import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // <-- Esto le dice a Angular que el servicio está disponible en toda la app
})
export class AiService {
  // URL de nuestro Backend en Java
  private apiUrl = 'https://maestria-proyecto-web-backend-production.up.railway.app/api/v1/ia/consulta';

  constructor(private http: HttpClient) {}

  // Método para enviar la consulta al backend y obtener la respuesta
  consultarInteligenciaArtificial(pregunta: string): Observable<any> {
    // Creamos el objeto JSON
    const body = { pregunta: pregunta };

    // Enviamos la pregunta como parámetro de consulta (RequestParam)
    return this.http.post<any>(this.apiUrl, body);
  }
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'https://maestria-proyecto-web-backend-production.up.railway.app/api/v1/ia/clasificar-producto'; 

  constructor(private http: HttpClient) {}

  clasificarProducto(descripcion: string): Observable<any> {
    // Creamos el objeto JSON con la descripción del producto
    const body = { descripcion: descripcion };
    
    // Enviamos el body limpio al endpoint de tu proyecto
    return this.http.post<any>(this.apiUrl, body);
  }
}