import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../core/Services/products.service';
import { CategoriesService } from '../../core/Services/categories.service';
import { CartService } from '../../core/Services/cart.service';
import { Icategory } from '../../core/InterFaces/icategory';
import { Iproduct } from '../../core/InterFaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/Services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, SearchPipe, CurrencyPipe, RouterLink,],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {





  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)

  AllCategories: WritableSignal<Icategory[]> = signal([])


  productsList: WritableSignal<Iproduct[]> = signal([])

  allProductSub!: Subscription;

  wordSearch: string = "";
  wishData: WritableSignal<string[]> = signal([])


  ngOnInit(): void {

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.AllCategories.set(res.data);
      }, error: (err) => {
        console.log(err);
      }
    })


    this.allProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }

    })


    this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        this.wishData.set(res.data.map((product: any) => product._id))
      }
    })
  }

  ngOnDestroy(): void {
    this.allProductSub?.unsubscribe
  }

  addCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'FreshCart', {
          timeOut: 2000
        })

        this._CartService.cartNumber.set(res.numOfCartItems);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  addWish(id: string): void {
    this._WishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishData.set(res.data);
        console.log(res.data);

      }
    })
  }
  deleteProduct(id: string): void {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.wishData.set(res.data);


      }
    })
  }
}
