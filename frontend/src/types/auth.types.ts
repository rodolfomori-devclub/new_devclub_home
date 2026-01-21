import { User } from 'firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  active: boolean;
  subscribedAt: Date | string;
}
