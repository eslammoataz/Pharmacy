import Controller from 'v1/interfaces/controller.interface';
import * as express from 'express';
import UserNotFoundException from '../../v1/Exceptions/userNotFoundException';
import * as asyncHandler from 'express-async-handler';
import ProductService from './product.service';
import CreateProductDto from './dto/createProductDto';
import validationMiddleware from '../Middlewares/validationMiddleware';

class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();
  private ProductService = new ProductService();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.post(
      `${this.path}/createProduct`,
      validationMiddleware(CreateProductDto),
      this.createProduct
    );
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
}

export default ProductController;
