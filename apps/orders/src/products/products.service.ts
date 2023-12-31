import { Injectable } from "@nestjs/common";

import { Product } from "../models";
import {
  CreateProductDto,
  DecreaseProductQuantityDto,
  GetProductByIdDto,
  UpdateProductVersionDto,
} from "./dtos";
import { UpdateProductByEventDto } from "./dtos/update-product-by-event-dto";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  createProduct(createProductDto: CreateProductDto): Promise<Product> | never {
    return this.productsRepository.createProduct(createProductDto);
  }

  getProductById(getProductByIdDto: GetProductByIdDto): Promise<Product> | never {
    return this.productsRepository.getProductById(getProductByIdDto);
  }

  updateProductByEvent(updateProductDto: UpdateProductByEventDto): Promise<Product> | never {
    return this.productsRepository.updateProductByEvent(updateProductDto);
  }

  decreaseProductQuantity(
    decreaseProductQuantityDto: DecreaseProductQuantityDto,
  ): Promise<Product> | never {
    return this.productsRepository.decreaseProductQuantity(decreaseProductQuantityDto);
  }

  updateProductVersion(updateProductVersionDto: UpdateProductVersionDto): Promise<Product> | never {
    return this.productsRepository.updateProductVersion(updateProductVersionDto);
  }
}
