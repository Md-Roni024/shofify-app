import { Component, inject, OnInit } from '@angular/core';
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
  error: string | null = null;
  quantity = 1;
  addedToCart = false;

  private productService= inject( ProductService)
  private stateService= inject(StateService);
  private route = inject(ActivatedRoute)

  ngOnInit() {
    this.stateService.selectedProduct.subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.error = 'Failed to load product details. Please try again later.';
        console.error('Error fetching product:', err);
      }
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id);
    } else {
      this.error = 'Invalid product ID';
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
