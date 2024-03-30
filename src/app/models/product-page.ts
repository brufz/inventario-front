import { ProductDTO } from "./produc-dto";

export interface ProductPage {
    size: any;
    totalElements: any;
    content: ProductDTO[];
}