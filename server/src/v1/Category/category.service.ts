import * as bcrypt from 'bcrypt';
import { CategoryModel, ICategory } from './category.model';
import UserWithThatEmailAlreadyExistsException from '../Exceptions/UserWithThatEmailAlreadyExistsException';
import CreateCategoryDto from './dto/createCategoryDto';
import CategoryNotFoundException from '../Exceptions/CategoryNotFoundException';
import updateCategoryDto from './dto/updateCategoryDto';

class CategoryService {
  private CategoryModel = CategoryModel;

  public getAllCategories = async (): Promise<ICategory[]> => {
    let categories = await this.CategoryModel.find().populate('products');
    return categories;
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
