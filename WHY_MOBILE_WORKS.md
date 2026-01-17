# Why It Works on Mobile But Not Laptop

## If Mobile Works, The Subdomain IS Accessible

If `https://api.kashmiricraft.com` works on mobile, it means:
- ✅ The subdomain exists and is configured
- ✅ DNS is resolving correctly
- ✅ The backend is accessible via subdomain
- ✅ SSL certificate is valid

## Why Laptop Might Fail (Network-Related Issues)

### 1. **Different Networks**
- **Mobile**: Using cellular data or different WiFi network
- **Laptop**: Might be on corporate network, VPN, or restricted WiFi
- **Corporate networks** often block or restrict subdomain access

### 2. **DNS Resolution Issues**
- **Mobile**: Has fresh DNS cache or different DNS servers
- **Laptop**: Might have stale DNS cache or corporate DNS that doesn't resolve the subdomain
- **Solution**: Flush DNS cache on laptop

### 3. **Firewall/Security Software**
- **Laptop**: May have firewall, antivirus, or corporate security software blocking the connection
- **Mobile**: Usually doesn't have such restrictions
- **Solution**: Check firewall/antivirus settings

### 4. **Network Latency/Timeout**
- **Mobile**: Might have faster connection or different routing
- **Laptop**: Slower network or longer route causing timeouts
- **Solution**: Increase timeout (already done - 30 seconds)

### 5. **Browser Extensions**
- **Laptop**: May have ad blockers, privacy extensions blocking requests
- **Mobile**: Usually cleaner browser environment
- **Solution**: Test in incognito mode or disable extensions

### 6. **Proxy Settings**
- **Laptop**: Might be using corporate proxy that blocks subdomains
- **Mobile**: Direct connection
- **Solution**: Check proxy settings

## Quick Diagnostics

### Test 1: Check if Subdomain Resolves on Laptop
```bash
# On laptop terminal
nslookup api.kashmiricraft.com
# OR
dig api.kashmiricraft.com
```

### Test 2: Test Direct Connection
```bash
# On laptop terminal
curl -v https://api.kashmiricraft.com/api/health
```

### Test 3: Test from Browser Console (Laptop)
```javascript
// Open browser console on laptop
fetch('https://api.kashmiricraft.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Solutions

### Solution 1: Use Same Domain (Most Reliable)
Since Apache is already configured for same-domain proxy, use:
```env
VITE_API_URL=https://kashmiricraft.com
```
This works on ALL networks because it's the same domain.

### Solution 2: Fix Laptop Network Issues
1. **Flush DNS cache:**
   ```bash
   # Linux
   sudo systemd-resolve --flush-caches
   # OR
   sudo resolvectl flush-caches
   
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   ```

2. **Check firewall:**
   - Temporarily disable firewall/antivirus
   - Test if it works
   - If yes, add exception for the domain

3. **Check proxy settings:**
   - Browser settings → Network → Proxy
   - Disable proxy if enabled
   - Or configure proxy to allow the subdomain

4. **Test in different browser:**
   - Try Chrome, Firefox, Edge
   - Test in incognito/private mode

### Solution 3: Keep Subdomain But Fix Network
If you want to keep using `api.kashmiricraft.com`:

1. **Verify subdomain is accessible:**
   ```bash
   # On server
   curl -v https://api.kashmiricraft.com/api/health
   ```

2. **Check Apache virtual host for subdomain:**
   - Ensure separate virtual host exists for `api.kashmiricraft.com`
   - Ensure SSL certificate covers subdomain

3. **Fix laptop network:**
   - Contact IT if on corporate network
   - Check DNS settings
   - Check firewall rules

## Recommendation

**Use same domain (`https://kashmiricraft.com`)** because:
- ✅ Works on ALL networks (no subdomain DNS issues)
- ✅ Apache is already configured for it
- ✅ More reliable across different networks
- ✅ No need for separate SSL certificate for subdomain
- ✅ Simpler configuration

The code now auto-detects and uses same domain when on production, but you still need to update `.env` and rebuild.
