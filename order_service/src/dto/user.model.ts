declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface User {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
