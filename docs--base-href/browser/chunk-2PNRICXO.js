import{a as P}from"./chunk-4M23WFP2.js";import{a as I}from"./chunk-MVS7L37X.js";import"./chunk-N37YHLOP.js";import{m as C}from"./chunk-465SYBKZ.js";import{Ib as c,Jb as u,Kb as g,Na as f,Pb as S,Ra as o,Vb as _,Xb as y,aa as l,da as v,jb as h,ob as s,pb as m,qb as p,rb as a,sb as n,tb as x}from"./chunk-DF3O4SLU.js";function U(t,e){if(t&1&&(a(0,"div",3)(1,"div",4)(2,"div"),x(3,"img",5),n()(),a(4,"div",6)(5,"h3",7),c(6),n(),a(7,"p",8),c(8),_(9,"currency"),n(),a(10,"p"),c(11),n()()()),t&2){let r=e.$implicit;o(3),h("src",r.product.imageCover,f)("alt",r.product.title),o(3),u(r.product.category.name),o(2),u(y(9,5,r.price,"GBP")),o(3),g("Product Count: ",r.count,"")}}function w(t,e){if(t&1&&m(0,U,12,8,"div",3,s),t&2){let r=e.$implicit;p(r.cartItems)}}var D=(()=>{let e=class e{constructor(){this._AuthService=l(I),this._OrdersService=l(P),this.UserProducts=[]}ngOnInit(){let d=this._AuthService.saveUserData().id;this._OrdersService.getUserProduct(d).subscribe({next:i=>{console.log(i),this.UserProducts=i},error:i=>{console.log(i)}})}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=v({type:e,selectors:[["app-allorders"]],standalone:!0,features:[S],decls:8,vars:0,consts:[[1,"shadow","rounded-3","p-3","my-4","bg-main-light","w-75","m-auto"],[1,"container"],[1,"h2","text-center","text-main"],[1,"row","pb-2","border-bottom"],[1,"col-md-1"],[1,"w-100",3,"src","alt"],[1,"col-md-11","d-flex","flex-column","align-content-between"],[1,"h5","text-main"],[1,"text-muted"]],template:function(i,b){i&1&&(a(0,"section",0)(1,"div",1)(2,"div")(3,"div")(4,"h1",2),c(5," All Product User "),n()()(),m(6,w,2,0,null,null,s),n()()),i&2&&(o(6),p(b.UserProducts))},dependencies:[C]});let t=e;return t})();export{D as AllordersComponent};