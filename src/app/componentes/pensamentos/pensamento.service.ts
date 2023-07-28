import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  findAll(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>( this.API );
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
