import { Iproduct } from './../../core/InterFaces/iproduct';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Subscription, timeout } from 'rxjs';
import { CategoriesService } from '../../core/Services/categories.service';
import { Icategory } from '../../core/InterFaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/Services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)



  AllCategories: WritableSignal<Icategory[]> = signal([])


  productsList: WritableSignal<Iproduct[]> = signal([])
  allProductSub!: Subscription;

  wordSearch: string = "";

  wishData: WritableSignal<string[]> = signal([]);


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    rtl: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    items: 1,
    nav: false
  }

  customOptionsCate: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    rtl: true,

    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


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
