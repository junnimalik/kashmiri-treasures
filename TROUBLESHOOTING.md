# Troubleshooting API Connection Issues

## Symptoms
- "Signal timeout" error on admin panel
- "Failed to load products" error on main website
- Products not loading

## Quick Diagnosis

### 1. Check if Backend is Running
```bash
# SSH into your server
ssh user@your-server

# Check if backend process is running
ps aux | grep python
ps aux | grep uvicorn

# Check if port 8000 is listening
sudo netstat -tlnp | grep 8000
# OR
sudo ss -tlnp | grep 8000
```

### 2. Test API Directly
```bash
# Test health endpoint
curl -v https://kashmiricraft.com/api/health
# OR if using subdomain
curl -v https://api.kashmiricraft.com/api/health

# Test products endpoint
curl -v https://kashmiricraft.com/api/products
```

### 3. Check Backend Logs
```bash
# If using systemd service
sudo journalctl -u kashmiri-treasures-api -n 50

# If running manually, check terminal output
```

### 4. Check Apache Proxy
```bash
# Test Apache configuration
sudo apache2ctl configtest

# Check Apache error logs
sudo tail -f /var/log/apache2/error.log

# Check Apache access logs
sudo tail -f /var/log/apache2/access.log
```

## Common Issues & Solutions

### Issue 1: Backend Not Running
**Symptoms:** Timeout errors, connection refused

**Solution:**
```bash
# Start backend service
cd /home/anviam/Desktop/kashmiri-treasures/backend
source venv/bin/activate
python main.py

# OR if using systemd
sudo systemctl start kashmiri-treasures-api
sudo systemctl status kashmiri-treasures-api
```

### Issue 2: Wrong API URL in Frontend
**Symptoms:** CORS errors, connection refused

**Check:**
```bash
# Check frontend .env file
cat .env
# Should show: VITE_API_URL=https://kashmiricraft.com
# OR: VITE_API_URL=https://api.kashmiricraft.com
```

**Fix:**
1. Edit `.env` file in project root
2. Set correct `VITE_API_URL`
3. Rebuild frontend: `npm run build`
4. Deploy new `dist/` folder

### Issue 3: Apache Proxy Not Working
**Symptoms:** 502 Bad Gateway, 404 Not Found

**Check Apache Config:**
```bash
# Verify proxy configuration
sudo cat /etc/apache2/sites-available/kashmiricraft.com-le-ssl.conf | grep -A 5 ProxyPass
```

**Should have:**
```apache
ProxyPass /api http://localhost:8000/api
ProxyPassReverse /api http://localhost:8000/api
```

**Fix:**
1. Enable proxy modules:
   ```bash
   sudo a2enmod proxy proxy_http
   sudo systemctl restart apache2
   ```

2. Add proxy config to Apache virtual host (see `apache-config-ssl.conf`)

### Issue 4: CORS Issues
**Symptoms:** CORS errors in browser console

**Check Backend CORS:**
```bash
# Check backend .env
cat backend/.env | grep CORS_ORIGINS
```

**Should include:**
```env
CORS_ORIGINS=https://kashmiricraft.com,https://www.kashmiricraft.com
```

**Fix:**
1. Update `backend/.env` with correct CORS_ORIGINS
2. Restart backend service

### Issue 5: Firewall Blocking
**Symptoms:** Timeout, connection refused

**Check Firewall:**
```bash
# Check if port 8000 is blocked
sudo ufw status
sudo iptables -L -n | grep 8000
```

**Fix:**
```bash
# Allow localhost connections (backend should only listen on localhost)
# No firewall changes needed if backend is on localhost:8000
```

### Issue 6: Database Connection Issues
**Symptoms:** Backend starts but API returns 500 errors

**Check:**
```bash
# Test MySQL connection
mysql -u root -p -e "USE kashmiri_treasures; SELECT COUNT(*) FROM products;"
```

**Fix:**
1. Check `backend/.env` DATABASE_URL
2. Ensure MySQL is running: `sudo systemctl status mysql`
3. Check database exists and has correct permissions

## Step-by-Step Recovery

1. **Verify Backend is Running:**
   ```bash
   curl http://localhost:8000/api/health
   # Should return: {"status":"ok"}
   ```

2. **Verify Apache Proxy:**
   ```bash
   curl https://kashmiricraft.com/api/health
   # Should return: {"status":"ok"}
   ```

3. **Check Frontend Configuration:**
   - Verify `.env` file exists and has correct `VITE_API_URL`
   - Rebuild frontend if changed

4. **Check Browser Console:**
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed requests

5. **Test from Browser Console:**
   ```javascript
   // Test API connection
   fetch('https://kashmiricraft.com/api/health')
     .then(r => r.json())
     .then(console.log)
     .catch(console.error)
   ```

## Prevention

1. **Monitor Backend:**
   - Set up systemd service with auto-restart
   - Monitor logs regularly

2. **Health Checks:**
   - Set up monitoring to check `/api/health` endpoint
   - Alert if backend goes down

3. **Logging:**
   - Enable detailed logging in backend
   - Monitor Apache access/error logs

## Getting Help

If issues persist:
1. Check all logs (backend, Apache, browser console)
2. Test API endpoints directly with curl
3. Verify all configuration files
4. Check network connectivity
5. Verify SSL certificates are valid
