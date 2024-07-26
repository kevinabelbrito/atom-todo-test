import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './task-list/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskListComponent,
    TaskFormComponent,
    MatGridList,
    MatGridTile,
    MatButton,
    ConfirmationDialogComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    });
  }

  onTaskAdded() {
    this.loadTasks();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
