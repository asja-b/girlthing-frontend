import { Routes } from '@angular/router';
import { LoginForm } from './task-manager/login-form/login-form';
import { Dashboard } from './task-manager/dashboard/dashboard';
import { TaskCardList } from './task-manager/task-card-list/task-card-list';
import { AdminPanel } from './task-manager/admin-panel/admin-panel';
import { UserTable } from './task-manager/user-table/user-table';
import { TaskTable } from './task-manager/task-table/task-table';
import { UserForm } from './task-manager/user-form/user-form';
import { TaskForm } from './task-manager/task-form/task-form';
import { authGuard } from './task-manager/auth-guard';
import { adminGuard } from './task-manager/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginForm },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'tasks', component: TaskCardList, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminPanel,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserTable },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'tasks', component: TaskTable },
      { path: 'tasks/new', component: TaskForm },
      { path: 'tasks/:id/edit', component: TaskForm },
    ]
  },
  { path: '**', redirectTo: 'dashboard' },
];