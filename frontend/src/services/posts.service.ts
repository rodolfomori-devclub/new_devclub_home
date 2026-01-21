import api from './api';
import { Post, CreatePostDto, UpdatePostDto, GenerateFromTopicDto, GenerateFromFaqDto, PostCategory, PostStatus } from '../types/post.types';

export const postsService = {
  // Admin endpoints
  async getAll(category?: PostCategory, status?: PostStatus, search?: string): Promise<Post[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const response = await api.get(`/posts?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async create(data: CreatePostDto): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async update(id: string, data: UpdatePostDto): Promise<Post> {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  async bulkDelete(ids: string[]): Promise<{ deleted: number }> {
    const response = await api.post('/posts/bulk-delete', { ids });
    return response.data;
  },

  async publish(id: string): Promise<Post> {
    const response = await api.post(`/posts/${id}/publish`);
    return response.data;
  },

  async unpublish(id: string): Promise<Post> {
    const response = await api.post(`/posts/${id}/unpublish`);
    return response.data;
  },

  async generateFromTopic(data: GenerateFromTopicDto): Promise<Post> {
    const response = await api.post('/posts/generate/topic', data);
    return response.data;
  },

  async generateFromFaq(data: GenerateFromFaqDto): Promise<Post> {
    const response = await api.post('/posts/generate/faq', data);
    return response.data;
  },

  // Public endpoints
  async getPublished(category?: PostCategory): Promise<Post[]> {
    const params = category ? `?category=${category}` : '';
    const response = await api.get(`/public/posts${params}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<Post> {
    const response = await api.get(`/public/posts/${slug}`);
    return response.data;
  },
};
