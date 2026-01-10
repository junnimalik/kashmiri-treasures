# Kashmiri Treasures Backend API

Python FastAPI backend for managing products in the Kashmiri Treasures e-commerce platform.

## Features

- RESTful API for product management (CRUD operations)
- Image upload and storage
- JWT-based authentication for admin panel
- MySQL database (can be easily switched to PostgreSQL or SQLite)
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or using a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and set your configuration:

```
SECRET_KEY=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
DATABASE_URL=mysql+pymysql://username:password@localhost/kashmiri_treasures
UPLOAD_DIR=../public/uploads
```

**MySQL Setup:**
1. Create a MySQL database:
   ```sql
   CREATE DATABASE kashmiri_treasures;
   ```
2. Update `DATABASE_URL` with your MySQL credentials:
   ```
   DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/kashmiri_treasures
   ```

**Important**: Change the `SECRET_KEY` and `ADMIN_PASSWORD` in production!

### 3. Create Upload Directory

```bash
mkdir -p ../public/uploads
```

### 4. Run the Server

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info (requires auth)

### Products

- `GET /api/products` - Get all products (optional `?category=shawls` filter)
- `GET /api/products/{product_id}` - Get single product
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/{product_id}` - Update product (requires auth)
- `DELETE /api/products/{product_id}` - Delete product (requires auth)

### Health Check

- `GET /api/health` - Check API status

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Frontend Integration

The frontend should be configured to use the API. Set the environment variable:

```bash
VITE_API_URL=http://localhost:8000
```

Or update `src/lib/api.ts` to use the correct API URL.

## Database

The default database is MySQL. Make sure MySQL is installed and running, then create the database:

```sql
CREATE DATABASE kashmiri_treasures CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

The database tables are created automatically on first run.

**Alternative Databases:**

To use SQLite instead, update `DATABASE_URL` in `.env`:
```
DATABASE_URL=sqlite:///./kashmiri_treasures.db
```

To use PostgreSQL instead, update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://user:password@localhost/kashmiri_treasures
```

## Security Notes

- Change default admin credentials in production
- Use a strong `SECRET_KEY` for JWT tokens
- Consider using environment-specific configurations
- Implement rate limiting for production
- Use HTTPS in production
- Consider adding more robust authentication (OAuth, etc.)
