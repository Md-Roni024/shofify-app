import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { StateService } from '../../services/state/state.service';
import { Product } from '../../models/product.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  quantity = 1;
  addedToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    // Subscribe to the selected product state
    this.stateService.selectedProduct.subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product details. Please try again later.';
        this.loading = false;
        console.error('Error fetching product:', err);
      }
    });

    // Fetch product by ID
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id);
    } else {
      this.error = 'Invalid product ID';
      this.loading = false;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.addedToCart = true;
    this.stateService.setCartQuantity(this.quantity);
    setTimeout(() => {
      this.addedToCart = false;
    }, 3000);
  }
}
