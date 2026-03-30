export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username : string;
  password: string;
  city: string;
  name: string;
  intrestsId: number[];
  lookingForid: number;
  Latitude: number;
  Longitude: number;
  
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};


export type RegisterData = {
  username: string; 
  password: string;
  name: string;
  city: string;
  intrestsId: number[];
  lookingForId: number;
  Latitude: number;
  Longitude: number;
  photo: File | null;
};

type Interest = {
  id: number;
  name: string;
  icon: string;
};

//#region TODO: delete test data

  export const allInterests: Interest[] = [
    { id: 1, name: 'Music', icon: '🎵' },
    { id: 2, name: 'Sport', icon: '⚽' },
    { id: 3, name: 'Travel', icon: '✈️' },
    { id: 4, name: 'Cinema', icon: '🎬' },
    { id: 5, name: 'Games', icon: '🎮' },
    { id: 6, name: 'Books', icon: '📚' },
    { id: 7, name: 'Cooking', icon: '🍳' },
    { id: 8, name: 'Photography', icon: '📷' },
    { id: 9, name: 'Art', icon: '🎨' },
    { id: 10, name: 'Technology', icon: '💻' },
    { id: 11, name: 'Fashion', icon: '👗' },
    { id: 12, name: 'Pets', icon: '🐾' },
  ];

  export type Look = {
    id: number,
    value: string,
  }

  export const OPTIONS: Look[] = [
    { id: 1, value: 'Meet other people' },
    { id: 2, value: 'Stay with local hosts' },
    { id: 3, value: 'Find travel buddies' },
    { id: 4, value: 'Host other people' },
    { id: 5, value: 'Share accommodation' },
    { id: 6, value: 'Get tips & safety advise' },
  ];
//#endregion