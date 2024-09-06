import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  constructor() { }



  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      },
    )
  }


  getUserWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }


  removeFromWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

}
