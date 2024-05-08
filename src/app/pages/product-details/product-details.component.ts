import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../Data-Type/data-type';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {

  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  productId = this.activatedRoute.snapshot.params["id"];
  productData: undefined | product;


  ngOnInit() {
    this.productId && this.productService.getProductsById(this.productId).subscribe((result) => {
      if (result) {
        this.productData = result;
        console.log(result);

      }
    })
  }

}
