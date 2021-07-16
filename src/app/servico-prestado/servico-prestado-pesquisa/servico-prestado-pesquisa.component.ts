import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from '../servico-prestado-lista/servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-pesquisa',
  templateUrl: './servico-prestado-pesquisa.component.html',
  styleUrls: ['./servico-prestado-pesquisa.component.css']
})

export class ServicoPrestadoPesquisaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];
  message: string;

  constructor(
    private service: ServicoPrestadoService,
    private router: Router) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  ngOnInit(): void {
  }

  consultar() {
    console.log(this.nome, this.mes);
    this.service.buscar(this.nome, this.mes)
      .subscribe(response => {
        this.lista = response;
        if (this.lista.length <= 0) {
          this.message = "Nenhum Registro encontrado.";
        } else {
          this.message = null;
        }
      });
  }

  novoCadastro() {
    this.router.navigate(['/servico-prestado-form'])
  }
}
