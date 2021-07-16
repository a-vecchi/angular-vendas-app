import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})

export class ServicoPrestadoListaComponent implements OnInit {

  servicos: ServicoPrestado[] = [];
  servicoSelecionado: ServicoPrestado;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ServicoPrestadoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.service
      .getServicoPrestado()
      .subscribe(resposta => this.servicos = resposta);
  }

  novoCadastro() {
    this.router.navigate(['/servico-prestado-form'])
  }

  preparaDelecao(servicoPrestado: ServicoPrestado) {
    this.servicoSelecionado = servicoPrestado;
  }

  deletarServico() {
    this.service.deletar(this.servicoSelecionado).subscribe(
      response => {
        this.mensagemSucesso = 'Serviço Prestado deletado com sucesso!'
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o Serviço Prestado.')
  }
}
