export interface ICategoriesRepository {
  getCategories(): Promise<string[]>;
}

export interface ICategoryService {
  getCategories(): Promise<string[]>;
} 
