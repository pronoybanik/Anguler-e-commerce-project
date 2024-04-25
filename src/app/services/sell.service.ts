import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SellService {
  httpClient = inject(HttpClient)
  constructor() { }

  addUser(data: any) {
    return this.httpClient.post("http://localhost:3000/login", data);
  }
 
}
