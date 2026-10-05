import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [RouterLink],
  templateUrl: './task-form.html',
})
export class TaskForm {
  categoryList: string[] = ['Pesquisa', 'Prática', 'Assistir videoaula'];
  spentTimeList: string[] = [
    '30min',
    '1h',
    '1h 30min',
    '2h',
    '2h 30min',
    '3h',
    '3h 30min',
    '4h',
    '4h 30min',
    '5h',
    '5h 30min',
    '6h',
    '6h 30min',
    '7h',
    '7h 30min',
    '8h',
  ];
}
