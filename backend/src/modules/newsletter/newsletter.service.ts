import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { SubscribeDto } from './dto/subscribe.dto';

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  active: boolean;
  subscribedAt: Date;
}

@Injectable()
export class NewsletterService {
  constructor(private firebaseService: FirebaseService) {}

  async subscribe(subscribeDto: SubscribeDto): Promise<{ message: string }> {
    // Check if already subscribed
    const existing = await this.firebaseService.subscribersCollection
      .where('email', '==', subscribeDto.email.toLowerCase())
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      const data = doc.data();

      if (data?.active) {
        throw new ConflictException('Email ja esta inscrito na newsletter');
      }

      // Reactivate subscription
      await doc.ref.update({
        active: true,
        name: subscribeDto.name || data?.name,
      });

      return { message: 'Inscricao reativada com sucesso!' };
    }

    // Create new subscription
    await this.firebaseService.subscribersCollection.add({
      email: subscribeDto.email.toLowerCase(),
      name: subscribeDto.name,
      active: true,
      subscribedAt: new Date(),
    });

    return { message: 'Inscrito com sucesso na newsletter!' };
  }

  async unsubscribe(email: string): Promise<{ message: string }> {
    const snapshot = await this.firebaseService.subscribersCollection
      .where('email', '==', email.toLowerCase())
      .get();

    if (snapshot.empty) {
      throw new NotFoundException('Email nao encontrado');
    }

    const doc = snapshot.docs[0];
    await doc.ref.update({ active: false });

    return { message: 'Descadastrado com sucesso' };
  }

  async findAll(): Promise<Subscriber[]> {
    const snapshot = await this.firebaseService.subscribersCollection
      .orderBy('subscribedAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subscribedAt: doc.data()?.subscribedAt?.toDate(),
    })) as Subscriber[];
  }

  async findActive(): Promise<Subscriber[]> {
    const snapshot = await this.firebaseService.subscribersCollection
      .where('active', '==', true)
      .orderBy('subscribedAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subscribedAt: doc.data()?.subscribedAt?.toDate(),
    })) as Subscriber[];
  }

  async exportToCsv(): Promise<string> {
    const subscribers = await this.findActive();

    const header = 'email,name,subscribedAt\n';
    const rows = subscribers
      .map(s => `${s.email},${s.name || ''},${s.subscribedAt?.toISOString() || ''}`)
      .join('\n');

    return header + rows;
  }

  async getStats(): Promise<{ total: number; active: number }> {
    const allSnapshot = await this.firebaseService.subscribersCollection.get();
    const activeSnapshot = await this.firebaseService.subscribersCollection
      .where('active', '==', true)
      .get();

    return {
      total: allSnapshot.size,
      active: activeSnapshot.size,
    };
  }
}
