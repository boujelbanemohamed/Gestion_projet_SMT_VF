import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';

interface UseApiOptions {
  immediate?: boolean;
  cache?: boolean;
  cacheTTL?: number; // en millisecondes
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Cache simple côté client
const apiCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void>; clearCache: () => void } {
  const { immediate = true, cache = false, cacheTTL = 5 * 60 * 1000 } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Vérifier le cache d'abord
    if (cache) {
      const cached = apiCache.get(url);
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        setState({
          data: cached.data,
          loading: false,
          error: null,
        });
        return;
      }
    }

    // Annuler la requête précédente si elle existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });

      const data = response.data;

      // Mettre en cache si activé
      if (cache) {
        apiCache.set(url, {
          data,
          timestamp: Date.now(),
          ttl: cacheTTL,
        });
      }

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return; // Requête annulée, ne pas mettre à jour l'état
      }

      setState({
        data: null,
        loading: false,
        error: error.response?.data?.error || error.message || 'Une erreur est survenue',
      });
    }
  }, [url, cache, cacheTTL]);

  const clearCache = useCallback(() => {
    apiCache.delete(url);
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, immediate]);

  return {
    ...state,
    refetch: fetchData,
    clearCache,
  };
}

// Hook spécialisé pour les données paginées
export function usePaginatedApi<T>(
  baseUrl: string,
  page: number = 1,
  limit: number = 10,
  search?: string
) {
  const url = `${baseUrl}?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
  
  return useApi<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>(url, { cache: true, cacheTTL: 2 * 60 * 1000 });
}

// Hook pour les mutations avec optimistic updates
export function useApiMutation<TData, TVariables = any>() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (
    method: 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: TVariables,
    optimisticUpdate?: () => void,
    onSuccess?: (data: TData) => void,
    onError?: (error: any) => void
  ) => {
    setState({ loading: true, error: null });

    // Appliquer l'optimistic update
    if (optimisticUpdate) {
      optimisticUpdate();
    }

    try {
      const response = await api.request({
        method,
        url,
        data,
      });

      setState({ loading: false, error: null });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error: any) {
      setState({
        loading: false,
        error: error.response?.data?.error || error.message || 'Une erreur est survenue',
      });

      if (onError) {
        onError(error);
      }

      throw error;
    }
  }, []);

  return {
    ...state,
    mutate,
  };
}
