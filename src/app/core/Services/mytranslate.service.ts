import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null, null)

  constructor() {


    let saveLang = localStorage.getItem('lang');

    this._TranslateService.setDefaultLang('en');

    if (saveLang !== null) {
      this._TranslateService.use(saveLang!);
    }

    this.changeDirection()

  }
  changeDirection(): void {
    let saveLang = localStorage.getItem('lang');

    if (saveLang === 'en') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en')

    } if (saveLang === 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar')

    }
  }

  changeLang(lang: string): void {

    localStorage.setItem('lang', lang);
    this._TranslateService.use(lang);
    this.changeDirection()

  }
}
