import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);
  const token = localStorage.getItem('token');

  if (token) {
    return authService.validateToken(token).pipe(
      map(isValid => {
        if (isValid) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    );
  } else {
    router.navigate(['/login']);
    return false;
  }
};
