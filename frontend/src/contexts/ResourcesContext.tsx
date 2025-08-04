import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ApiResource, apiService } from '@/services/api';

interface ResourcesContextType {
  resources: ApiResource[];
  loading: boolean;
  error: string | null;
  refreshResources: () => Promise<void>;
  addResource: (resource: ApiResource) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourcesProvider');
  }
  return context;
};

interface ResourcesProviderProps {
  children: ReactNode;
}

export const ResourcesProvider: React.FC<ResourcesProviderProps> = ({ children }) => {
  const [resources, setResources] = useState<ApiResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedResources = await apiService.getResources();
      setResources(fetchedResources);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
      setError('Failed to load resources');
      // Fallback to default resources if API fails
      setResources([
        {
          id: '1',
          title: 'React Documentation',
          type: 'Article',
          url: 'https://reactjs.org/docs',
          description: 'Official React documentation',
          image: '',
          tags: ['react', 'frontend'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'TypeScript Handbook',
          type: 'Article',
          url: 'https://www.typescriptlang.org/docs/',
          description: 'Official TypeScript documentation',
          image: '',
          tags: ['typescript', 'javascript'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addResource = useCallback((resource: ApiResource) => {
    setResources(prev => [resource, ...prev]);
  }, []);

  const value: ResourcesContextType = {
    resources,
    loading,
    error,
    refreshResources,
    addResource,
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};