import * as dotenv from 'dotenv';
import App from './app';
import UserController from './v1/users/user.controller';
// require('dotenv').config();

dotenv.config();

console.log('PORT', process.env.PORT);
console.log('MOGNO URI', process.env.MONGODB_URI);

const app = new App(
  [
    new UserController(),
    // new BookController(),
    // new AuthenticationController(),
    // new CategoriesController(),
    // new AuthorController(),
    // new ReviewsController(),
  ],
  parseInt(process.env.PORT)
);

app.listen();
