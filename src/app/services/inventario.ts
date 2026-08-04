import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDTO } from '../models/producto/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  // Apunta a la URL donde corre tu Spring Boot
  private apiUrl = `${environment.apiUrl}/api/v1/productos`;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(this.apiUrl);
  }

  crearProducto(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.post<ProductoDTO>(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.put<ProductoDTO>(`${this.apiUrl}/${id}`, producto);
  }

  desactivarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}