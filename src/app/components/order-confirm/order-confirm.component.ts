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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  


}
