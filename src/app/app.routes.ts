import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { iaReporte } from './pages/ia-reporte/ia-reporte';
import { DashboardInvmax } from './pages/dashboard-invmax/dashboard-invmax';
import { ProductosLista } from './pages/producto-lista/producto-lista';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'}, //Ruta por defecto, redirige a la pagina de login
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]}, //Protegemos la ruta del dashboard con el authGuard
    {path: 'dashboard-invmax', component: DashboardInvmax, canActivate: [authGuard]}, //Protegemos la ruta del dashboard-invmax con el authGuard,
    {path: 'ia-reporte', component: iaReporte, canActivate: [authGuard]}, //Protegemos la ruta del ia-reporte con el authGuard
    {path: 'productos', component: ProductosLista, canActivate: [authGuard]} //Protegemos la ruta del productos con el authGuard
];
