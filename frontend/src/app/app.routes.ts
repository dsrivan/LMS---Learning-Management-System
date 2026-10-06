import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'login',
    title: 'Entrar',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastro',
    title: 'Criar conta',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'dashboard',
    title: 'Meu aprendizado',
    canActivate: [authGuard],
    loadComponent: () => import('./features/learning/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'cursos',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Cursos disponíveis',
        loadComponent: () => import('./features/learning/catalog/catalog').then((m) => m.Catalog),
      },
      {
        path: 'meu-curso/:id',
        title: 'Detalhes do curso',
        loadComponent: () =>
          import('./features/learning/enrollment-details/enrollment-details').then(
            (m) => m.CourseDetails,
          ),
      },
      {
        path: 'meu-curso/:idEnrollment/tarefas/nova',
        title: 'Registrar tarefa',
        loadComponent: () =>
          import('./features/learning/task-create/task-create').then((m) => m.TaskCreate),
      },
      {
        path: 'meu-curso/:idEnrollment/tarefas/:idTask/editar',
        title: 'Editar tarefa',
        loadComponent: () =>
          import('./features/learning/task-edit/task-edit').then((m) => m.TaskEdit),
      },
    ],
  },
  {
    path: 'admin',
    title: 'Administração de cursos',
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN',
    },
    children: [
      {
        path: 'cursos',
        title: 'Gerenciar cursos',
        loadComponent: () =>
          import('./features/admin/course-list/course-list').then((m) => m.CourseList),
      },
      {
        path: 'cursos/novo',
        title: 'Novo curso',
        loadComponent: () =>
          import('./features/admin/course-create/course-create').then((m) => m.CourseCreate),
      },
      {
        path: 'cursos/:id/editar',
        title: 'Editar curso',
        loadComponent: () =>
          import('./features/admin/course-edit/course-edit').then((m) => m.CourseEdit),
      },
      { path: '**', redirectTo: 'admin' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
