import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DashboardInvmax } from './pages/dashboard-invmax/dashboard-invmax';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'}, //Ruta por defecto, redirige a la pagina de login
    {path: 'login', component: Login},
    {path: 'dashboard', component: Dashboard},
    {path: 'dashboard-invmax', component: DashboardInvmax},
];
