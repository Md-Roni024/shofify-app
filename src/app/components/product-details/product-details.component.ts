import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { StateService } from '../../services/state/state.service';
import { Product } from '../../models/product.model';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  error: string | null = null;
  quantity = 0;
  addedToCart = false;
  cartQuantity = 0;  
  loading = true;

  private productService= inject( ProductService)
  private stateService= inject(StateService);
  private route = inject(ActivatedRoute)
  skeletonArray: number[] = Array.from({ length: 8 }, (_, i) => i);


  ngOnInit() {
    this.stateService.cartQuantity.subscribe(quantity => {
      this.cartQuantity = quantity;
    }); 
    this.stateService.selectedProduct.subscribe({
      next: (data) => {
        setTimeout(() => {
          this.product = data;
          this.loading = false;
        }, 1000);
      },
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
    this.cartQuantity = this.stateService.cartQuantity.value;
    console.log(this.stateService.cartQuantity.value)

    setTimeout(() => {
      this.addedToCart = false;
    }, 1000);
  }
}
