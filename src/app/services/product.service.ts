import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { cart, order, product } from '../Data-Type/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);
  cartIndex = new EventEmitter<product[] | []>();

  constructor() { }


  addProduct(data: product) {
    return this.httpClient.post('https://anguler-e-commer-server.onrender.com/products', data);
  };

  getProducts() {
    return this.httpClient.get<product[]>('https://anguler-e-commer-server.onrender.com/products')
  };

  deleteProduct(id: string) {
    return this.httpClient.delete(`https://anguler-e-commer-server.onrender.com/products/${id}`)
  };

  getProductsById(id: string) {
    return this.httpClient.get<product>("https://anguler-e-commer-server.onrender.com/products/" + id);
  };

  updateProduct(data: product) {
    return this.httpClient.put(`https://anguler-e-commer-server.onrender.com/products/${data?.id}`, data)
  };

  searchProduct(query: string) {
    return this.httpClient.get(`https://anguler-e-commer-server.onrender.com/products?category=${query}`)
  };

  localStorageData(data: product) {
    let cartData = []
    let localCart = localStorage.getItem("productData")
    if (!localCart) {
      localStorage.setItem("productData", JSON.stringify([data]))
      this.cartIndex.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem("productData", JSON.stringify(cartData))
      this.cartIndex.emit(cartData)
    }
  };

  removeItemFormCart(id: string) {
    let cartData = localStorage.getItem("productData")
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => id !== item.id);
      localStorage.setItem("productData", JSON.stringify(items));
      this.cartIndex.emit(items)
    }
  };

  addToCart(cartData: cart) {
    return this.httpClient.post('https://anguler-e-commer-server.onrender.com/cart', cartData);
  };

  getCarList(userId: string) {
    return this.httpClient.get<product[]>('https://anguler-e-commer-server.onrender.com/cart?userId=' + userId, { observe: "response" }).subscribe((result) => {
      if (result && result.body) {
        this.cartIndex.emit(result.body)
      }
    })
  };

  removeToCart(id: string) {
    return this.httpClient.delete("https://anguler-e-commer-server.onrender.com/cart/" + id)
  };

  currentCart() {
    let userStore = localStorage.getItem('user_auth');
    let userData = userStore && JSON.parse(userStore);
    return this.httpClient.get<cart[]>("https://anguler-e-commer-server.onrender.com/cart?userId=" + userData?.id)
  }

  orderSave(data: order) {
    return this.httpClient.post("https://anguler-e-commer-server.onrender.com/orders", data)
  }

  orderList() {
    let userStore = localStorage.getItem('user_auth');
    let userData = userStore && JSON.parse(userStore);
    return this.httpClient.get<order[]>(`https://anguler-e-commer-server.onrender.com/orders?userId=${userData?.id}`)
  }

  deleteCartItem(cartId: string) {
    return this.httpClient.delete("https://anguler-e-commer-server.onrender.com/cart/" + cartId, {
      observe: "response"
    }).subscribe((result) => {
      if (result) {
        this.cartIndex.emit([])
      }
    })
  };

  cancelOrder(id: string) {
    return this.httpClient.delete("https://anguler-e-commer-server.onrender.com/orders/" + id)
  }
}
