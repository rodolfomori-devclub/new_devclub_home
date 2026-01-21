import api from './api';
import { Subscriber } from '../types/auth.types';

export const newsletterService = {
  // Public endpoints
  async subscribe(email: string, name?: string): Promise<{ message: string }> {
    const response = await api.post('/newsletter/subscribe', { email, name });
    return response.data;
  },

  async unsubscribe(email: string): Promise<{ message: string }> {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  // Admin endpoints
  async getSubscribers(): Promise<Subscriber[]> {
    const response = await api.get('/newsletter/subscribers');
    return response.data;
  },

  async getActiveSubscribers(): Promise<Subscriber[]> {
    const response = await api.get('/newsletter/subscribers/active');
    return response.data;
  },

  async getStats(): Promise<{ total: number; active: number }> {
    const response = await api.get('/newsletter/stats');
    return response.data;
  },

  async exportCsv(): Promise<Blob> {
    const response = await api.get('/newsletter/export', {
      responseType: 'blob',
    });
    return response.data;
  },

  async removeSubscriber(id: string): Promise<void> {
    await api.delete(`/newsletter/subscribers/${id}`);
  },
};
