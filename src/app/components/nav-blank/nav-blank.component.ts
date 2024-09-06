import { WishlistService } from './../../core/Services/wishlist.service';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/Services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/Services/mytranslate.service';
import { CartService } from '../../core/Services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  private readonly _AuthService = inject(AuthService)
  private readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);


  countNumber: Signal<number> = computed(() => this._CartService.cartNumber());




  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems);


      }
    })



  }


  signOut(): void {
    this._AuthService.logOut()
  }

  change(lang: string): void {
    this._MytranslateService.changeLang(lang);


  }

}
