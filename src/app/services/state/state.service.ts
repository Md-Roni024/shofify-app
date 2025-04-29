import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products = this.productsSubject;
  
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct = this.selectedProductSubject;

  cartQuantity = new BehaviorSubject<number>(0);

  constructor() {}

  // Method to update products in the state
  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Method to update selected product in the state
  setSelectedProduct(product: Product | null): void {
    this.selectedProductSubject.next(product);
  }

  setCartQuantity(quantity: number) {
    this.cartQuantity.next(quantity);
  }
}
