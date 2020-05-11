import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Dashboard'} },
  {path: 'progress', component: ProgressComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Progress'}},
  {path: 'graficas1', component: Graficas1Component, canActivate: [VerificaTokenGuard], data: {titulo: 'Graficas'}},
  {path: 'promesas', component: PromesasComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Promesas'}},
  {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
  {path: 'account-settings', component: AccountSettingsComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Ajustes'}},
  {path: 'profile', component: ProfileComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Perfil de usuario'}},
  {path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Buscador'}},

  // Administracion
  {
    path: 'usuarios',
    canActivate: [AdminGuard, VerificaTokenGuard],
    component: UsuariosComponent,
    data: {titulo: 'Administracion de Usuarios'}
  },
  {path: 'hospitales', component: HospitalesComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Administracion de Hospitales'}},
  {path: 'medicos', component: MedicosComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Administracion de Medicos'}},
  {path: 'medico/:id', component: MedicoComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Actualizar Medico'}},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
