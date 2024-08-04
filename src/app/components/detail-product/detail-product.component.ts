import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ){}

  ngOnInit() {

    const idParam = 8
    if(idParam !== null){
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          debugger
          if(response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              debugger
              product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
            });
          }
          this.product = response
          this.showImage(0)
          debugger
        },
        complete:() => {
          debugger
        },
        error: (error: any) => {
          debugger
          console.error('error fetching detail: ', error);
        }
      });
    }
    else {
      console.error('invalid product id', idParam);
    }
  }

  showImage(index: number): void {
    debugger
    if(this.product && this.product.product_images &&
      this.product.product_images.length > 0) {
        // check if index valid
        if(index < 0) {
          debugger
          index = 0;
        }
        else if(index >= this.product.product_images.length) {
          index = this.product.product_images.length - 1;
        }
        this.currentImageIndex = index;
      }
  }

  thumbnailClick (index: number) {
    debugger
    this.currentImageIndex = index;
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }
  
  addToCart(): void {
    debugger
    if(this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    }
    else {
      console.error("cannot add product to cart");
    }
  }

    increaseQuantity(): void {
      this.quantity++;
    }
    
    decreaseQuantity(): void {
      if(this.quantity > 1) {
        this.quantity--;
      }
    }

    buyNow(): void {      
      this.router.navigate(['/orders']);
    }    


}
