import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dto/user/register.dto';
import { LoginDTO } from '../dto/user/login.dto';
import { environment } from '../environment/environment';
import { HttpUtilService } from './http.util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    private apiCofig = {
      headers: this.httpUtilService.createHeaders(),
    }

  constructor(private http: HttpClient,
    private httpUtilService: HttpUtilService
   ) { }

  register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiCofig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiCofig);
  }
}
