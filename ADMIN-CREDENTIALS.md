# Admin Portal Access

## Admin Login Credentials

**URL:** `/admin/login`

### Default Credentials:
- **Email:** `admin@creativesconnectafrika.com`
- **Password:** `CCA2025Admin!`

## Important Security Notes

⚠️ **IMPORTANT:** These are demo credentials for development purposes only.

### For Production Deployment:

1. **Change the credentials** in `/app/admin/login/page.tsx`:
   ```typescript
   const ADMIN_EMAIL = 'your-secure-email@domain.com';
   const ADMIN_PASSWORD = 'YourSecurePassword123!';
   ```

2. **Implement proper backend authentication:**
   - Move authentication logic to a secure backend API
   - Use environment variables for credentials
   - Implement JWT tokens or session management
   - Add rate limiting to prevent brute force attacks
   - Use HTTPS in production
   - Consider implementing 2FA (Two-Factor Authentication)

3. **Remove the demo credentials card** from the login page

4. **Add password hashing:**
   - Never store passwords in plain text
   - Use bcrypt or similar for password hashing

## Session Management

The current implementation uses:
- `sessionStorage` for temporary session storage
- Sessions expire when browser tab is closed
- Auto-redirect to login if session is invalid

## Features

✅ Protected admin dashboard
✅ Auto-redirect to login if not authenticated
✅ Session-based authentication
✅ Logout functionality
✅ User email display in sidebar

## Accessing the Admin Panel

1. Navigate to: `https://yourdomain.com/admin`
2. You'll be automatically redirected to the login page
3. Enter credentials
4. Access the admin dashboard

## Password Reset

Currently, password reset is not implemented. For production:
- Implement a "Forgot Password" flow
- Send password reset emails
- Use secure token-based reset links

