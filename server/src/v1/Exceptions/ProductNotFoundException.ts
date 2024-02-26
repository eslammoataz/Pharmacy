import HttpException from './HttpException';

class ProductNotFoundException extends HttpException {
  constructor(productId: string) {
    super(404, `Product With this id ${productId} not Found`);
  }
}

export default ProductNotFoundException;
