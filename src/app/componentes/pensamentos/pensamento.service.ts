import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pensamento } from 'src/app/models/pensamento.model';


@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API: string = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>( url )
  }

  findAll(pagina: number, filtro: string): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)
      // Lógica do Filtro, para filtrar todos os campos sem os espaços
      if (filtro.trim().length >1) {
        params = params.set("q", filtro)
      }
    //GET /posts?_page7&_limit=20
    // return this.http.get<Pensamento[]>(`${ this.API }?_page=${pagina}&_limit=${itensPorPagina}`);
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  create(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>( this.API, pensamento )
  }

  edit(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>( url, pensamento )
  }

  deletar(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>( url )
  }


}
