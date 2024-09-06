import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/Services/cart.service';
import { ICart } from '../../core/InterFaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _Router = inject(Router)



  displayItem: WritableSignal<ICart> = signal({} as ICart);





  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.displayItem.set(res.data);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  DeleteItem(id: string): void {
    this._CartService.deleteProductCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.displayItem.set(res.data)
        this._CartService.cartNumber.set(res.numOfCartItems);


      }, error: (err) => {
        console.log(err);

      }
    })
  }
  goTOShopping(): void {
    this._Router.navigate(['/product'])
  }
  updateProductCount(id: string, count: number): void {
    if (count >= 1) {
      this._CartService.updateProductCart(id, count).subscribe({
        next: (res) => {
          console.log(res.data);
          this.displayItem.set(res.data)
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }
  clearCart(): void {
    this._CartService.clearProductCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == "success") {
          this.displayItem.set({} as ICart)
          this._CartService.cartNumber.set(res.numOfCartItems);

        }

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
