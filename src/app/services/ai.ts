import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // <-- Esto le dice a Angular que el servicio está disponible en toda la app
})
export class AiService {
  // URL de nuestro Backend en Java
  private apiUrl = 'http://localhost:8080/api/v1/ia/consulta';

  constructor(private http: HttpClient) {}

  // Método para enviar la consulta al backend y obtener la respuesta
  consultarInteligenciaArtificial(pregunta: string): Observable<any> {
    // Creamos el objeto JSON
    const body = { pregunta: pregunta };

    // Enviamos la pregunta como parámetro de consulta (RequestParam)
    return this.http.post<any>(this.apiUrl, body);
  }
}