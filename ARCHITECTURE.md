# Kashmiri Treasures - System Architecture

## Overview

Kashmiri Treasures is a full-stack e-commerce platform built with modern web technologies, featuring cloud-based image storage for scalability and performance.

## Production URLs

- **Web Frontend**: `https://kashmiricraft.com`
- **Backend API**: `https://api.kashmiricraft.com` (or configured subdomain)
- **Admin Panel**: `https://kashmiricraft.com/admin`

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────┐      │
│  │   Web Frontend   │              │  Mobile App      │      │
│  │   (React/TS)     │              │  (React Native)  │      │
│  │   kashmiricraft.com │              │                  │      │
│  └────────┬─────────┘              └────────┬─────────┘      │
│           │                                   │                 │
│           │ HTTP/HTTPS                        │ HTTP/HTTPS      │
│           │                                   │                 │
└───────────┼───────────────────────────────────┼─────────────────┘
            │                                   │
            │                                   │
┌───────────┼───────────────────────────────────┼─────────────────┐
│           │                                   │                 │
│  ┌────────▼─────────┐              ┌─────────▼─────────┐      │
│  │  FastAPI Backend │              │  FastAPI Backend  │      │
│  │  (Python)        │              │  (Python)         │      │
│  │  api.kashmiricraft.com │              │  api.kashmiricraft.com │      │
│  └────────┬─────────┘              └────────┬─────────┘      │
│           │                                   │                 │
│           │                                   │                 │
└───────────┼───────────────────────────────────┼─────────────────┘
            │                                   │
            │                                   │
┌───────────┼───────────────────────────────────┼─────────────────┐
│           │                                   │                 │
│  ┌────────▼─────────┐              ┌─────────▼─────────┐      │
│  │  Google Cloud    │              │  Amazon S3       │      │
│  │  Storage (GCS)   │              │  Storage         │      │
│  │                  │              │                  │      │
│  │  • Product Images│              │  • Product Images│      │
│  │  • Web Assets    │              │  • Mobile Assets │      │
│  │  • CDN Enabled   │              │  • CDN Enabled   │      │
│  └──────────────────┘              └──────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              MySQL Database                               │ │
│  │  • Products                                               │ │
│  │  • Users                                                  │ │
│  │  • Orders                                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (Web)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6

### Frontend (Mobile)
- **Framework**: React Native (future implementation)
- **State Management**: Redux or Context API
- **Navigation**: React Navigation

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MySQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multipart form data

### Storage Architecture

#### Web Platform - Google Cloud Storage (GCS)
- **Purpose**: Store and serve product images for web platform
- **Benefits**:
  - High availability and durability
  - Global CDN integration
  - Cost-effective for web assets
  - Easy integration with Google Cloud services
  - Automatic image optimization
- **Bucket Structure**:
  ```
  gs://kashmiri-treasures-web/
  ├── products/
  │   ├── shawls/
  │   ├── pherans/
  │   ├── handbags/
  │   ├── dry-fruits/
  │   └── gift-hampers/
  └── assets/
      ├── hero-images/
      └── category-banners/
  ```

#### Mobile Platform - Amazon S3
- **Purpose**: Store and serve product images for mobile applications
- **Benefits**:
  - Optimized for mobile app delivery
  - AWS CloudFront CDN integration
  - Mobile-optimized image formats (WebP, AVIF)
  - Cost-effective for mobile traffic
  - Easy integration with AWS services
- **Bucket Structure**:
  ```
  s3://kashmiri-treasures-mobile/
  ├── products/
  │   ├── shawls/
  │   ├── pherans/
  │   ├── handbags/
  │   ├── dry-fruits/
  │   └── gift-hampers/
  └── thumbnails/
      └── [optimized-for-mobile]
  ```

## Data Flow

### Image Upload Flow (Web)
1. Admin uploads image via Admin Panel
2. Frontend sends image to FastAPI backend
3. Backend validates and processes image
4. Backend uploads to Google Cloud Storage (GCS)
5. GCS returns public URL
6. Backend stores URL in MySQL database
7. Frontend displays image from GCS CDN

### Image Upload Flow (Mobile)
1. Admin uploads image via Admin Panel (or mobile app)
2. Frontend/Mobile app sends image to FastAPI backend
3. Backend validates and processes image
4. Backend uploads to Amazon S3
5. S3 returns public URL (via CloudFront CDN)
6. Backend stores URL in MySQL database
7. Mobile app displays image from S3 CDN

### Product Retrieval Flow
1. Client (Web/Mobile) requests products
2. FastAPI queries MySQL database
3. Database returns product data with image URLs
4. Backend returns JSON response with:
   - Product metadata
   - GCS URLs (for web) or S3 URLs (for mobile)
5. Client renders products with images from respective CDN

## API Endpoints

**Base URL**: `https://api.kashmiricraft.com`

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products (with optional category filter)
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/{id}` - Update product (requires auth)
- `DELETE /api/products/{id}` - Delete product (requires auth)

## Database Schema

### Products Table
- `id` (String, Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Float)
- `original_price` (Float, nullable)
- `image` (String) - Main image URL (GCS or S3)
- `images` (JSON) - Array of additional image URLs
- `category` (String) - Enum: shawls, pherans, handbags, dry-fruits, gift-hampers
- `rating` (Float)
- `reviews` (Integer)
- `in_stock` (Boolean)
- `variants` (JSON, nullable)
- `details` (JSON, nullable)
- `artisan_story` (Text, nullable)
- `created_at` (DateTime)
- `updated_at` (DateTime)

## Security

- **Authentication**: JWT tokens with 30-minute expiration
- **CORS**: Configured for `kashmiricraft.com` and localhost (development)
- **File Upload**: Validated file types and sizes
- **SQL Injection**: Prevented via SQLAlchemy ORM
- **XSS**: Prevented via React's built-in escaping
- **HTTPS**: Enforced for production domain

## Deployment

### Web Frontend
- **Platform**: Deployed at `kashmiricraft.com`
- **Build**: `npm run build`
- **Output**: `dist/` directory

### Backend
- **Platform**: Deployed at `api.kashmiricraft.com`
- **Requirements**: Python 3.13+, MySQL database
- **Environment Variables**: 
  - `DATABASE_URL`
  - `SECRET_KEY`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `CORS_ORIGINS` (comma-separated list)
  - `GCS_BUCKET_NAME` (for web)
  - `S3_BUCKET_NAME` (for mobile)
  - `GCS_CREDENTIALS` (JSON)
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

## Future Enhancements

- [ ] Implement React Native mobile app
- [ ] Add image optimization pipeline
- [ ] Implement caching layer (Redis)
- [ ] Add order management system
- [ ] Implement payment gateway integration
- [ ] Add analytics and reporting
- [ ] Implement search functionality (Elasticsearch)
- [ ] Add multi-language support

## Environment Configuration

### Backend `.env` Example

**Production Configuration:**
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/kashmiri_treasures
SECRET_KEY=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
UPLOAD_DIR=../public/uploads

# Production Domain
FRONTEND_URL=https://kashmiricraft.com
API_URL=https://api.kashmiricraft.com

# CORS - Include production domain
CORS_ORIGINS=https://kashmiricraft.com,https://www.kashmiricraft.com,http://localhost:8082

# Google Cloud Storage (Web)
GCS_BUCKET_NAME=kashmiri-treasures-web
GCS_PROJECT_ID=your-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/gcs-credentials.json

# Amazon S3 (Mobile)
S3_BUCKET_NAME=kashmiri-treasures-mobile
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
```

**Development Configuration:**
```env
DATABASE_URL=mysql+pymysql://root:root@localhost/kashmiri_treasures
SECRET_KEY=dev-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
UPLOAD_DIR=../public/uploads

# Development URLs
FRONTEND_URL=http://localhost:8082
API_URL=http://localhost:8000

# CORS - Development only
CORS_ORIGINS=http://localhost:8080,http://localhost:8081,http://localhost:8082,http://localhost:5173
```

### Frontend `.env` Example

**Production Configuration:**
```env
VITE_API_URL=https://api.kashmiricraft.com
```

**Development Configuration:**
```env
VITE_API_URL=http://localhost:8000
```

## Image Storage Strategy

### Why Separate Storage?
- **GCS for Web**: Optimized for web delivery, integrates with Google services
- **S3 for Mobile**: Optimized for mobile apps, integrates with AWS mobile services
- **CDN Integration**: Both support CDN for fast global delivery
- **Cost Optimization**: Different pricing models suit different use cases
- **Scalability**: Both platforms scale automatically

### Image Optimization
- Automatic format conversion (WebP, AVIF)
- Responsive image sizes
- Lazy loading
- Thumbnail generation
