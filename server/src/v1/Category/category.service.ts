import * as bcrypt from 'bcrypt';
import { CategoryModel, ICategory } from './category.model';
import UserWithThatEmailAlreadyExistsException from '../Exceptions/UserWithThatEmailAlreadyExistsException';
import CreateCategoryDto from './dto/createCategoryDto';
import CategoryNotFoundException from '../Exceptions/CategoryNotFoundException';
import updateCategoryDto from './dto/updateCategoryDto';

class CategoryService {
  private CategoryModel = CategoryModel;

  public getAllCategories = async (): Promise<object[]> => {
    let categories = await CategoryModel.find().select('-products');
    return categories;
  };

  public getCategoryById = async (
    categoryId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<ICategory> => {
    let category = await this.CategoryModel.findById(categoryId).populate({
      path: 'products',
      options: {
        skip: (pageNumber - 1) * pageSize,
        limit: pageSize,
      },
    });

    if (category == null) {
      throw new CategoryNotFoundException(categoryId);
    }
    return category;
  };

  public createCategory = async (
    categoryData: CreateCategoryDto
  ): Promise<ICategory> => {
    let category = await this.CategoryModel.create({ ...categoryData });
    console.log(category);
    return category;
  };

  public deleteCategory = async (categoryId: string): Promise<string> => {
    let category = await this.CategoryModel.findByIdAndDelete(categoryId);
    if (category == null) {
      throw new CategoryNotFoundException(categoryId);
    }
    return 'category deleted successfully';
  };

  public updateCategory = async (
    categoryData: updateCategoryDto,
    categoryId: string
  ): Promise<ICategory> => {
    const result = await CategoryModel.findByIdAndUpdate(
      categoryId,
      categoryData,
      {
        new: true,
      }
    );

    if (result == null) throw new CategoryNotFoundException(categoryId);

    return result;
  };
}

export default CategoryService;
