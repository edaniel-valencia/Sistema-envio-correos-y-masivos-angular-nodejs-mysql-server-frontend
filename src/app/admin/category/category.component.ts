import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  listCategory: Category[] = [];


  constructor(
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {

  }

  ngOnInit(): void {
    this.listCategoryAll();
  }

  listCategoryAll(): void {
    this._categoryService.ReadAll().subscribe(data => {
      this.listCategory = data;
      console.log(data);
    });
  }
}
