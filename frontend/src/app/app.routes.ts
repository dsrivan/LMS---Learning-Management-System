import { Routes } from '@angular/router';

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
    loadComponent: () => import('./features/learning/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'cursos',
    title: 'Cursos disponíveis',
    loadComponent: () => import('./features/learning/catalog/catalog').then((m) => m.Catalog),
  },
  {
    path: 'cursos/:courseId',
    title: 'Detalhes do curso',
    loadComponent: () =>
      import('./features/learning/course-details/course-details').then((m) => m.CourseDetails),
  },
  {
    path: 'cursos/:courseId/tarefas/nova',
    title: 'Registrar tarefa',
    loadComponent: () => import('./features/learning/task-form/task-form').then((m) => m.TaskForm),
  },
  {
    path: 'cursos/:courseId/tarefas/:taskId/editar',
    title: 'Registrar tarefa',
    loadComponent: () => import('./features/learning/task-form/task-form').then((m) => m.TaskForm),
  },
  {
    path: 'admin/cursos',
    title: 'Gerenciar cursos',
    loadComponent: () =>
      import('./features/admin/course-list/course-list').then((m) => m.CourseList),
  },
  {
    path: 'admin/cursos/novo',
    title: 'Novo curso',
    loadComponent: () =>
      import('./features/admin/course-form/course-form').then((m) => m.CourseForm),
  },
  {
    path: 'admin/cursos/:id/editar',
    title: 'Novo curso',
    loadComponent: () =>
      import('./features/admin/course-form/course-form').then((m) => m.CourseForm),
  },
  { path: '**', redirectTo: 'login' },
];
