import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    NgIf,
    MatError,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.userService.login(email).subscribe(
        response => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/tasks']);
        },
        error => {
          if (error.status === 404) {
            this.openConfirmationDialog(email);
          } else {
            console.error('Login failed', error);
          }
        }
      );
    }
  }

  openConfirmationDialog(email: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(email).subscribe(
          response => {
            console.log('User created successfully', response);
            localStorage.setItem('token', response.token!);
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('User creation failed', error);
          }
        );
      }
    });
  }
}
