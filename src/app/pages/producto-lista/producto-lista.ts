import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar'; // Ajusta la ruta a tu Navbar
import { ProductoFormComponent } from '../producto-form/producto-form';
import { ProductoDTO } from '../../models/producto/producto';
import { InventarioService } from '../../services/inventario';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NavbarComponent
  ],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css'
})
export class ProductosLista implements OnInit {
  productos: ProductoDTO[] = [];
  columnasExhibidas: string[] = ['id', 'nombre', 'categoria', 'precioVenta', 'stockActual', 'unidadesVendidas', 'estado', 'acciones'];

  constructor(
    private dialog: MatDialog, 
    private inventarioService: InventarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario() {
    this.inventarioService.obtenerProductos().subscribe({
      next: (data: ProductoDTO[]) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar inventario:', err)
    });
  }

  abrirFormulario(productoExistente: ProductoDTO | null = null) {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '550px',
      disableClose: true,
      data: { producto: productoExistente }
    });

    dialogRef.afterClosed().subscribe((productoFormulario: ProductoDTO) => {
      if (productoFormulario) {
        if (productoExistente && productoExistente.id) {
          this.inventarioService.actualizarProducto(productoExistente.id, productoFormulario).subscribe({
            next: () => this.cargarInventario(),
            error: (err) => console.error('Error al actualizar:', err)
          });
        } else {
          this.inventarioService.crearProducto(productoFormulario).subscribe({
            next: () => this.cargarInventario(),
            error: (err) => console.error('Error al registrar:', err)
          });
        }
      }
    });
  }
  // Método para reactivar un producto inactivo
  reactivarProducto(producto: ProductoDTO) {
    if (!producto.id) return;

    const productoActualizado: ProductoDTO = {
      ...producto,
      estado: 'ACTIVO'
    };

    this.inventarioService.actualizarProducto(producto.id, productoActualizado).subscribe({
      next: () => this.cargarInventario(),
      error: (err: any) => console.error('Error al reactivar producto:', err)
    });
  }


  eliminarProducto(producto: ProductoDTO) {
    if (!producto.id) return;

    if (confirm(`¿Deseas dar de baja el producto "${producto.nombre}"?`)) {
      this.inventarioService.desactivarProducto(producto.id).subscribe({
        next: () => this.cargarInventario(),
        error: (err) => console.error('Error al desactivar:', err)
      });
    }
  }

  // Método opcional para alternar entre Activo e Inactivo directamente
  toggleEstado(producto: ProductoDTO) {
    if (producto.estado === 'INACTIVO') {
      this.reactivarProducto(producto);
    } else {
      this.eliminarProducto(producto); // Desactiva
    }
  }
}