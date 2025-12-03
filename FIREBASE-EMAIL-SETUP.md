# Firebase Email Setup Guide

This guide will help you set up automated email responses for the partnership form using Firebase's Trigger Email extension.

## Overview

The Firebase Trigger Email extension automatically sends emails when documents are added to a specific Firestore collection. This setup will send:
1. A confirmation email to users who submit the partnership form
2. A notification email to your admin team

## Prerequisites

- Firebase project with Firestore enabled
- Domain email account with SMTP credentials
- Firebase CLI installed (optional, for advanced configuration)

## Step 1: Install Firebase Trigger Email Extension

### Option A: Using Firebase Console (Recommended)

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `creatives-connect-afrika`
3. In the left sidebar, click on **Extensions**
4. Click **Browse the catalog**
5. Search for **"Trigger Email from Firestore"**
6. Click on the extension
7. Click **Install**

### Option B: Using Firebase CLI

```bash
firebase ext:install firestore-send-email --project=creatives-connect-afrika
```

## Step 2: Configure the Extension

### Basic Configuration

1. **Collection path**: `mail`
2. **SMTP connection URI**: `smtps://username:password@smtp.yourdomain.com:465`
2. **SMTP connection URI**: `smtps://engage@creativesconnectafrika.com:kia8pN%uSqf;O-Fn@smtp.creativesconnectafrika.com:465`
3. **Default FROM address**: `noreply@yourdomain.com`
4. **Default TO address**: Leave empty (will be set per email)
5. **Default REPLY TO address**: `contact@yourdomain.com`

### SMTP Configuration Examples

#### Gmail/Google Workspace
```
SMTP connection URI: smtps://your-email@gmail.com:your-app-password@smtp.gmail.com:465
Default FROM: noreply@yourdomain.com
```

#### Custom Domain Email (cPanel, etc.)
```
SMTP connection URI: smtps://engage@creativesconnectafrika.com:kia8pN%uSqf;O-Fn@mail.creativesconnectafrika.com:465
Default FROM: noreply@yourdomain.com
```

#### Outlook/Office 365
```
SMTP connection URI: smtps://your-email@yourdomain.com:your-password@smtp-mail.outlook.com:587
Default FROM: noreply@yourdomain.com
```

### Advanced Configuration (Optional)

1. **Email templates**: You can create templates in Firestore, but our code generates them dynamically
2. **Rate limiting**: Set to prevent spam (default: 5 emails per minute)
3. **Retry logic**: Configure retry attempts for failed emails

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Firebase Configuration (already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=creatives-connect-afrika
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Email Configuration
ADMIN_EMAIL=admin@yourdomain.com
FROM_EMAIL=noreply@yourdomain.com
```

## Step 4: Test the Setup

### Test Email Structure

The extension expects documents in the `mail` collection with this structure:

```javascript
{
  to: "recipient@example.com",
  message: {
    subject: "Email Subject",
    html: "<h1>HTML Content</h1>",
    text: "Plain text content"
  }
}
```

### Manual Test

1. Go to Firestore in Firebase Console
2. Navigate to the `mail` collection
3. Add a test document:

```json
{
  "to": "your-test-email@example.com",
  "message": {
    "subject": "Test Email",
    "html": "<h1>Test Email</h1><p>This is a test email from Firebase.</p>",
    "text": "Test Email\n\nThis is a test email from Firebase."
  }
}
```

4. The extension should automatically send the email
5. Check the extension logs for any errors

## Step 5: Monitor and Troubleshoot

### View Extension Logs

1. In Firebase Console, go to **Extensions**
2. Click on **Trigger Email from Firestore**
3. Click on **Logs** tab
4. Monitor for errors or successful sends

### Common Issues

#### Authentication Errors
- **Problem**: SMTP authentication fails
- **Solution**: Verify username/password and enable "Less secure app access" or use app passwords

#### Connection Errors
- **Problem**: Cannot connect to SMTP server
- **Solution**: Check SMTP server address and port (465 for SSL, 587 for TLS)

#### Rate Limiting
- **Problem**: Emails not sending due to rate limits
- **Solution**: Increase rate limit in extension configuration

#### Firestore Rules
- **Problem**: Cannot write to `mail` collection
- **Solution**: Update Firestore rules to allow writes to `mail` collection:

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

## Step 6: Production Considerations

### Security

1. **SMTP Credentials**: Store securely in Firebase Functions config or environment variables
2. **Rate Limiting**: Set appropriate limits to prevent abuse
3. **Validation**: Ensure email addresses are validated before sending

### Monitoring

1. **Email Delivery**: Monitor bounce rates and delivery failures
2. **Performance**: Track email sending performance
3. **Costs**: Monitor Firebase usage and costs

### Backup Plan

Consider implementing a backup email service (like SendGrid or Resend) for critical emails.

## Step 7: Customization

### Email Templates

The current implementation generates emails dynamically. To customize:

1. Modify `lib/emailTemplates.ts`
2. Update styling, content, or branding
3. Add more languages if needed

### Admin Email Address

Update the admin email in `lib/firebaseService.ts`:

```typescript
export const sendPartnershipEmails = async (
  formData: PartnershipFormData,
  language: 'en' | 'fr' = 'en',
  adminEmail: string = 'your-admin@yourdomain.com' // Update this
) => {
  // ...
}
```

## Troubleshooting Checklist

- [ ] Firebase extension is installed and enabled
- [ ] SMTP credentials are correct
- [ ] Firestore rules allow writes to `mail` collection
- [ ] Email addresses are valid
- [ ] No rate limiting issues
- [ ] Extension logs show no errors
- [ ] Test email was received

## Support

If you encounter issues:

1. Check Firebase Console logs
2. Verify SMTP settings with your email provider
3. Test with a simple email first
4. Check Firestore security rules
5. Review extension documentation: [Firebase Trigger Email](https://firebase.google.com/products/extensions/firestore-send-email)

## Next Steps

Once the setup is complete:

1. Test the partnership form submission
2. Verify both user and admin emails are received
3. Customize email templates as needed
4. Set up monitoring and alerts
5. Consider adding email analytics

---

**Note**: This setup uses Firebase's official Trigger Email extension, which is reliable and well-maintained. The extension automatically handles email queuing, retries, and cleanup of processed emails.
