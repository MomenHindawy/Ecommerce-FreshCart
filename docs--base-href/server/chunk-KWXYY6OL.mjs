import './polyfills.server.mjs';
import{a as e}from"./chunk-BH3MSCPX.mjs";import{x as a}from"./chunk-B6XCLQHU.mjs";import{S as n,Y as o}from"./chunk-HHRL5WPK.mjs";var b=(()=>{let t=class t{constructor(){this.HttpClient=o(a)}getAllBrands(){return this.HttpClient.get(`${e.baseUrl}/api/v1/brands`)}getSpecificBrands(i){return this.HttpClient.get(`${e.baseUrl}/api/v1/brands/${i}`)}};t.\u0275fac=function(s){return new(s||t)},t.\u0275prov=n({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{b as a};
