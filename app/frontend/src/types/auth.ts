export type LoginRequest = {
  email: string;
  password: string;
};

// === Payload для бэка (RegisterDto) ===
export type RegisterRequest = {
  username: string;
  password: string;
  name: string;
  city: string;
  interestIds: number[];   // <-- правильное имя
  priorityIds: number[];   // <-- правильное имя
};

// Ответ (оставляю типы как у тебя)
export type AuthResponse = {
  token: string;
  user: {
    id: number;   // если у тебя реально string GUID — поменяй на string
    email: string;
  };
};

// === Данные формы (UI) — НИЧЕГО НЕ ВЫКИДЫВАЕМ ===
export type RegisterData = {
  email: string;
  password: string;
  name: string;
  city: string;
  intrestsId: string[];           // UI хранит ключи интересов
  geolocation: Geolocation | null;
  lookingFor: string;
  photo: File | null;
  prioriryIds: number[];          // как у тебя в типе (опечатка сохранена)
};

type Interest = {
  id: string;     // ключ UI ('music', 'travel', ...)
  name: string;
  icon: string;
};

type Geolocation = {
  lat: number;
  lng: number;
};

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

// === Хелпер: маппинг string-ключей интересов в числовые id для backend ===
export const mapInterestKeysToIds = (keys: string[]): number[] => {
  // Пример маппинга: позиция в массиве + 1 → id
  const dict = Object.fromEntries(allInterests.map((x, i) => [x.id, i + 1]));
  return keys
    .map(k => dict[k])
    .filter((n): n is number => Number.isInteger(n));
};