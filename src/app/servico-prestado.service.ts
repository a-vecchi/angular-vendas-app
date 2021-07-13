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

  salvar(servivoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, ServicoPrestado);
  }
}
