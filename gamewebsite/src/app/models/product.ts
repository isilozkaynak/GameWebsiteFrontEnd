import { ProductImage } from "./productImage";

export interface Product{
  productId:number,
  categoryId:number,
  productName:string,
  unitPrice:number,
  gameId:number,
  releaseDate:any,
  descriptionProduct:string,
  productImage:ProductImage[];
}
