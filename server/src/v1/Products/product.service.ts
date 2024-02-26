import * as prodcut from './product.model';
import * as bcrypt from 'bcrypt';
import { ProductModel, IProduct } from './product.model';
import UserWithThatEmailAlreadyExistsException from '../Exceptions/UserWithThatEmailAlreadyExistsException';
import CreateProductDto from './dto/createProductDto';
import { CategoryModel, ICategory } from '../Category/category.model';
import CategoryNotFoundException from '../Exceptions/CategoryNotFoundException';

class ProductService {
  private ProductModel = ProductModel;
  private CategoryModel = CategoryModel;

  public getAllProducts = async (): Promise<IProduct[]> => {
    const products = await this.ProductModel.find();
    return products;
  };

  public createProduct = async (
    productData: CreateProductDto
  ): Promise<IProduct> => {
    const categoryId = productData.category;

    let category = await this.CategoryModel.findById(categoryId);

    if (category == null) {
      throw new CategoryNotFoundException(categoryId);
    }
    const product = await this.ProductModel.create({ ...productData });
    category.products.push(product.id);
    await category.save();
    return product;
  };
}

export default ProductService;
