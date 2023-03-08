export interface IUser {
  id?: string;
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'client' | 'super-user' | 'seo';
  createdAt?: string;
  updatedAt?: string;
}
