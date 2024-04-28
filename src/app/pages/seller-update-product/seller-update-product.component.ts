import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../../Data-Type/data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './seller-update-product.component.html',
})
export class SellerUpdateProductComponent {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  productData: undefined | product;
  router = inject(Router);
  productId = this.activatedRoute.snapshot.params["id"];
  productForm: FormGroup = this.formBuilder.group({
    productName: [""],
    price: [""],
    category: [""],
    image: [""],
    description: [""],
    id: [""]
  })


  ngOnInit() {
    this.productService.getProductsById(this.productId).subscribe(result => {
      this.productData = result;
      this.productForm.patchValue(result)

    })
  }

  updateProduct() {
    this.productService.updateProduct(this.productForm.value).subscribe(result => {
      if (result) {
        alert("Product update successfully");
        this.router.navigateByUrl("/seller-productList")
      }
    })
  }
}
