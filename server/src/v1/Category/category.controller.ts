import Controller from 'v1/interfaces/controller.interface';
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import CreateCategoryDto from './dto/createCategoryDto';
import { CategoryModel, ICategory } from './category.model';
import validationMiddleware from '../Middlewares/validationMiddleware';
import CategoryService from './category.service';
import updateCategoryDto from './dto/updateCategoryDto';

class CategoryController implements Controller {
  public path = '/category';
  public router = express.Router();
  private CategoryService = new CategoryService();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(this.path, this.getAllCategories);
    this.router.get(`${this.path}/:id`, this.getCategoryById);
    this.router.post(
      `${this.path}/createCategory`,
      validationMiddleware(CreateCategoryDto),
      this.createCategory
    );
    this.router.patch(
      `${this.path}/updateCategory/:id`,
      validationMiddleware(updateCategoryDto),
      this.updateCategory
    );
    this.router.delete(`${this.path}/deleteCategory/:id`, this.deleteCategory);
  }

  private getAllCategories = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let categories = await this.CategoryService.getAllCategories();
      response.send(categories);
    }
  );

  private getCategoryById = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let categoryId = request.params.id;
      let pageSize = parseInt(request.query.pageSize as string);
      let pageNumber = parseInt(request.query.pageNumber as string);

      let category = await this.CategoryService.getCategoryById(
        categoryId,
        pageNumber,
        pageSize
      );
      response.send(category);
    }
  );

  private createCategory = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let categoryDto: CreateCategoryDto = request.body;

      let category = await this.CategoryService.createCategory(categoryDto);
      response.send(category);
    }
  );

  private updateCategory = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let categoryId = request.params.id;
      let updateCategoryDto: updateCategoryDto = request.body;

      let category = await this.CategoryService.updateCategory(
        updateCategoryDto,
        categoryId
      );
      response.send(category);
    }
  );

  private deleteCategory = asyncHandler(
    async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      let categoryId = request.params.id;

      let result = await this.CategoryService.deleteCategory(categoryId);
      response.send(result);
    }
  );
}

export default CategoryController;
