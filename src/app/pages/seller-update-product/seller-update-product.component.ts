import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './seller-update-product.component.html',
})
export class SellerUpdateProductComponent {
  formBuilder = inject(FormBuilder);
  productForm: FormGroup = this.formBuilder.group({
    productName: [""],
    price: [""],
    category: [""],
    image: [""],
    description: [""],
  })
 
  updateProduct() {

  }
}
