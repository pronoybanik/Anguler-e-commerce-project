import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { product } from '../Data-Type/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);

  constructor() { }


  addProduct(data: product) {
    return this.httpClient.post('http://localhost:3000/products', data);
  }

  getProducts() {
    return this.httpClient.get<product[]>('http://localhost:3000/products')
  }
  deleteProduct(id: string) {
    console.log("id", id);
    return this.httpClient.delete(`http://localhost:3000/products/${id}`)
  }
}