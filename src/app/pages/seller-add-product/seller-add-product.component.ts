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
    // Convert category to lowercase
    const categoryLowerCase = this.productForm.value.category.toLowerCase();

    // Set the lowercase category back to the form value
    this.productForm.patchValue({ category: categoryLowerCase });

    // Add the product with the modified category
    this.productService.addProduct(this.productForm.value).subscribe((result) => {
      if (result) {
        alert('Product Successfully Added');
        this.router.navigateByUrl('seller-productList');
      }
    });
  }
}
