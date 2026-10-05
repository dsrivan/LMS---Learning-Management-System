import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
  enrollmentDate?: string;
  conclusionDate?: string;
}

interface Task {
  id: number;
  category: string;
  description: string;
  timeSpent: string;
  date: string;
}

@Component({
  selector: 'app-course-details',
  imports: [RouterLink],
  templateUrl: './course-details.html',
})
export class CourseDetails {
  course: Course = {
    id: 1,
    title: 'Docker na Prática',
    description: 'Imagens, volumes, redes e Compose para ambientes reproduzíveis.',
    enrollmentDate: '03/08/2026',
    conclusionDate: '04/02/2027',
  };

  taskList: Task[] = [
    {
      id: 1,
      category: 'Prática',
      description: 'Criei um docker-compose com API e banco.',
      timeSpent: '2h',
      date: '02/10/2026',
    },
    {
      id: 2,
      category: 'Assistir videoaula',
      description: 'Módulo 4: redes e volumes.',
      timeSpent: '1h 30min',
      date: '02/10/2026',
    },
    {
      id: 3,
      category: 'Pesquisa',
      description: 'Estudei multi-stage builds na documentação.',
      timeSpent: '2h',
      date: '29/09/2026',
    },
  ];
}
