import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { TaskService } from '../../../services/task.service';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatError,
    MatButton,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() task?: Task;
  @Output() taskAdded = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = { ...this.task, ...this.taskForm.value };
      if (this.task) {
        this.taskService.updateTask(this.task.id, taskData).subscribe(() => {
          this.taskForm.reset();
          this.taskUpdated.emit();
        }, error => {
          console.error("Error updating task", error);
        });
      } else {
        this.taskService.addTask(taskData).subscribe(() => {
          this.taskForm.reset();
          this.taskAdded.emit();
        }, error => {
          console.error("Error creating task", error);
        });
      }
    }
  }
}
