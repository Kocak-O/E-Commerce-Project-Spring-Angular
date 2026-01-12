import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/productcategory';

  constructor(private httpClient: HttpClient) {}

  // Get Items sorted by categories
  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  // get products with pagination
  getProductListPaginate(thePage:number, thePageSize:number, 
    theCategoryId: number): Observable<GetResponseProducts> {

    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Get Product categories
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(
        map(response => response._embedded.productCategories) 
      );
  }

  //Search Item with a specific keyword
  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  // Get all products
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(
        map(response => response._embedded.products)
      );
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${productId}`);
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[]; 
  };
}
