# API Connection Debugging Guide

## Issue: Products not loading on desktop but working on mobile

### Possible Causes:

1. **CORS Configuration**
   - Check if `https://kashmiricraft.com` is in backend CORS_ORIGINS
   - Verify backend is reading environment variables correctly

2. **API URL Configuration**
   - Frontend `.env` should have: `VITE_API_URL=https://api.kashmiricraft.com`
   - Or if using same domain: `VITE_API_URL=https://kashmiricraft.com`
   - Rebuild frontend after changing `.env`

3. **Backend Accessibility**
   - Test if backend is accessible: `curl https://api.kashmiricraft.com/api/health`
   - Or if using same domain: `curl https://kashmiricraft.com/api/health`

4. **SSL Certificate Issues**
   - Mixed content (HTTP/HTTPS) can cause issues
   - Ensure both frontend and backend use HTTPS

5. **Browser Cache**
   - Clear browser cache and hard refresh (Ctrl+Shift+R)
   - Try incognito/private mode

6. **Network/Firewall**
   - Desktop might be on different network
   - Corporate firewall might block API requests

## Debugging Steps:

### 1. Check Browser Console
Open DevTools (F12) → Console tab and look for:
- CORS errors
- Network errors
- Failed fetch errors

### 2. Check Network Tab
Open DevTools → Network tab:
- Find the `/api/products` request
- Check Status Code (should be 200)
- Check Response Headers for CORS headers
- Check if request is being blocked

### 3. Test API Directly
```bash
# Test if API is accessible
curl -v https://api.kashmiricraft.com/api/health

# Or if using same domain
curl -v https://kashmiricraft.com/api/health

# Test products endpoint
curl -v https://api.kashmiricraft.com/api/products
```

### 4. Check Backend Logs
Look for:
- CORS errors
- 401/403 errors
- Connection errors

### 5. Verify Environment Variables

**Frontend** (`.env` file in project root):
```env
VITE_API_URL=https://api.kashmiricraft.com
```

**Backend** (`backend/.env` file):
```env
CORS_ORIGINS=https://kashmiricraft.com,https://www.kashmiricraft.com
```

### 6. Common Fixes:

1. **If using subdomain (api.kashmiricraft.com):**
   - Ensure DNS is configured
   - Ensure SSL certificate covers subdomain
   - Ensure backend is accessible at that URL

2. **If using same domain (/api path):**
   - Ensure Apache reverse proxy is configured
   - Ensure backend is running on localhost:8000
   - Test proxy: `curl https://kashmiricraft.com/api/health`

3. **Rebuild Frontend:**
   ```bash
   npm run build
   # Then deploy the new dist/ folder
   ```

4. **Restart Backend:**
   ```bash
   # Restart the backend service
   sudo systemctl restart kashmiri-treasures-api
   ```

## Quick Test:

Open browser console and run:
```javascript
fetch('https://api.kashmiricraft.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

This will show the exact error if API is not accessible.
