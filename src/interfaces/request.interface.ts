import { Request } from 'express';

export interface Person {
    id: number;   
    email: string;   
}

export interface AuthRequest extends Request {
  user: Person;
}
