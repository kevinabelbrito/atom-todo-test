import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(email: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.apiUrl}/${email}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

  createUser(email: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, {email});
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate-token`, { token }).pipe(
      map(response => response.valid),
      catchError(() => {
        return [false];
      })
    );
  }
}
