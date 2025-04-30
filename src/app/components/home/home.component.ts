import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { StateService } from '../../services/state/state.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,ProductCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  cartQuantity = 0;
  loading = true;

  private productService= inject( ProductService)
  private stateService= inject(StateService);
  skeletonArray: number[] = Array.from({ length: 12 }, (_, i) => i);

  ngOnInit() {
    this.stateService.products.subscribe({
      next: (products) => {
        setTimeout(() => {
          this.products = products;
          this.loading = false;
        }, 1000);
      }
    });

    this.stateService.cartQuantity.subscribe(quantity => {
      this.cartQuantity = quantity;
    });

    this.productService.getAllProducts();
  }
}
