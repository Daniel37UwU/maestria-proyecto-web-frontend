// Define los estados permitidos (Igual al Enum de Java)
export type EstadoProducto = 'ACTIVO' | 'INACTIVO' | 'DISCONTINUADO';

// Define la estructura del producto (Igual al ProductoDTO de Java)
export interface ProductoDTO {
  id?: number;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  categoria: string;
  precioVenta: number;
  costoAdquisicion: number;
  unidadesVendidas: number;
  estado?: EstadoProducto;
}