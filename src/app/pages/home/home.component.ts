import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProductsCardComponent } from '../../components/products-card/products-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, ProductsCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
