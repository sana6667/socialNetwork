export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  fullName: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};


export type RegisterData = {
  name: string;
  city: string;
  intrests: string[];
  photo: File | null;
};