import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { ServicoPrestadoPesquisaComponent } from './servico-prestado-pesquisa/servico-prestado-pesquisa.component';


const routes: Routes = [
  {
    path: 'servicos-prestados', component: LayoutComponent, children: [
      { path: 'form', component: ServicoPrestadoFormComponent },
      { path: 'form/:id', component: ServicoPrestadoFormComponent },
      { path: 'lista', component: ServicoPrestadoListaComponent },
      { path: 'pesquisa', component: ServicoPrestadoPesquisaComponent },
      { path: '', redirectTo: '/servicos-prestados/lista', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServicoPrestadoRoutingModule {
}