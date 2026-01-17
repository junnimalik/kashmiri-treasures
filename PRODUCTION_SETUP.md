# Production Setup Guide for kashmiricraft.com

This guide will help you configure your application for production deployment at `kashmiricraft.com`.

## Quick Setup Checklist

- [ ] Configure backend CORS for production domain
- [ ] Set frontend API URL to production backend
- [ ] Update environment variables
- [ ] Test API connectivity
- [ ] Verify CORS is working

## Step 1: Backend Configuration

### 1.1 Create Backend `.env` File

Navigate to the `backend` directory and create a `.env` file:

```bash
cd backend
cp env.example .env
```

### 1.2 Update Backend `.env` for Production

Edit `backend/.env` and set:

```env
# Database (use your production MySQL credentials)
DATABASE_URL=mysql+pymysql://username:password@your-db-host/kashmiri_treasures

# Security (CHANGE THESE!)
SECRET_KEY=your-very-secure-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password

# File Uploads
UPLOAD_DIR=../public/uploads

# CORS - CRITICAL: Include your production domain
CORS_ORIGINS=https://kashmiricraft.com,https://www.kashmiricraft.com

# Optional: Cloud Storage (if using GCS/S3)
# GCS_BUCKET_NAME=kashmiri-treasures-web
# S3_BUCKET_NAME=kashmiri-treasures-mobile
```

**Important**: The `CORS_ORIGINS` must include `https://kashmiricraft.com` and `https://www.kashmiricraft.com` for the frontend to work!

### 1.3 Verify Backend CORS Configuration

The backend code in `backend/main.py` now automatically reads `CORS_ORIGINS` from environment variables. Make sure your `.env` file is loaded (it uses `python-dotenv`).

## Step 2: Frontend Configuration

### 2.1 Create Frontend `.env` File

In the root directory, create a `.env` file:

```bash
# From project root
cp env.example .env
```

### 2.2 Update Frontend `.env` for Production

Edit `.env` and set:

```env
# Production Backend API URL
VITE_API_URL=https://api.kashmiricraft.com
```

**Note**: Replace `api.kashmiricraft.com` with your actual backend API URL. This could be:
- `https://api.kashmiricraft.com` (subdomain)
- `https://kashmiricraft.com/api` (same domain with path)
- Your backend server URL

### 2.3 Rebuild Frontend

After updating `.env`, rebuild the frontend:

```bash
npm run build
```

The build process will inject `VITE_API_URL` into your application.

## Step 3: Verify Configuration

### 3.1 Check Backend CORS

Start your backend and check the logs. The CORS origins should include your production domain.

### 3.2 Test API Connection

From your production frontend, try to access:
- `https://api.kashmiricraft.com/api/health` (should return `{"status": "ok"}`)
- `https://api.kashmiricraft.com/api/products` (should return product list)

### 3.3 Test Frontend

1. Open `https://kashmiricraft.com` in your browser
2. Open browser DevTools (F12) → Network tab
3. Check if API requests are going to the correct backend URL
4. Verify there are no CORS errors in the console

## Step 4: Common Issues & Solutions

### Issue: CORS Error "Access-Control-Allow-Origin"

**Solution**: 
1. Make sure `CORS_ORIGINS` in backend `.env` includes your exact domain (with `https://`)
2. Restart the backend server after changing `.env`
3. Check that the frontend is accessing the backend from the correct domain

### Issue: API Requests Going to localhost

**Solution**:
1. Make sure `.env` file exists in the frontend root directory
2. Make sure `VITE_API_URL` is set correctly
3. Rebuild the frontend: `npm run build`
4. Clear browser cache

### Issue: 401 Unauthorized Errors

**Solution**:
1. Check that JWT tokens are being sent in Authorization header
2. Verify backend `SECRET_KEY` matches (if you changed it, users need to re-login)
3. Check token expiration (tokens expire after 30 minutes)

### Issue: Backend Not Reading .env File

**Solution**:
1. Make sure `.env` is in the `backend/` directory
2. Make sure `python-dotenv` is installed: `pip install python-dotenv`
3. Check that `load_dotenv()` is called in `backend/main.py` (it should be)

## Step 5: Deployment Checklist

Before going live:

- [ ] Backend `.env` configured with production values
- [ ] Frontend `.env` configured with production API URL
- [ ] Frontend rebuilt with `npm run build`
- [ ] CORS origins include production domain
- [ ] Database connection working
- [ ] Admin login working
- [ ] Product images loading correctly
- [ ] HTTPS enabled (required for production)
- [ ] SSL certificates configured
- [ ] Backend accessible at API URL
- [ ] Frontend accessible at `kashmiricraft.com`

## Environment Variables Summary

### Backend Required Variables:
- `DATABASE_URL` - MySQL connection string
- `SECRET_KEY` - JWT secret key
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password
- `CORS_ORIGINS` - Comma-separated list of allowed origins

### Frontend Required Variables:
- `VITE_API_URL` - Backend API base URL

## Testing Production Setup Locally

You can test the production configuration locally:

1. **Backend**: Set `CORS_ORIGINS` to include `http://localhost:8082`
2. **Frontend**: Set `VITE_API_URL` to `http://localhost:8000` (for local testing)
3. Start both servers and verify they communicate

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check backend logs for CORS or authentication errors
3. Verify environment variables are set correctly
4. Ensure both frontend and backend are using the correct URLs
