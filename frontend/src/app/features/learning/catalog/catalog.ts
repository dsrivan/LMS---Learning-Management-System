import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.html',
})
export class Catalog {
  courseList: Course[] = [
    {
      id: 1,
      title: 'Docker na Prática',
      description: 'Imagens, volumes, redes e Compose para ambientes reproduzíveis.',
    },
    {
      id: 2,
      title: 'Kubernetes Essencial',
      description: 'Orquestre containers com pods, deployments e services do zero.',
    },
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
    {
      id: 5,
      title: 'Microfrontends com Module Federation',
      description: 'Divida aplicações front-end em módulos independentes.',
    },
  ];
}
