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

  getProductsById(id: string) {
    return this.httpClient.get<product>("http://localhost:3000/products/" + id);
  }
  updateProduct(data: product) {
    return this.httpClient.put(`http://localhost:3000/products/${data?.id}`, data)
  }
  searchProduct(query: string) {
    return this.httpClient.get(`http://localhost:3000/products?category=${query}`)
  }
}
