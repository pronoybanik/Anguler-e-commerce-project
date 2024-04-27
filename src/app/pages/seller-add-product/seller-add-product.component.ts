import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './seller-add-product.component.html',
})
export class SellerAddProductComponent {
  formBuilder = inject(FormBuilder)
  productForm: FormGroup = this.formBuilder.group({
    productName: [""],
    price: [""],
    category: [""],
    image: [""],
    description: [""],
  })
  addProduct() {
    console.log("add data", this.productForm.value);

  }
}
