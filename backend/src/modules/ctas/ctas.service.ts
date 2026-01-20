import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { CreateCtaDto, UpdateCtaDto } from './dto/create-cta.dto';

export interface CTA {
  id: string;
  title: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  buttonText?: string;
  redirectUrl: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CtasService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createCtaDto: CreateCtaDto): Promise<CTA> {
    const now = new Date();
    const ctaData = {
      ...createCtaDto,
      active: createCtaDto.active ?? true,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await this.firebaseService.ctasCollection.add(ctaData);
    const doc = await docRef.get();
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt || now,
      updatedAt: data?.updatedAt || now,
    } as CTA;
  }

  async findAll(): Promise<CTA[]> {
    const snapshot = await this.firebaseService.ctasCollection
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
      };
    }) as CTA[];
  }

  async findActive(): Promise<CTA | null> {
    const snapshot = await this.firebaseService.ctasCollection
      .where('active', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    } as CTA;
  }

  async findOne(id: string): Promise<CTA> {
    const doc = await this.firebaseService.ctasCollection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('CTA nao encontrado');
    }

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    } as CTA;
  }

  async update(id: string, updateCtaDto: UpdateCtaDto): Promise<CTA> {
    const docRef = this.firebaseService.ctasCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('CTA nao encontrado');
    }

    const updateData = {
      ...updateCtaDto,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const docRef = this.firebaseService.ctasCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('CTA nao encontrado');
    }

    await docRef.delete();
  }
}
