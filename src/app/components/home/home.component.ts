// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { StateService } from '../../services/state.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterLink,ProductCardComponent,HeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private stateService: StateService
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
