import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/Services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../core/InterFaces/icategory';

@Component({
  selector: 'app-details-cat',
  standalone: true,
  imports: [],
  templateUrl: './details-cat.component.html',
  styleUrl: './details-cat.component.scss'
})
export class DetailsCatComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)


  iCat: string | null = '';
  detailsCat: Icategory = {} as Icategory;





  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        this.iCat = p.get('id')
      }
    })

    this._CategoriesService.getSpecificCategory(this.iCat).subscribe({
      next: (res) => {
        console.log(res.data);
        this.detailsCat = res.data
      }
    })
  }

}
