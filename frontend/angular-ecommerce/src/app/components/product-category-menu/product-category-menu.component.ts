import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-category-menu',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService){

  }

ngOnInit(): void {
  this.listProductCategories();
}

listProductCategories() {
  this.productService.getProductCategories().subscribe({
    next: data => {
      this.productCategories = data;
    }
  });
}


}
