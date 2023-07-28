import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/models/pensamento.model';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {
  
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: ''
  };

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  criarPensamento() {
    this.service.create(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  ngOnInit(): void {
    
  }

}
