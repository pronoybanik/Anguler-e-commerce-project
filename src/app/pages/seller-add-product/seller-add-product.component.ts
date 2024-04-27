import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './seller-add-product.component.html',
})
export class SellerAddProductComponent {
  productService = inject(ProductService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  productForm: FormGroup = this.formBuilder.group({
    productName: [""],
    price: [""],
    category: [""],
    image: [""],
    description: [""],
  })
  addProduct() {
    this.productService.addProduct(this.productForm.value).subscribe((result) => {
      if (result) {
        alert("Product Successfully Add")
        this.router.navigateByUrl("seller-productList")
      }
    })
  }
}
