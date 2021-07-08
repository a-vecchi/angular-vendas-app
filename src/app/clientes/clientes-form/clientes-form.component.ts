import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientesform',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})

export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params
    if (params && params.id) {
      this.id = params.id;
      this.service
        .getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        )
    }
    console.log(params.id)
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista'])
  }

  onSubmit() {
    this.service
      .salvar(this.cliente)
      .subscribe(response => {
        console.log(response);
        this.success = true;
        this.errors = null;
        this.cliente = response;
      }, errorResponse => {
        console.log(errorResponse.error.errors);
        this.success = false;
        this.errors = (errorResponse.error.errors);
      })
  }

}
