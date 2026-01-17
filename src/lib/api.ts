// API Base URL - use environment variable or fallback
// In production, this should be set in .env file
// Options:
// 1. Subdomain: https://api.kashmiricraft.com
// 2. Same domain: https://kashmiricraft.com (if Apache proxies /api to backend)
// 
// IMPORTANT: Based on Apache config, use SAME DOMAIN (https://kashmiricraft.com)
// The subdomain (api.kashmiricraft.com) may not be accessible from all networks
function getApiBaseUrl(): string {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Auto-detect: if we're on production domain, use same domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'kashmiricraft.com' || hostname === 'www.kashmiricraft.com') {
      // Use same domain since Apache proxies /api
      return `${window.location.protocol}//${hostname}`;
    }
  }
  
  // Fallback to localhost for development
  return "http://localhost:8000";
}

const API_BASE_URL = getApiBaseUrl();

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'shawls' | 'pherans' | 'handbags' | 'dry-fruits' | 'gift-hampers';
  rating: number;
  reviews: number;
  inStock: boolean;
  variants?: { name: string; options: string[] }[];
  details?: Record<string, any>;
  artisanStory?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem("admin_token");
  }

  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    
    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("admin_token", data.access_token);
    return data;
  }

  logout(): void {
    localStorage.removeItem("admin_token");
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 second timeout for health check
        cache: 'no-cache',
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async getProducts(category?: string, retries = 2): Promise<Product[]> {
    const url = category 
      ? `${API_BASE_URL}/api/products?category=${category}`
      : `${API_BASE_URL}/api/products`;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Create AbortController for better timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch(url, {
          headers: this.getHeaders(),
          signal: controller.signal,
          credentials: 'include',
          cache: 'no-cache', // Prevent caching issues
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Error (${response.status}):`, errorText);
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        return response.json();
      } catch (error: any) {
        console.error(`getProducts error (attempt ${attempt + 1}/${retries + 1}):`, error);
        
        // If it's the last attempt, throw the error
        if (attempt === retries) {
          if (error.name === 'AbortError' || error.message?.includes('timeout')) {
            throw new Error("Request timeout - the server is taking too long to respond. Please check your connection and try again.");
          }
          if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError') || error.message?.includes('CORS')) {
            throw new Error(`Cannot connect to API at ${API_BASE_URL}. Please check if the backend is running and accessible.`);
          }
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
    
    throw new Error("Failed to fetch products after multiple attempts");
  }

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  }

  async createProduct(formData: FormData): Promise<Product> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      // Handle validation errors (422)
      if (response.status === 422 && error.detail) {
        const errorMessages = Array.isArray(error.detail) 
          ? error.detail.map((e: any) => `${e.loc?.join('.')}: ${e.msg}`).join(', ')
          : JSON.stringify(error.detail);
        throw new Error(`Validation error: ${errorMessages}`);
      }
      throw new Error(error.detail || error.message || "Failed to create product");
    }

    return response.json();
  }

  async updateProduct(id: string, formData: FormData): Promise<Product> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update product");
    }

    return response.json();
  }

  async deleteProduct(id: string): Promise<void> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  }
}

export const apiService = new ApiService();
