import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

const BASE_URL = 'http://localhost:5000/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(BASE_URL + '/list');
  }

  deleteUser(id: String) {
    return this.httpClient.delete(BASE_URL + '/user/del/' + id);
  }

  editUser(id: String, user: User) {
    return this.httpClient.put(BASE_URL + '/user/update/' + id, user);
  }



  getOneUser(id: String): Observable<User> {
    return this.httpClient.get<User>(BASE_URL + '/user/' + id);
  }

  updatePass(id: string, userPass: string) {
    return this.httpClient.put(BASE_URL + '/user/update_pass/' + id, userPass);
  }

  uploadImg(file:any) {
    return this.httpClient.post(BASE_URL + '/upload/', file);
  }
}
