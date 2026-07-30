import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Inyectamos la variable que nos dirá en dónde se está ejecutando el código
  const platformId = inject(PLATFORM_ID);

  // REGLA DE SSR: Si NO estamos en el navegador (es decir, estamos en NodeJS),
  // dejamos pasar temporalmente para no crashear el servidor.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Si llegamos hasta aquí, es porque YA estamos en el navegador real de Chrome/Edge.
  // Ahora sí buscamos de forma segura el pasaporte en la caja fuerte.
  const token = localStorage.getItem('auth_token');

  if (token) {
    // Si tiene pasaporte, la puerta se abre (true)
    return true;
  } else {
    // Si NO tiene pasaporte, lo pateamos a la pantalla de login (false)
    router.navigate(['/login']);
    return false;
  }
};