import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { product } from '../Data-Type/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);
  cartData = new EventEmitter<product[] | []>();

  constructor() { }


  addProduct(data: product) {
    return this.httpClient.post('http://localhost:3000/products', data);
  };

  getProducts() {
    return this.httpClient.get<product[]>('http://localhost:3000/products')
  };

  deleteProduct(id: string) {
    console.log("id", id);
    return this.httpClient.delete(`http://localhost:3000/products/${id}`)
  };

  getProductsById(id: string) {
    return this.httpClient.get<product>("http://localhost:3000/products/" + id);
  };

  updateProduct(data: product) {
    return this.httpClient.put(`http://localhost:3000/products/${data?.id}`, data)
  };

  searchProduct(query: string) {
    return this.httpClient.get(`http://localhost:3000/products?category=${query}`)
  };

  localStorageData(data: product) {
    let cartData = []
    let localCart = localStorage.getItem("productData")
    if (!localCart) {
      localStorage.setItem("productData", JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem("productData", JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  };

  removeItemFormCart(id: string) {
    let cartData = localStorage.getItem("productData")
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => id !== item.id);
      localStorage.setItem("productData", JSON.stringify(items));
      this.cartData.emit(items)
    }
  }

}
