import { CartModel, ICart, ICartItem } from './cart.model';
import { ProductModel } from '../Products/product.model';
import { IUser } from '../users/user.model';

class CartService {
  async getCart(customer: IUser | string): Promise<ICart | null> {
    try {
      const cart = await CartModel.findOne({ customer }).populate(
        'items.product'
      );
      return cart;
    } catch (error) {
      console.error('Error retrieving cart:', error);
      return null;
    }
  }

  async addProductToCart(
    customer: IUser | string,
    productId: string,
    quantity: number = 1
  ): Promise<ICart | null> {
    try {
      let cart = await CartModel.findOne({ customer }).populate(
        'items.product'
      );

      if (!cart) {
        cart = await CartModel.create({ customer, items: [] });
      }

      const existingItemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        const product = await ProductModel.findById(productId);
        if (!product) {
          throw new Error('Product not found');
        }
        cart.items.push({ product: product._id, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return null;
    }
  }

  async removeProductFromCart(
    customer: IUser | string,
    productId: string
  ): Promise<ICart | null> {
    try {
      let cart = await CartModel.findOne({ customer });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const indexToRemove = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (indexToRemove === -1) {
        throw new Error('Product not found in cart');
      }

      cart.items[indexToRemove].quantity--;

      if (cart.items[indexToRemove].quantity == 0) {
        cart.items.splice(indexToRemove, 1);
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error removing product from cart:', error);
      return null;
    }
  }
}

export default CartService;
