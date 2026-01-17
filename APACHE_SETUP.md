# Apache Configuration for kashmiricraft.com

## Overview

This guide shows how to configure Apache to serve your frontend and proxy API requests to your FastAPI backend.

## Architecture

- **Frontend**: Served directly by Apache from `/var/www/kashmiri-treasures/dist`
- **Backend API**: FastAPI running on `localhost:8000`, proxied through Apache at `/api/*`
- **URLs**:
  - Frontend: `https://kashmiricraft.com`
  - API: `https://kashmiricraft.com/api/*` (proxied to `http://localhost:8000/api/*`)

## Step 1: Enable Required Apache Modules

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod rewrite
sudo systemctl restart apache2
```

## Step 2: Update Your Apache Configuration

1. **Backup your current config:**
   ```bash
   sudo cp /etc/apache2/sites-available/kashmiricraft.com-le-ssl.conf /etc/apache2/sites-available/kashmiricraft.com-le-ssl.conf.backup
   ```

2. **Edit your SSL configuration:**
   ```bash
   sudo nano /etc/apache2/sites-available/kashmiricraft.com-le-ssl.conf
   ```

3. **Replace with the configuration from `apache-config-ssl.conf`** (or merge the proxy settings)

   Key additions:
   ```apache
   # Reverse Proxy for Backend API
   ProxyPreserveHost On
   ProxyPass /api http://localhost:8000/api
   ProxyPassReverse /api http://localhost:8000/api
   
   # Also proxy /uploads for serving uploaded images
   ProxyPass /uploads http://localhost:8000/uploads
   ProxyPassReverse /uploads http://localhost:8000/uploads
   ```

## Step 3: Configure Frontend Environment

Create `.env` file in your project root:

```bash
cd /home/anviam/Desktop/kashmiri-treasures
nano .env
```

Add:
```env
VITE_API_URL=https://kashmiricraft.com
```

**Important**: Since the API is at the same domain (`/api`), you can use `https://kashmiricraft.com` (without `/api` in the URL because the frontend code already adds `/api` to requests).

## Step 4: Rebuild Frontend

```bash
npm run build
```

## Step 5: Deploy Frontend

```bash
# Copy built files to Apache directory
sudo cp -r dist/* /var/www/kashmiri-treasures/dist/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/kashmiri-treasures/dist
sudo chmod -R 755 /var/www/kashmiri-treasures/dist
```

## Step 6: Start Backend Service

Make sure your FastAPI backend is running on port 8000. You can use:

### Option A: Systemd Service (Recommended for Production)

Create `/etc/systemd/system/kashmiri-treasures-api.service`:

```ini
[Unit]
Description=Kashmiri Treasures FastAPI Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/anviam/Desktop/kashmiri-treasures/backend
Environment="PATH=/home/anviam/Desktop/kashmiri-treasures/backend/venv/bin"
ExecStart=/home/anviam/Desktop/kashmiri-treasures/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable kashmiri-treasures-api
sudo systemctl start kashmiri-treasures-api
sudo systemctl status kashmiri-treasures-api
```

### Option B: Manual Start (Development)

```bash
cd /home/anviam/Desktop/kashmiri-treasures/backend
source venv/bin/activate
python main.py
```

## Step 7: Test Configuration

1. **Test Apache configuration:**
   ```bash
   sudo apache2ctl configtest
   ```

2. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

3. **Test API endpoint:**
   ```bash
   curl https://kashmiricraft.com/api/health
   # Should return: {"status":"ok"}
   ```

4. **Test frontend:**
   - Visit `https://kashmiricraft.com` in your browser
   - Open DevTools → Network tab
   - Check that API requests go to `https://kashmiricraft.com/api/...`

## Step 8: Update Backend CORS (if needed)

Your backend should already have `https://kashmiricraft.com` in CORS_ORIGINS. Verify in `backend/.env`:

```env
CORS_ORIGINS=https://kashmiricraft.com,https://www.kashmiricraft.com
```

## Troubleshooting

### API returns 502 Bad Gateway
- **Check**: Is the backend running on port 8000?
  ```bash
  sudo netstat -tlnp | grep 8000
  ```
- **Fix**: Start the backend service

### API returns 404
- **Check**: Apache proxy configuration is correct
- **Fix**: Verify `ProxyPass /api` is in your Apache config

### CORS errors
- **Check**: Backend CORS_ORIGINS includes your domain
- **Check**: Apache headers are set correctly
- **Fix**: Restart both Apache and backend

### Frontend can't connect to API
- **Check**: `.env` file has correct `VITE_API_URL`
- **Check**: Frontend was rebuilt after changing `.env`
- **Check**: Browser console for actual API URL being used

## Alternative: Subdomain Setup

If you prefer to use `api.kashmiricraft.com` instead:

1. Create DNS A record for `api.kashmiricraft.com`
2. Create separate Apache virtual host for the subdomain
3. Point it directly to `http://localhost:8000` (no path rewriting needed)
4. Update frontend `.env`: `VITE_API_URL=https://api.kashmiricraft.com`

## Security Notes

- Backend should only listen on `localhost:8000` (not 0.0.0.0) in production
- Use firewall to block direct access to port 8000 from outside
- Keep SSL certificates updated
- Regularly update Apache and Python dependencies
