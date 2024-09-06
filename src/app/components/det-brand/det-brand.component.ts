import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/Services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { IBrands } from '../../core/InterFaces/i-brands';

@Component({
  selector: 'app-det-brand',
  standalone: true,
  imports: [],
  templateUrl: './det-brand.component.html',
  styleUrl: './det-brand.component.scss'
})
export class DetBrandComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  idBrand: string | null = '';
  detailsBrand: IBrands | null = null;
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'))
        this.idBrand = p.get('id')
      }
    })

    this._BrandsService.getSpecificBrands(this.idBrand).subscribe({
      next: (res) => {
        console.log(res.data);
        this.detailsBrand = res.data
      },
    })
  }

}
