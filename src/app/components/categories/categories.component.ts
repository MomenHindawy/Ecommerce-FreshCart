import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/Services/categories.service';
import { Icategory } from '../../core/InterFaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService)


  AllCategories: Icategory[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.AllCategories = res.data;
      }, error: (err) => {
        console.log(err);
      }
    })




  }
}
