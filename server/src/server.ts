import * as dotenv from 'dotenv';
import App from './app';
import UserController from './v1/users/user.controller';
import AuthenticationController from './v1/Authentication/Authentication.Controller';
import ProductController from './v1/Products/product.controller';
import CategoryController from './v1/Category/category.controller';

dotenv.config();

console.log('PORT', process.env.PORT);
console.log('MOGNO URI', process.env.MONGODB_URI);

const app = new App(
  [
    new UserController(),
    new AuthenticationController(),
    new ProductController(),
    new CategoryController(),
  ],
  parseInt(process.env.PORT)
);
