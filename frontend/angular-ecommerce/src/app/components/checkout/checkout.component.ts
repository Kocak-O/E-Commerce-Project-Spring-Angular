import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { NgFor, NgIf } from '@angular/common';

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
    private shopFormService: ShopFormService
  ){

  }

  ngOnInit(): void{
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
    }
  }




}
