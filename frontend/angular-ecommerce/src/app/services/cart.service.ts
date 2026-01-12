import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { 

  }

  addToCart(theCartItem: CartItem){
    //check if item already exists, if yes increment quantity
    let alreadyExists:boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0){
      for(let tempItem of this.cartItems){
        if(tempItem.id === theCartItem.id){
          existingCartItem = tempItem;
          break;
        }
      }
    }
    alreadyExists = (existingCartItem != undefined);

    if(alreadyExists){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentItem of this.cartItems){
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }



}
