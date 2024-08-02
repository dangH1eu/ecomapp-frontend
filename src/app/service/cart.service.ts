import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})

export class CartService{
  private cart: Map<number, number> = new Map();

  constructor(private productService: ProductService){
    const storedCart = localStorage.getItem('cart');
    if(storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    debugger
    if(this.cart.has(productId)) {
      // if product exist in cart, increase `quantity`
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    }
    else {
      // if product doesn't exist in cart, add product with `quantity`
      this.cart.set(productId, quantity)
    }
    // Save to localStorage
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    debugger
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())))
  }

  clearCart(): void {
    // clear data in cart
    this.cart.clear();
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }





}