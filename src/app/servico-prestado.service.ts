import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})

export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + "/api/servicos-prestados";

  constructor(private http: HttpClient) {
  }

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {
    //console.log("buscar", nome, mes);
    
    var httpParams = new HttpParams();
    if (!nome) {
      nome = "";
    }
    httpParams = httpParams.set("nome", nome);

    if (mes) {
      httpParams = httpParams.set("mes", mes.toString());
    }

    //console.log("params", httpParams);
    const url = this.apiURL + "/pesquisar?" + httpParams.toString();
    //console.log(url);
    return this.http.get<any>(url);
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
