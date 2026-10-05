import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
  enrollmentDate?: string;
  conclusionDate?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  courseList: Course[] = [
    {
      id: 1,
      title: 'Docker na Prática',
      description: 'Imagens, volumes, redes e Compose para ambientes reproduzíveis.',
      enrollmentDate: '03/08/2026',
      conclusionDate: '04/02/2027',
    },
    {
      id: 2,
      title: 'Kubernetes Essencial',
      description: 'Orquestre containers com pods, deployments e services do zero.',
      enrollmentDate: '03/08/2026',
      conclusionDate: '04/02/2027',
    },
    {
      id: 3,
      title: 'Arquitetura de Microsserviços',
      description: 'Comunicação, resiliência e mensageria.',
      enrollmentDate: '03/08/2026',
      conclusionDate: '04/02/2027',
    },
  ];
}
