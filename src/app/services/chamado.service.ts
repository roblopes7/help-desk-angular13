import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamados';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private httpClient: HttpClient) { }

  findById(id: any):Observable<Chamado>{
    return this.httpClient.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }


  findAll():Observable<Chamado[]>{
    return this.httpClient.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(chamado: Chamado):Observable<Chamado>{
    return this.httpClient.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado>{
    return this.httpClient.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado);
  }
}
