import{t as s,y as e}from"./chunk-465SYBKZ.js";import{$ as o,W as n,bb as c}from"./chunk-DF3O4SLU.js";var m=(()=>{let r=class r{constructor(t){this._HttpClient=t,this.cartNumber=c(0)}addProductToCart(t){return this._HttpClient.post(`${e.baseUrl}/api/v1/cart`,{productId:t})}getProductsCart(){return this._HttpClient.get(`${e.baseUrl}/api/v1/cart`)}deleteProductCart(t){return this._HttpClient.delete(`${e.baseUrl}/api/v1/cart/${t}`)}updateProductCart(t,a){return this._HttpClient.put(`${e.baseUrl}/api/v1/cart/${t}`,{count:a})}clearProductCart(){return this._HttpClient.delete(`${e.baseUrl}/api/v1/cart`)}};r.\u0275fac=function(a){return new(a||r)(o(s))},r.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();export{m as a};