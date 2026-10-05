import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-course-list',
  imports: [RouterLink],
  templateUrl: './course-list.html',
})
export class CourseList {
  courseList: Course[] = [
    { id: 1, title: 'Docker na Prática', description: 'Imagens, volumes, redes e Compose.' },
    { id: 2, title: 'Kubernetes Essencial', description: 'Pods, deployments e services do zero.' },
    {
      id: 3,
      title: 'Arquitetura de Microsserviços',
      description: 'Comunicação, resiliência e mensageria.',
    },
    {
      id: 4,
      title: 'Desenvolvimento Ágil com Scrum',
      description: 'Sprints, backlog e cerimônias.',
    },
  ];
}
