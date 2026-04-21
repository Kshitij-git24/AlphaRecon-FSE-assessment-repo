import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { User, UserPayload } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly usersApiUrl = API_ENDPOINTS.users;

  /**
   * Avoid stale list after create/update/delete: browsers (and some proxies) may cache GET responses.
   * A cache-busting query param keeps each refresh authoritative without relying on backend headers.
   */
  getUsers(): Observable<User[]> {
    const url = `${this.usersApiUrl}?_=${Date.now()}`;
    return this.http.get<User[]>(url);
  }

  createUser(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.usersApiUrl, payload);
  }

  updateUser(id: number, payload: UserPayload): Observable<User> {
    return this.http.put<User>(`${this.usersApiUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersApiUrl}/${id}`);
  }
}
