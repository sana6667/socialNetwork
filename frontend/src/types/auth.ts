export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  city: string;
  intrestsId: number[];
  lookingFor: string;
  geolocation: Geolocation | null; //null если пользователь не предоставил геолокацию
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};


export type RegisterData = {
  email: string;
  password: string;
  name: string;
  city: string;
  //intrestsId: string[];
  intrestsId: number[];
  geolocation: Geolocation | null; //null если пользователь не предоставил геолокацию
  lookingFor: string;
  photo: File | null;
};

type Interest = {
  id: number;
  name: string;
  icon: string;
};

type Geolocation = {
  lat: number;
  lng: number;
}

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


  export const OPTIONS = [
  'Meet other people',
  'Stay with local hosts',
  'Find travel buddies',
  'Host other people',
  'Share accommodation',
  'Get tips & safety advise',
];
//#endregion