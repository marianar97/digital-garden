export interface ResourceFormData {
  title: string;
  type: 'Video' | 'Article' | 'Book' | 'Tool';
  url: string;
  tags?: string[];
}

export interface StoredResource extends ResourceFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  image?: string;
  tags?: string[];
}