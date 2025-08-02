import { Request, Response } from 'express';
import { FirestoreService } from '../services/firestore.js';
import { LinkPreviewService } from '../services/linkpreview.js';
import { ResourceFormData } from '../types/index.js';

export class ResourceController {
  static async createResource(req: Request, res: Response) {
    try {
      const { title, type, url, tags }: ResourceFormData = req.body;

      // Basic validation
      if (!title || !type || !url) {
        return res.status(400).json({
          error: 'Missing required fields: title, type, and url are required'
        });
      }

      // Validate tags if provided
      if (tags && (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string'))) {
        return res.status(400).json({
          error: 'Tags must be an array of strings'
        });
      }

      // Validate resource type
      const validTypes = ['Video', 'Article', 'Book', 'Tool'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: 'Invalid resource type. Must be one of: Video, Article, Book, Tool'
        });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({
          error: 'Invalid URL format'
        });
      }

      // Attempt to fetch link preview data (optional - don't fail if it doesn't work)
      let previewData: any = {};
      try {
        previewData = await LinkPreviewService.getPreview(url);
      } catch (error: any) {
        console.warn('Link preview failed, continuing without preview data:', error?.message || error);
        // Continue with empty preview data - resource creation should still work
      }
      
      // Prepare resource data, filtering out undefined values
      const resourceData: any = {
        title, 
        type, 
        url,
        tags: tags || []
      };

      // Only add description and image if they exist
      if (previewData.description) {
        resourceData.description = previewData.description;
      }
      if (previewData.image) {
        resourceData.image = previewData.image;
      }

      const newResource = await FirestoreService.createResource(resourceData);
      
      res.status(201).json({
        message: 'Resource created successfully',
        resource: newResource
      });
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  static async getResources(req: Request, res: Response) {
    try {
      const resources = await FirestoreService.getAllResources();
      res.json(resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}