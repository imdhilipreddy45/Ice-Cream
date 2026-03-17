import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IceCream } from '../models/icecream.model';

@Injectable({
  providedIn: 'root'
})
export class IcecreamService {

  private apiUrl = '/api/icecreams';

  constructor(private http: HttpClient) { }

  getIceCreams(): Observable<IceCream[]> {
    return this.http.get<IceCream[]>(this.apiUrl);
  }

  getIceCream(id: string): Observable<IceCream> {
    return this.http.get<IceCream>(`${this.apiUrl}/${id}`);
  }

  createIceCream(icecream: IceCream): Observable<IceCream> {
    return this.http.post<IceCream>(this.apiUrl, icecream);
  }

  updateIceCream(id: string, icecream: IceCream): Observable<IceCream> {
    return this.http.put<IceCream>(`${this.apiUrl}/${id}`, icecream);
  }

  deleteIceCream(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
