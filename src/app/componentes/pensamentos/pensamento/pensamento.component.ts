import { Component, Input, OnInit} from '@angular/core';
import { Pensamento } from 'src/app/models/pensamento.model';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit{
 
  constructor() { }

  ngOnInit(): void {
    
  }

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }
}
