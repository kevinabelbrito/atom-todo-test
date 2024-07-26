import { Component, Input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DatePipe, NgFor } from '@angular/common';
import { Task } from '../../../models/task.model';
import { MatButton } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../../services/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskEditDialogComponent } from './task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardFooter,
    MatButton,
    MatCheckbox,
    MatCheckboxModule,
    MatDialogModule,
    NgFor,
  ],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
  @Input() tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  openConfirmationDialog(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        });
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    this.taskService.updateTaskStatus(task.id).subscribe(updatedTask => {
      task.status = updatedTask.status;
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm a') || '';
  }
}
