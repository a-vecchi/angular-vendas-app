import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http: HttpClient) {

  }

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }
  
  atualizar(servicoPrestado: ServicoPrestado): Observable<any> {
    return this.http.put<ServicoPrestado>(`${this.apiURL}/${servicoPrestado.id}`, servicoPrestado);
  }

  getServicoPrestado(): Observable<ServicoPrestado[]> {
    return this.http.get<ServicoPrestado[]>(this.apiURL);
  }

  getServicoPrestadoById(id: number): Observable<ServicoPrestado> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
 
  deletar(servicoPrestado: ServicoPrestado): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${servicoPrestado.id}`);
  }
}
