# Fix: API URL Configuration Issue

## Problem
- Requests going to `https://api.kashmiricraft.com` are timing out on laptop
- Works on mobile but not on laptop
- Apache is configured to proxy `/api` on same domain, not subdomain

## Root Cause
Your frontend is configured to use the subdomain (`https://api.kashmiricraft.com`), but:
1. Apache is set up to proxy `/api` on the **same domain** (`https://kashmiricraft.com/api`)
2. The subdomain `api.kashmiricraft.com` may not exist or be accessible from your laptop's network
3. Mobile might work because it's on a different network/DNS

## Solution

### Option 1: Use Same Domain (Recommended - Already Implemented)
The code now auto-detects and uses the same domain. But you need to:

1. **Update your `.env` file:**
   ```bash
   # In project root
   VITE_API_URL=https://kashmiricraft.com
   ```

2. **Rebuild frontend:**
   ```bash
   npm run build
   ```

3. **Deploy new build:**
   ```bash
   sudo cp -r dist/* /var/www/kashmiri-treasures/dist/
   ```

### Option 2: Set Up Subdomain (If you prefer)
If you want to use `api.kashmiricraft.com`:

1. **Create DNS A record** for `api.kashmiricraft.com` pointing to your server IP
2. **Create Apache virtual host** for the subdomain
3. **Update frontend `.env`:** `VITE_API_URL=https://api.kashmiricraft.com`
4. **Rebuild and deploy**

## Quick Fix (Immediate)

1. **Check current `.env` file:**
   ```bash
   cat .env
   ```

2. **Update it to use same domain:**
   ```bash
   echo "VITE_API_URL=https://kashmiricraft.com" > .env
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   sudo cp -r dist/* /var/www/kashmiri-treasures/dist/
   sudo chown -R www-data:www-data /var/www/kashmiri-treasures/dist
   ```

5. **Clear browser cache** on laptop and test again

## Verification

After deploying, test in browser console:
```javascript
fetch('https://kashmiricraft.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Should return: `{status: "ok"}`

## Why This Happens

- **Mobile networks** often have different DNS resolution
- **Laptop networks** (especially corporate/VPN) may block or not resolve subdomains
- **Same-domain requests** work more reliably across all networks
- **Apache proxy** is already configured for same-domain setup
