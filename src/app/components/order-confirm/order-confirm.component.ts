import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit{
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    debugger
    // retrieve product from cart
    const cart = this.cartService.getCart();
    // convert id from Map to array
    const productIds = Array.from(cart.keys());

    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger
        // retrieve product info from product list and cart
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find(p => p.id === productId);
          if(product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log("test");
        
      },
      complete: () => {
        debugger
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger
        console.error("error fetching detail: ", error);
      }
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }
  applyCoupon(){

  }


















}
