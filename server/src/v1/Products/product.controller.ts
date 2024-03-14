import Controller from 'v1/interfaces/controller.interface';
import * as express from 'express';
import UserNotFoundException from '../../v1/Exceptions/userNotFoundException';
import * as asyncHandler from 'express-async-handler';
import ProductService from './product.service';
import CreateProductDto from './dto/createProductDto';
import validationMiddleware from '../Middlewares/validationMiddleware';
import UpdateProductDto from './dto/updateProductDto';
import updateCategoryDto from 'v1/Category/dto/updateCategoryDto';

class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();
  private ProductService = new ProductService();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.post(
      `${this.path}/createProduct`,
      validationMiddleware(CreateProductDto),
      this.createProduct
    );
    this.router.patch(
      `${this.path}/updateProduct/:id`,
      validationMiddleware(UpdateProductDto),
      this.updateProduct
    );
    this.router.delete(`${this.path}/deleteProduct/:id`, this.deleteProduct);
    this.router.get(`${this.path}/search/:searchString`, this.searchProducts);
  }

  private getAllProducts = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let products = await this.ProductService.getAllProducts();
      response.send(products);
    }
  );

  private getProductById = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let productId = request.params.id;
      let product = await this.ProductService.getProductById(productId);
      response.send(product);
    }
  );

  private createProduct = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let productDto: CreateProductDto = request.body;

      let product = await this.ProductService.createProduct(productDto);
      response.send(product);
    }
  );

  private updateProduct = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let productId = request.params.id;
      let productDto: UpdateProductDto = request.body;

      let product = await this.ProductService.updateProduct(
        productDto,
        productId
      );
      response.send(product);
    }
  );

  private deleteProduct = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let productId = request.params.id;
      let product = await this.ProductService.deleteProduct(productId);
      response.send(product);
    }
  );

  private searchProducts = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let searchString = request.params.searchString;
      let products = await this.ProductService.searchProducts(searchString);
      response.send(products);
    }
  );
}

export default ProductController;
