import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../models/Credenciais';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();


  constructor(private httpClient:HttpClient) { }

  authenticate(creds: Credenciais){
      return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, creds, {
        observe:'response',
        responseType:'text'
      })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }
}
