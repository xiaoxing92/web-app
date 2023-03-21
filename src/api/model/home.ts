export interface ListData {
  title: string;
  classify: string;
  img: string;
  num?: number;
  keyWord?: string;
  userRatingCount?: number;
  averageUserRating?: string;
}

export interface ApiParams {
  size: number;
}
