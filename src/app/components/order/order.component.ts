import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/app/dto/order/order.dto';
import { environment } from 'src/app/environment/environment';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: { product: Product; quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;

  orderData: OrderDTO = {
    user_id: 6,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    status: 'pending',
    note: '',
    total_money: 0,
    shipping_method: 'express',
    payment_method: 'cod',
    coupon_code: '',
    cart_items: [],
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    
  ) {
    this.orderForm = this.formBuilder.group({
      fullname: ['test name 4', Validators.required],
      email: ['testemail4@gmail.com', [Validators.email]],
      phone_number: [
        '11223344',
        [Validators.required, Validators.minLength(6)],
      ],
      address: ['test address', [Validators.required, Validators.minLength(5)]],
      note: ['test note'],
      shipping_method: ['express'],
      payment_method: ['cod'],
    });
  }

  ngOnInit(): void {
    debugger;
    // this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();    

    // retrieve product from cart
    const cart = this.cartService.getCart();
    // convert id from Map to array
    const productIds = Array.from(cart.keys());

    debugger
    if(productIds.length === 0) {
      return;
    }

    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger;
        // retrieve product info from product list and cart
        this.cartItems = productIds.map((productId) => {
          debugger;
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!,
          };
        });
        console.log('test');
      },
      complete: () => {
        debugger;
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger;
        console.error('error fetching detail: ', error);
      },
    });
  }

  placeOrder() {
    if (this.orderForm.valid) {
      // this.orderData.fullname = this.orderForm.get('fullname')!.value;
      // this.orderData.email = this.orderForm.get('email')!.value;
      // this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      // this.orderData.address = this.orderForm.get('address')!.value;
      // this.orderData.note = this.orderForm.get('note')!.value;
      // this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      // this.orderData.payment_method = this.orderForm.get('payment_method')!.value;

      // copy value from form into orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value,
      };

      this.orderData.cart_items = this.cartItems.map((cartItem) => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      }));
      this.orderData.total_money = this.totalAmount;

      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response: Order) => {
          debugger;
          alert('Order successfully')
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          alert(`Cannot create order: ${error}`);
        },
      });
    }
    else {
      alert('Invalid info');
    }
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  applyCoupon() {}
}
