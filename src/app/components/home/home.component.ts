// src/app/pages/home/home.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { StateService } from '../../services/state/state.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,ProductCardComponent,HeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  error: string | null = null;

  private productService= inject( ProductService)
  private stateService= inject(StateService);

  constructor(
   
  ) {}

  ngOnInit() {
    this.stateService.products.subscribe({
      next: (products) => this.products = products,
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
      }
    });

    this.productService.getAllProducts();
  }
}
