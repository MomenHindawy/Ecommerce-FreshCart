import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(product: any[], nameProduct: string): any[] {

    return product.filter((item) => item.title.toLowerCase().includes(nameProduct.toLowerCase()));
  }

}
