import * as dotenv from 'dotenv';
import App from './app';
import UserController from './v1/users/user.controller';
import AuthenticationController from './v1/Authentication/Authentication.Controller';
// require('dotenv').config();

dotenv.config();

console.log('PORT', process.env.PORT);
console.log('MOGNO URI', process.env.MONGODB_URI);

const app = new App(
  [new UserController(), new AuthenticationController()],
  parseInt(process.env.PORT)
);
