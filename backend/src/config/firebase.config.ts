import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
} from 'firebase/firestore';

// Custom Auth interface for development (Client SDK doesn't support server-side token verification)
class DevAuth {
  async verifyIdToken(token: string) {
    // In development, accept any token
    // In production, you'd need Firebase Admin SDK or a different approach
    if (token && token.length > 0) {
      return { uid: 'dev-user', email: 'admin@devclub.com' };
    }
    throw new Error('Invalid token');
  }

  async getUser(uid: string) {
    return { uid, email: 'admin@devclub.com' };
  }
}

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private app: FirebaseApp;
  private db: Firestore;
  private devAuth: DevAuth;

  constructor(private configService: ConfigService) {
    this.devAuth = new DevAuth();
  }

  onModuleInit() {
    const firebaseConfig = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY') || 'AIzaSyDSMmdG7wIllmpCJ4xB82EdhRkqFl6srFU',
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN') || 'devclub-institucional.firebaseapp.com',
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID') || 'devclub-institucional',
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET') || 'devclub-institucional.firebasestorage.app',
      messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID') || '730738490619',
      appId: this.configService.get<string>('FIREBASE_APP_ID') || '1:730738490619:web:7b07aec49b34637264445e',
    };

    // Initialize Firebase (only once)
    this.app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    this.db = getFirestore(this.app);

    this.logger.log('Firebase Client SDK initialized successfully');
    this.logger.log(`Connected to project: ${firebaseConfig.projectId}`);
  }

  get auth(): DevAuth {
    return this.devAuth;
  }

  get firestore(): Firestore {
    return this.db;
  }

  // Helper to convert Firestore Timestamp to Date
  private convertTimestamp(data: DocumentData | undefined): any {
    if (!data) return data;
    const result = { ...data };
    for (const key in result) {
      if (result[key]?.toDate) {
        result[key] = result[key].toDate();
      }
    }
    return result;
  }

  // Posts Collection
  get postsCollection() {
    const db = this.db;
    const postsRef = collection(db, 'posts');
    const self = this;

    return {
      add: async (data: any) => {
        const now = new Date();
        const docRef = await addDoc(postsRef, {
          ...data,
          createdAt: now,
          updatedAt: now,
        });
        return {
          id: docRef.id,
          get: async () => {
            const snapshot = await getDoc(docRef);
            return {
              exists: snapshot.exists(),
              id: snapshot.id,
              data: () => self.convertTimestamp(snapshot.data()),
            };
          },
        };
      },
      doc: (id: string) => {
        const docRef = doc(db, 'posts', id);
        return {
          get: async () => {
            const snapshot = await getDoc(docRef);
            return {
              exists: snapshot.exists(),
              id: snapshot.id,
              data: () => self.convertTimestamp(snapshot.data()),
            };
          },
          update: async (data: any) => {
            await updateDoc(docRef, {
              ...data,
              updatedAt: new Date(),
            });
          },
          delete: async () => {
            await deleteDoc(docRef);
          },
        };
      },
      where: (field: string, op: any, value: any) => {
        return {
          get: async () => {
            const q = query(postsRef, where(field, op, value));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
              })),
              empty: snapshot.empty,
            };
          },
          where: (f2: string, o2: any, v2: any) => ({
            get: async () => {
              const q = query(postsRef, where(field, op, value), where(f2, o2, v2));
              const snapshot = await getDocs(q);
              return {
                docs: snapshot.docs.map(d => ({
                  id: d.id,
                  data: () => self.convertTimestamp(d.data()),
                })),
                empty: snapshot.empty,
              };
            },
            orderBy: (obField: string, obDirection: 'asc' | 'desc' = 'desc') => ({
              get: async () => {
                const q = query(postsRef, where(field, op, value), where(f2, o2, v2), orderBy(obField, obDirection));
                const snapshot = await getDocs(q);
                return {
                  docs: snapshot.docs.map(d => ({
                    id: d.id,
                    data: () => self.convertTimestamp(d.data()),
                  })),
                  empty: snapshot.empty,
                };
              },
            }),
          }),
          orderBy: (obField: string, obDirection: 'asc' | 'desc' = 'desc') => ({
            get: async () => {
              const q = query(postsRef, where(field, op, value), orderBy(obField, obDirection));
              const snapshot = await getDocs(q);
              return {
                docs: snapshot.docs.map(d => ({
                  id: d.id,
                  data: () => self.convertTimestamp(d.data()),
                })),
                empty: snapshot.empty,
              };
            },
          }),
        };
      },
      orderBy: (field: string, direction: 'asc' | 'desc' = 'desc') => {
        return {
          get: async () => {
            const q = query(postsRef, orderBy(field, direction));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
              })),
              empty: snapshot.empty,
            };
          },
          limit: (n: number) => ({
            get: async () => {
              const q = query(postsRef, orderBy(field, direction), limit(n));
              const snapshot = await getDocs(q);
              return {
                docs: snapshot.docs.map(d => ({
                  id: d.id,
                  data: () => self.convertTimestamp(d.data()),
                })),
                empty: snapshot.empty,
              };
            },
          }),
        };
      },
      get: async () => {
        const snapshot = await getDocs(postsRef);
        return {
          docs: snapshot.docs.map(d => ({
            id: d.id,
            data: () => self.convertTimestamp(d.data()),
          })),
          empty: snapshot.empty,
        };
      },
    };
  }

  // CTAs Collection
  get ctasCollection() {
    const db = this.db;
    const ctasRef = collection(db, 'cta');
    const self = this;

    return {
      add: async (data: any) => {
        const now = new Date();
        const docRef = await addDoc(ctasRef, {
          ...data,
          createdAt: now,
          updatedAt: now,
        });
        return {
          id: docRef.id,
          get: async () => {
            const snapshot = await getDoc(docRef);
            return {
              exists: snapshot.exists(),
              id: snapshot.id,
              data: () => self.convertTimestamp(snapshot.data()),
            };
          },
        };
      },
      doc: (id: string) => {
        const docRef = doc(db, 'cta', id);
        return {
          get: async () => {
            const snapshot = await getDoc(docRef);
            return {
              exists: snapshot.exists(),
              id: snapshot.id,
              data: () => self.convertTimestamp(snapshot.data()),
            };
          },
          update: async (data: any) => {
            await updateDoc(docRef, {
              ...data,
              updatedAt: new Date(),
            });
          },
          delete: async () => {
            await deleteDoc(docRef);
          },
        };
      },
      where: (field: string, op: any, value: any) => {
        return {
          get: async () => {
            const q = query(ctasRef, where(field, op, value));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
              })),
              empty: snapshot.empty,
            };
          },
          orderBy: (obField: string, obDirection: 'asc' | 'desc' = 'desc') => ({
            get: async () => {
              const q = query(ctasRef, where(field, op, value), orderBy(obField, obDirection));
              const snapshot = await getDocs(q);
              return {
                docs: snapshot.docs.map(d => ({
                  id: d.id,
                  data: () => self.convertTimestamp(d.data()),
                })),
                empty: snapshot.empty,
              };
            },
            limit: (n: number) => ({
              get: async () => {
                const q = query(ctasRef, where(field, op, value), orderBy(obField, obDirection), limit(n));
                const snapshot = await getDocs(q);
                return {
                  docs: snapshot.docs.map(d => ({
                    id: d.id,
                    data: () => self.convertTimestamp(d.data()),
                  })),
                  empty: snapshot.empty,
                };
              },
            }),
          }),
        };
      },
      orderBy: (field: string, direction: 'asc' | 'desc' = 'desc') => {
        return {
          get: async () => {
            const q = query(ctasRef, orderBy(field, direction));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
              })),
              empty: snapshot.empty,
            };
          },
        };
      },
      get: async () => {
        const snapshot = await getDocs(ctasRef);
        return {
          docs: snapshot.docs.map(d => ({
            id: d.id,
            data: () => self.convertTimestamp(d.data()),
          })),
          empty: snapshot.empty,
        };
      },
    };
  }

  // Subscribers Collection
  get subscribersCollection() {
    const db = this.db;
    const subscribersRef = collection(db, 'subscribers');
    const self = this;

    return {
      add: async (data: any) => {
        const docRef = await addDoc(subscribersRef, {
          ...data,
          subscribedAt: new Date(),
          active: true,
        });
        return { id: docRef.id };
      },
      doc: (id: string) => {
        const docRef = doc(db, 'subscribers', id);
        return {
          get: async () => {
            const snapshot = await getDoc(docRef);
            return {
              exists: snapshot.exists(),
              id: snapshot.id,
              data: () => self.convertTimestamp(snapshot.data()),
            };
          },
          update: async (data: any) => {
            await updateDoc(docRef, data);
          },
          delete: async () => {
            await deleteDoc(docRef);
          },
        };
      },
      where: (field: string, op: any, value: any) => {
        return {
          get: async () => {
            const q = query(subscribersRef, where(field, op, value));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
                ref: {
                  update: async (updateData: any) => {
                    await updateDoc(doc(db, 'subscribers', d.id), updateData);
                  },
                },
              })),
              empty: snapshot.empty,
              size: snapshot.size,
            };
          },
          orderBy: (obField: string, obDirection: 'asc' | 'desc' = 'desc') => ({
            get: async () => {
              const q = query(subscribersRef, where(field, op, value), orderBy(obField, obDirection));
              const snapshot = await getDocs(q);
              return {
                docs: snapshot.docs.map(d => ({
                  id: d.id,
                  data: () => self.convertTimestamp(d.data()),
                  ref: {
                    update: async (updateData: any) => {
                      await updateDoc(doc(db, 'subscribers', d.id), updateData);
                    },
                  },
                })),
                empty: snapshot.empty,
                size: snapshot.size,
              };
            },
          }),
        };
      },
      orderBy: (field: string, direction: 'asc' | 'desc' = 'desc') => {
        return {
          get: async () => {
            const q = query(subscribersRef, orderBy(field, direction));
            const snapshot = await getDocs(q);
            return {
              docs: snapshot.docs.map(d => ({
                id: d.id,
                data: () => self.convertTimestamp(d.data()),
                ref: {
                  update: async (updateData: any) => {
                    await updateDoc(doc(db, 'subscribers', d.id), updateData);
                  },
                },
              })),
              empty: snapshot.empty,
              size: snapshot.size,
            };
          },
        };
      },
      get: async () => {
        const snapshot = await getDocs(subscribersRef);
        return {
          docs: snapshot.docs.map(d => ({
            id: d.id,
            data: () => self.convertTimestamp(d.data()),
            ref: {
              update: async (updateData: any) => {
                await updateDoc(doc(db, 'subscribers', d.id), updateData);
              },
            },
          })),
          empty: snapshot.empty,
          size: snapshot.size,
        };
      },
    };
  }
}
