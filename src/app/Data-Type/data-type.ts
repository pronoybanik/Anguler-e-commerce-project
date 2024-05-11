export interface SignUp {
    name: string,
    email: string,
    password: string
}

export interface SignIn {
    email: string,
    password: string
}
export interface product {
    id: string,
    productName: string,
    price: number,
    category: string,
    image: string,
    description: string,
    quantity: undefined | number,
    productId: undefined | string,
}
export interface cart {
    id: undefined | string,
    productName: string,
    price: number,
    category: string,
    image: string,
    description: string,
    quantity: undefined | number,
    userId: string,
    productId: string,
}

export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface order {
    id: string,
    email: string,
    name: string,
    address: string,
    contact: string,
    userId: string,
    totalPrice: number,
}



