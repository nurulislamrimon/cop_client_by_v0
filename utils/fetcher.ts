// utils/fetcher.ts

type FetcherOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: HeadersInit;
    body?: any;
    timeout?: number; // in milliseconds
    authToken?: string;
  };
  
  export async function fetcher<T = any>(
    url: string,
    options: FetcherOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 10000,
      authToken,
    } = options;
  
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
  
      clearTimeout(id);
  
      if (!res.ok) {
        const errorDetails = await res.json().catch(() => ({}));
        throw new Error(
          `Fetch error: ${res.status} ${res.statusText} - ${JSON.stringify(
            errorDetails
          )}`
        );
      }
  
      const data: T = await res.json();
      return data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Request timeout: The request took too long to complete.');
      }
      console.error('Fetch error:', err);
      throw err;
    }
  }
  