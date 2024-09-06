import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';
import { OrdersService } from '../../core/Services/orders.service';
import { IUserProduct } from '../../core/InterFaces/iuser-product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe,],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly _AuthService = inject(AuthService)
  private readonly _OrdersService = inject(OrdersService)

  UserProducts: IUserProduct[] = [];

  ngOnInit(): void {
    let userId = this._AuthService.saveUserData().id;
    this._OrdersService.getUserProduct(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.UserProducts = res
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}



