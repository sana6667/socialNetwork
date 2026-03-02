export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  city: string;
  intrestsId: string[];
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
  intrestsId: string[];
  geolocation: Geolocation | null; //null если пользователь не предоставил геолокацию
  lookingFor: string;
  photo: File | null;
};

type Interest = {
  id: string;
  name: string;
  icon: string;
};

type Geolocation = {
  lat: number;
  lng: number;
}

//#region TODO: delete test data

  export const allInterests: Interest[] = [
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'sport', name: 'Sport', icon: '⚽' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'cinema', name: 'Cinema', icon: '🎬' },
    { id: 'games', name: 'Games', icon: '🎮' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'cooking', name: 'Cooking', icon: '🍳' },
    { id: 'photo', name: 'Photography', icon: '📷' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'pets', name: 'Pets', icon: '🐾' },
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