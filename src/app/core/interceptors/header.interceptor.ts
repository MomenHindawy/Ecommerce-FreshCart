import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem("UserToken") !== null) {
    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem("UserToken")! }
      })
    }

  }

  return next(req)
};
