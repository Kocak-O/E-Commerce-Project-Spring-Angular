import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutFormGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0.00;
  creditCardMonth: number[] = [];
  creditCardYears: number[] = [];


  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ){

  }

  ngOnInit(): void{

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
        'lastName': new FormControl('', [Validators.required, Validators.minLength(2)]),
        'email': new FormControl('', [Validators.required,
           Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
          )
      }),
      shippingAdress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAdress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        nameOnCard: [''],
        cardType: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationYear: [''],
        expirationMonth: ['']
      })
    })

    const startMonth: number = new Date().getMonth() + 1;
    this.shopFormService.getCreditCardMonth(startMonth).subscribe(
      data => this.creditCardMonth = data
    );
    this.shopFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );

  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }


  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order;
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempItem => new OrderItem(tempItem));

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAdress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAdress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.shippingAddress.state = billingState.name;
    purchase.shippingAddress.country = billingCountry.name

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Tracking Number: ${response.orderTrackingNumber}`)
          this.resetCart();
        },
        error: err => {
          alert(`${err.message}`)
        }
      }
    );
  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }




}
