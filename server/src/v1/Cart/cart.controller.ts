import CartService from './cart.service';
import { ICart } from './cart.model';
import { IProduct } from '../Products/product.model';
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import validationMiddleware from '../Middlewares/validationMiddleware';

class CartController {
  public path = '/cart';
  public router = express.Router();
  private cartService = new CartService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/addProduct`, this.addProductToCart);
    this.router.post(`${this.path}/removeProduct`, this.removeProductFromCart);
    this.router.get(`${this.path}/getCart/:customerId`, this.getCart);
  }

  private getCart = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const customerId = request.params.customerId;

      const cart: ICart | null = await this.cartService.getCart(customerId);

      if (cart) {
        response.send(cart);
      } else {
        response.status(500).send({ error: 'Failed to get cart' });
      }
    }
  );

  private addProductToCart = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const { customer, productId, quantity } = request.body;

      const cart: ICart | null = await this.cartService.addProductToCart(
        customer,
        productId,
        quantity
      );

      if (cart) {
        response.send(cart);
      } else {
        response.status(500).send({ error: 'Failed to add product to cart' });
      }
    }
  );

  private removeProductFromCart = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const { customer, productId } = request.body;

      const cart: ICart | null = await this.cartService.removeProductFromCart(
        customer,
        productId
      );

      if (cart) {
        response.send(cart);
      } else {
        response
          .status(500)
          .send({ error: 'Failed to remove product from cart' });
      }
    }
  );
}

export default CartController;
