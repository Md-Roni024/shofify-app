import { Component,inject } from '@angular/core';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  quantity = 0;
  constructor(private stateService: StateService) {}
  ngOnInit() {
    this.stateService.cartQuantity.subscribe(q => {
      this.quantity = q;
    });
  }
}
