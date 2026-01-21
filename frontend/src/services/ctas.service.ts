import api from './api';
import { CTA, CreateCtaDto, UpdateCtaDto } from '../types/cta.types';

export const ctasService = {
  async getAll(): Promise<CTA[]> {
    const response = await api.get('/ctas');
    return response.data;
  },

  async getActive(): Promise<CTA | null> {
    const response = await api.get('/ctas/active');
    return response.data;
  },

  async getById(id: string): Promise<CTA> {
    const response = await api.get(`/ctas/${id}`);
    return response.data;
  },

  async create(data: CreateCtaDto): Promise<CTA> {
    const response = await api.post('/ctas', data);
    return response.data;
  },

  async update(id: string, data: UpdateCtaDto): Promise<CTA> {
    const response = await api.put(`/ctas/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/ctas/${id}`);
  },
};
