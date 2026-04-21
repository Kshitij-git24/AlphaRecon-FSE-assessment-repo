import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/pages/user-management-page/user-management-page.component').then(
        (m) => m.UserManagementPageComponent
      )
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
