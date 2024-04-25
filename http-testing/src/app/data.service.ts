import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<{ firstName: string; lastName: string }[]> {
    return this.http.get<{ users: any[] }>('https://dummyjson.com/users')
      .pipe(
        map(response => response.users.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName
        })))
      );
  }
}
