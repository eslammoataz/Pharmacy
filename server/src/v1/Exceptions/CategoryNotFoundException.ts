import HttpException from './HttpException';

class CategoryNotFoundException extends HttpException {
  constructor(categoryID: string) {
    super(404, `Category with this ${categoryID} does not Exists`);
  }
}

export default CategoryNotFoundException;
