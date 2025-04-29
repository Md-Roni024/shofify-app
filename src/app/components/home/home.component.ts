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
  quantity = 0;

  private productService= inject( ProductService)
  private stateService= inject(StateService);


  ngOnInit() {
    this.stateService.products.subscribe({
      next: (products) => this.products = products,
    });

    this.stateService.cartQuantity.subscribe(q => {
      this.quantity = q;
    });

    this.productService.getAllProducts();
  }
}
