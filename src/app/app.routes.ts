import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DashboardInvmax } from './pages/dashboard-invmax/dashboard-invmax';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'}, //Ruta por defecto, redirige a la pagina de login
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]}, //Protegemos la ruta del dashboard con el authGuard
    {path: 'dashboard-invmax', component: DashboardInvmax, canActivate: [authGuard]} //Protegemos la ruta del dashboard-invmax con el authGuard,
];
