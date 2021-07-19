import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})

export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []
  servico: ServicoPrestado;
  success: boolean = false;
  errors: String[];
  id: number;
  
  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getCliente()
      .subscribe(response => this.clientes = response);

    let params = this.activatedRoute.snapshot.params
    if (params && params.id) {
      this.id = params.id;
      this.service
        .getServicoPrestadoById(this.id)
        .subscribe(
          response => this.servico = response,
          errorResponse => this.servico = new ServicoPrestado()
        )
    }
    //console.log(params.id)
  }

  voltarParaListagem() {
    this.router.navigate(['/servicos-prestados']);
  }

  onSubmit() {
    //console.log(this.servico);
    if (this.id) {
      this.service
        .atualizar(this.servico)
        .subscribe(response => {
          //console.log(response);
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o Serviço Prestado.'];
          //console.log(errorResponse);
        })
    } else {
      this.service
        .salvar(this.servico)
        .subscribe(response => {
          //console.log(response);
          this.success = true;
          this.errors = null;
          this.servico = new ServicoPrestado();
        }, errorResponse => {
          //console.log(errorResponse.error.errors);
          this.success = false;
          this.errors = (errorResponse.error.errors);
        })
    }
  }
}
