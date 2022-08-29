export type IAdmin = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type IAuthAdmin = {
  token: string;
  user: IAdmin;
};

export type IEmployee = {
  id?: number;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type IReview = {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type IFeedback = {
  id?: number;
  reviewId?: number | string;
  review?: IReview;
  giverId?: number | string;
  giver?: IEmployee;
  receiverId?: number | string;
  receiver?: IEmployee;
  content?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type ISelect = {
  key: any;
  value: any;
};
