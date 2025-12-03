# Email Troubleshooting Guide

## Issue: Registration emails not being sent

When users register as exhibitors or participants, they should receive confirmation emails, but currently they're not receiving them.

## Root Cause Analysis

The email system is properly implemented in the code, but requires the **Firebase Trigger Email extension** to be installed and configured.

## Solution Steps

### Step 1: Install Firebase Trigger Email Extension

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `creatives-connect-afrika`
3. In the left sidebar, click **Extensions**
4. Click **Browse the catalog**
5. Search for **"Trigger Email from Firestore"**
6. Click on the extension and click **Install**

### Step 2: Configure SMTP Settings

During installation, you'll need to configure:

1. **Collection path**: `mail`
2. **SMTP connection URI**: `smtps://engage@creativesconnectafrika.com:kia8pN%uSqf;O-Fn@smtp.creativesconnectafrika.com:465`
3. **Default FROM address**: `noreply@creativesconnectafrika.com`
4. **Default REPLY TO address**: `contact@creativesconnectafrika.com`

### Step 3: Update Firestore Rules

Ensure your Firestore rules allow writes to the `mail` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to mail collection for email extension
    match /mail/{document} {
      allow write: if true;
    }
    
    // Your existing rules...
  }
}
```

### Step 4: Test the Setup

1. Visit `/test-email` on your website
2. Enter a test email address
3. Click "Test Participant Email" or "Test Exhibitor Email"
4. Check if the email appears in Firestore `mail` collection
5. Check if you receive the actual email

### Step 5: Monitor Extension Logs

1. In Firebase Console → Extensions
2. Click on "Trigger Email from Firestore"
3. Click on "Logs" tab
4. Look for any error messages

## Common Issues & Solutions

### Issue 1: SMTP Authentication Failed
**Error**: "Authentication failed"
**Solution**: 
- Verify SMTP credentials are correct
- Check if password contains special characters that need URL encoding
- Try using app-specific password if using Gmail

### Issue 2: Connection Refused
**Error**: "Connection refused"
**Solution**:
- Check SMTP server address and port
- Verify firewall settings
- Try different port (465 for SSL, 587 for TLS)

### Issue 3: Emails Created but Not Sent
**Problem**: Documents appear in `mail` collection but no emails sent
**Solution**:
- Check extension logs for errors
- Verify SMTP configuration
- Check if extension is enabled

### Issue 4: Rate Limiting
**Error**: "Rate limit exceeded"
**Solution**:
- Increase rate limit in extension configuration
- Wait for rate limit to reset

## Testing Checklist

- [ ] Firebase Trigger Email extension is installed
- [ ] SMTP credentials are correct
- [ ] Firestore rules allow writes to `mail` collection
- [ ] Test emails are created in `mail` collection
- [ ] Extension logs show no errors
- [ ] Test emails are received
- [ ] Check spam folder

## Alternative Solutions

If the Firebase extension doesn't work, consider these alternatives:

### Option 1: Use a Different Email Service
- **SendGrid**: Professional email service
- **Resend**: Modern email API
- **Nodemailer**: Direct SMTP sending

### Option 2: Use Firebase Functions
Create a Cloud Function that sends emails directly using Nodemailer or similar.

## Current Implementation

The current code:
1. ✅ Creates email documents in Firestore `mail` collection
2. ✅ Generates proper email templates
3. ✅ Handles errors gracefully
4. ❌ Requires Firebase Trigger Email extension to actually send emails

## Next Steps

1. Install and configure the Firebase Trigger Email extension
2. Test with the `/test-email` page
3. Verify emails are being sent
4. Monitor extension logs for any issues
5. Consider implementing a backup email service for production

## Support

If you continue to have issues:
1. Check Firebase Console logs
2. Verify SMTP settings with your email provider
3. Test with a simple email first
4. Consider using a different email service

---

**Note**: The email functionality is properly implemented in the code. The issue is that it requires the Firebase Trigger Email extension to be installed and configured to actually send emails.
