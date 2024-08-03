import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderDTO } from "../dto/order/order.dto";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: OrderDTO): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
}