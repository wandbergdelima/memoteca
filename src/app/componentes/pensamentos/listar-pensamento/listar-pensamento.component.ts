import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from 'src/app/models/pensamento.model';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit{

   listaPensamentos: Pensamento[] = [];
  // pagina inicial
  paginaAtual: number = 1;

  // inicialização do botão visivel
  haMaisPensamentos: boolean = true;

  // variavel utilizada para filtrar a busca
  filtro: string = '';

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
      this.service.findAll(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos
      })
  }

  carregarMaisPensamentos() {
     this.service.findAll(++this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos);
        if(!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.findAll(this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }
}
