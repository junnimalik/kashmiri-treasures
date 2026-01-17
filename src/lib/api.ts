// API Base URL - use environment variable or fallback
// In production, this should be set in .env file
// Options:
// 1. Subdomain: https://api.kashmiricraft.com
// 2. Same domain: https://kashmiricraft.com (if Apache proxies /api to backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

  async getProducts(category?: string): Promise<Product[]> {
    const url = category 
      ? `${API_BASE_URL}/api/products?category=${category}`
      : `${API_BASE_URL}/api/products`;
    
    try {
      const response = await fetch(url, {
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(15000), // 15 second timeout
        credentials: 'include', // Include credentials for CORS
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}):`, errorText);
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('getProducts error:', error);
      if (error.name === 'AbortError') {
        throw new Error("Request timeout - please check your connection");
      }
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error(`Cannot connect to API at ${API_BASE_URL}. Please check if the backend is running.`);
      }
      throw error;
    }
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
