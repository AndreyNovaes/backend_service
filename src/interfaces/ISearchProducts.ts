export interface IProduct {
  id: string;
  category: string;
  description: string;
  price: number;
  image: string;
  link: string;
  website: string;
}

export interface IPaginatedProducts {
  data: IProduct[];
  total: number;
}


export interface ISearchParams {
  website?: string;
  category?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface ISearchProductsRepository {
  getSearchProducts(
    { website, category, search }: ISearchParams,
    page?: number,
    limit?: number
  ): Promise<IPaginatedProducts>;
}


export interface ISearchProductsService {
  getSearchProducts(
    website?: string,
    category?: string,
    search?: string,
    page?: number,
    limit?: number
  ): Promise<IPaginatedProducts>;
}
