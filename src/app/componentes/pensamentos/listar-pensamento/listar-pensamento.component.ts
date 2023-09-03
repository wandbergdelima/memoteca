import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from 'src/app/models/pensamento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit{

  listaPensamentos: Pensamento[] = [];
  // pagina inicial
  paginaAtual: number = 1;
  titulo: string = 'Meu Mural';

  // inicialização do botão visivel
  haMaisPensamentos: boolean = true;

  // variavel utilizada para filtrar a busca
  filtro: string = '';

  // variavel utilizada para filtrar os itens favoritados
  favoritos: boolean = false;

  listaFavoritos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,
    private router: Router) { }

  ngOnInit(): void {
      this.service.findAll(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos
      })
  }

  carregarMaisPensamentos() {
     this.service.findAll(++this.paginaAtual, this.filtro, this.favoritos)
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

    this.service.findAll(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.findAll(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
