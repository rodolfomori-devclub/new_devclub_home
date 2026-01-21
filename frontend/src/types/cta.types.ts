export interface CTA {
  id: string;
  title: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  buttonText?: string;
  redirectUrl: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateCtaDto {
  title: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  buttonText?: string;
  redirectUrl: string;
  active?: boolean;
}

export interface UpdateCtaDto {
  title?: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  buttonText?: string;
  redirectUrl?: string;
  active?: boolean;
}
