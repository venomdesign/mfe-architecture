import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      loadRemoteModule('mfe-dashboard', './Component').then(m => m.AppComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      loadRemoteModule('mfe-settings', './Component').then(m => m.AppComponent)
  }
];
