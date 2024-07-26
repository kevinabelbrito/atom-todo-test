import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Task } from '../../../../models/task.model';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [
    TaskFormComponent,
    MatCard,
    MatCardContent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './task-edit-dialog.component.html',
  styleUrl: './task-edit-dialog.component.scss'
})
export class TaskEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  onTaskUpdated() {
    this.dialogRef.close(true); // Notify that the task was updated
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
