import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../navbar/navbar';
import { ProductoDTO } from '../../models/producto/producto';
import { InventarioService } from '../../services/inventario';
import { AiService } from '../../services/ai';

@Component({
  selector: 'app-dashboard-invmax',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NavbarComponent
  ],
  templateUrl: './dashboard-invmax.html',
  styleUrl: './dashboard-invmax.css'
})
export class DashboardInvmax implements OnInit {
  // Datos de Productos
  productosCriticos: ProductoDTO[] = [];
  columnasTabla: string[] = ['id', 'nombre', 'categoria', 'stock', 'sugerido', 'costoEstimado'];

  // Métricas KPI
  totalAgotados: number = 0;
  totalCriticos: number = 0;
  presupuestoReabastecimiento: number = 0;

  // Estado de InvenMax IA
  reporteMarkdown: string = '';
  cargandoReporte: boolean = false;
  errorReporte: string | null = null;

  constructor(
    private inventarioService: InventarioService,
    private aiService: AiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMetricas();
    this.cargarAnalisisIA();
  }

  // Carga de inventario
  cargarMetricas(): void {
    this.inventarioService.obtenerProductos().subscribe({
      next: (productos: ProductoDTO[]) => {
        this.productosCriticos = productos.filter(
          p => p.estado === 'ACTIVO' && p.stockActual <= p.stockMinimo
        );

        this.totalAgotados = productos.filter(p => p.estado === 'ACTIVO' && p.stockActual === 0).length;
        this.totalCriticos = this.productosCriticos.length;

        this.presupuestoReabastecimiento = this.productosCriticos.reduce((sum, p) => {
          const unidadesSugeridas = (p.stockMinimo * 2) - p.stockActual;
          return sum + (unidadesSugeridas * p.costoAdquisicion);
        }, 0);

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar datos del inventario:', err)
    });
  }

  // Carga del reporte de Spring AI / Llama 3
  cargarAnalisisIA(): void {
    this.cargandoReporte = true;
    this.errorReporte = null;

    this.aiService.obtenerReporteOperativo().subscribe({
      next: (data) => {
        this.reporteMarkdown = data.reporte;
        this.cargandoReporte = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al conectar con InvenMax IA:', err);
        this.errorReporte = 'No se pudo generar el reporte predictivo en este momento. Verifique la conexión con el servidor.';
        this.cargandoReporte = false;
        this.cdr.detectChanges();
      }
    });
  }

  calcularSugerido(p: ProductoDTO): number {
    const sugerido = (p.stockMinimo * 2) - p.stockActual;
    return sugerido > 0 ? sugerido : 0;
  }

  calcularCostoRestock(p: ProductoDTO): number {
    return this.calcularSugerido(p) * p.costoAdquisicion;
  }
}