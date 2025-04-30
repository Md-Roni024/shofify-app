import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  products = new BehaviorSubject<Product[]>([]);
  selectedProduct = new BehaviorSubject<Product | null>(null);
  cartQuantity = new BehaviorSubject<number>(0);


  // Method to update products in the state
  setProducts(products: Product[]): void {
    this.products.next(products);
  }

  // Method to update selected product in the state
  setSelectedProduct(product: Product | null): void {
    this.selectedProduct.next(product);
  }

  setCartQuantity(quantity: number) {
    this.cartQuantity.next(this.cartQuantity.value+quantity);
  }
}
