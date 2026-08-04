import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root' // <-- Esto le dice a Angular que el servicio está disponible en toda la app
})
export class AiService {
  // URL de nuestro Backend en Java
  private apiUrl = `${environment.apiUrl}/api/v1/ia/consulta`;

  constructor(private http: HttpClient) {}

  // Consume el nuevo reporte predictivo basado en los datos de MySQL
  obtenerReporteOperativo(): Observable<{ reporte: string }> {
    return this.http.get<{ reporte: string }>(`${this.apiUrl}/reporte-operativo`);
  }

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
  obtenerReporteOperativo() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiUrl}/api/v1/ia/clasificar-producto`;

  constructor(private http: HttpClient) {}

  clasificarProducto(descripcion: string): Observable<any> {
    // Creamos el objeto JSON con la descripción del producto
    const body = { descripcion: descripcion };
    
    // Enviamos el body limpio al endpoint de tu proyecto
    return this.http.post<any>(this.apiUrl, body);
  }
}