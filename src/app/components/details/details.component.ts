import { Category, Iproduct } from './../../core/InterFaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/Services/products.service';
import { log } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)




  detailsProductDes !: Subscription;

  detailsProduct: Iproduct | null = null;


  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (P) => {
        console.log(P.get('id'));
        let idProduct = P.get('id');

        this.detailsProductDes = this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            this.detailsProduct = res.data;
          },
          error: (err) => {
            console.log(err);

          }
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.detailsProductDes?.unsubscribe
  }

  addCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
