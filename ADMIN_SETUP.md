# Admin Panel Setup Guide

This guide will help you set up and use the admin panel for managing products in Kashmiri Treasures.

## Quick Start

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

5. **Set up MySQL database:**
   ```sql
   CREATE DATABASE kashmiri_treasures CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

6. Edit `.env` and configure:
   ```
   SECRET_KEY=your-secret-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   DATABASE_URL=mysql+pymysql://username:password@localhost/kashmiri_treasures
   UPLOAD_DIR=../public/uploads
   ```
   
   Replace `username` and `password` with your MySQL credentials.

7. Create uploads directory:
   ```bash
   mkdir -p ../public/uploads
   ```

8. Start the backend server:
   ```bash
   python main.py
   ```
   
   Or use the start script:
   ```bash
   ./start.sh
   ```

   The API will run on `http://localhost:8000`

### 2. Frontend Setup

1. Make sure the frontend dependencies are installed:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory (optional):
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:8080`

### 3. Access Admin Panel

1. Navigate to `http://localhost:8080/admin` in your browser
2. Login with the credentials you set in the backend `.env` file:
   - Username: `admin` (or your configured username)
   - Password: Your configured password

## Features

### Product Management

- **Add Products**: Click "Add Product" to create new products
- **Edit Products**: Click the edit icon on any product row
- **Delete Products**: Click the delete icon (with confirmation)
- **View Products**: All products are displayed in a table

### Product Form Fields

- **Name**: Product name (required)
- **Description**: Detailed product description (required)
- **Category**: Select from Shawls, Pherans, Handbags, Dry Fruits, or Gift Hampers
- **Price**: Product price in ₹ (required)
- **Original Price**: Original price for showing discounts (optional)
- **Rating**: Product rating (0-5)
- **Reviews**: Number of reviews
- **In Stock**: Toggle stock availability
- **Artisan Story**: Story about the artisan (optional)
- **Variants**: JSON format for product variants (e.g., colors, sizes)
- **Details**: JSON format for product details (e.g., material, origin)
- **Main Image**: Primary product image (required for new products)
- **Additional Images**: Multiple images for product gallery

### JSON Format Examples

**Variants:**
```json
[
  {
    "name": "Color",
    "options": ["Red", "Blue", "Green"]
  },
  {
    "name": "Size",
    "options": ["S", "M", "L", "XL"]
  }
]
```

**Details:**
```json
{
  "material": "100% Pure Pashmina",
  "dimensions": "70cm x 200cm",
  "weight": "250g",
  "origin": "Srinagar, Kashmir",
  "careInstructions": "Dry clean only"
}
```

## API Endpoints

The backend provides the following endpoints:

- `POST /api/auth/login` - Admin login
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/{id}` - Update product (requires auth)
- `DELETE /api/products/{id}` - Delete product (requires auth)

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify all dependencies are installed
- Check `.env` file exists and is configured correctly

### Can't login
- Verify credentials in backend `.env` file
- Check backend server is running
- Check browser console for errors

### Images not uploading
- Verify `UPLOAD_DIR` in `.env` points to correct directory
- Check directory permissions
- Ensure directory exists

### CORS errors
- Verify frontend URL is in CORS allowed origins in `backend/main.py`
- Check API URL in frontend `.env` or `src/lib/api.ts`

## Security Notes

⚠️ **Important for Production:**

1. Change default admin credentials
2. Use a strong `SECRET_KEY` (generate with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`)
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Consider adding rate limiting
6. Implement proper user management system
7. Use a production database (PostgreSQL) instead of SQLite

## Support

For issues or questions, check:
- Backend API docs: `http://localhost:8000/docs`
- Backend README: `backend/README.md`
