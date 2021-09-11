import { ProductImage } from "./productImage";

export interface Product{
  productId:number,
  categoryId:number,
  categoryName:string,
  productName:string,
  unitPrice:number,
  gameId:number,
  gameName:string;
  releaseDate:any,
  descriptionProduct:string,
  productImage:ProductImage[],
  imagePath:string,
}
