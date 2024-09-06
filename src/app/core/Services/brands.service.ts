import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly HttpClient = inject(HttpClient)
  constructor() { }

  getAllBrands(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }


  getSpecificBrands(id: null | string): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`)
  }
}
