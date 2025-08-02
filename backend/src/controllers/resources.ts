import { Request, Response } from 'express';
import { FirestoreService } from '../services/firestore.js';
import { ResourceFormData } from '../types/index.js';

export class ResourceController {
  static async createResource(req: Request, res: Response) {
    try {
      const { title, type, url }: ResourceFormData = req.body;

      // Basic validation
      if (!title || !type || !url) {
        return res.status(400).json({
          error: 'Missing required fields: title, type, and url are required'
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

      const newResource = await FirestoreService.createResource({ title, type, url });
      
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