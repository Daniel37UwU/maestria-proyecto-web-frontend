import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductoDTO } from '../../models/producto/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css'
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: ProductoDTO | null }
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: [this.data.producto?.nombre || '', [Validators.required]],
      categoria: [this.data.producto?.categoria || '', [Validators.required]],
      precioVenta: [this.data.producto?.precioVenta || 0, [Validators.required, Validators.min(0)]],
      costoAdquisicion: [this.data.producto?.costoAdquisicion || 0, [Validators.required, Validators.min(0)]],
      stockActual: [this.data.producto?.stockActual || 0, [Validators.required, Validators.min(0)]],
      stockMinimo: [this.data.producto?.stockMinimo || 0, [Validators.required, Validators.min(0)]],
      unidadesVendidas: [this.data.producto?.unidadesVendidas || 0, [Validators.required, Validators.min(0)]]
    });
  }

  guardar() {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    }
  }
}