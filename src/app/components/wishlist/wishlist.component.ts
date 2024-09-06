import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/Services/wishlist.service';
import { IWish } from '../../core/InterFaces/iwish';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService)
  getWishList: IWish[] = [];
  delete: string = '';
  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.getWishList = res.data
      }
    })
  }
  deleteProduct(id: string): void {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(this.delete = res);
        this._WishlistService.getUserWishList().subscribe({
          next: (res) => {
            this.getWishList = res.data

          }
        })
      }
    })
  }



}
