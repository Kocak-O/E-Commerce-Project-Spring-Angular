import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPaginationModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize:number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService
  ){

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  
  }

  handleListProducts(){
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.currentCategoryId = +idParam;
    }else{
      this.currentCategoryId = 1; 
    }

    // if category gets changes, pagenumber will be resetted to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId)
      .subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number+1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      )
    
  }

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );

  }
  
  addToCart(product: Product) {
    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }


}
