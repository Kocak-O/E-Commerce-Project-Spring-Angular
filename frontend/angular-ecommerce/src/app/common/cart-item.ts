import { Product } from "./product";



export class CartItem {

    id: number;
    name:string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(product: Product){
        this.id = product.id,
        this.name = product.name;
        this.imageUrl = product.image_url;
        this.unitPrice = product.unit_price;
        this.quantity = 1;
    }


}
