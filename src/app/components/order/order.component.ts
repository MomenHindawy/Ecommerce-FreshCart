import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/Services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)

  idCart: string | null = '';

  orders: FormGroup = this._FormBuilder.group
    ({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        this.idCart = params.get('id')
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  ordersSubmit(): void {
    console.log(this.idCart);
    console.log(this.orders.value)
    this._OrdersService.checkOut(this.idCart, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "success") {
          window.open(res.session.url, '_self')

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
