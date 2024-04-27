import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../Data-Type/data-type'
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-seller-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './seller-product-list.component.html',
})
export class SellerProductListComponent {
  productService = inject(ProductService);
  productData: undefined | product[];

  ngOnInit() {
    this.productList()
  }

  handleDelete(id: any) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        alert("Product is delete")
        this.productList()
      }
    })
  }

  productList() {
    this.productService.getProducts().subscribe((result) => {
      if (result) {
        this.productData = result;
      }
    })
  }

}
