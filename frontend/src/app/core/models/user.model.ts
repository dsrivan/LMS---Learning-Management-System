export type UserRole = 'ADMIN' | 'STUDENT';

export interface UserRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
}
