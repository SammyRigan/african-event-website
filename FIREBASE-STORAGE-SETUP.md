# Firebase Storage Setup Guide

## Important: Configure Firebase Storage Rules

To enable image uploads for speakers, you need to configure Firebase Storage security rules.

## Setup Instructions

### Step 1: Open Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **creatives-connect-afrika**
3. Click on **Storage** in the left sidebar
4. Click on **Rules** tab

### Step 2: Update Storage Rules

Replace the existing rules with the following:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow authenticated admins to upload speaker images
    match /speakers/{imageName} {
      allow write: if true; // Change to authenticated check in production
      allow delete: if true; // Change to authenticated check in production
    }
  }
}
```

### Step 3: Publish Rules

Click the **Publish** button to save the new rules.

## Production Security Rules

For production, you should implement proper authentication:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read access
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Authenticated admin-only write access
    match /speakers/{imageName} {
      allow write: if request.auth != null && 
                     request.auth.token.email == 'admin@creativesconnectafrika.com';
      allow delete: if request.auth != null && 
                      request.auth.token.email == 'admin@creativesconnectafrika.com';
    }
  }
}
```

**Note:** This requires Firebase Authentication to be set up.

## Current Implementation

The current rules allow:
- ✅ **Public Read:** Anyone can view images (needed for website)
- ✅ **Public Write (Temporary):** Anyone can upload to `/speakers/` folder
- ⚠️ **Security Warning:** Change write rules for production

## Image Upload Process

1. **Admin uploads image** through Add/Edit Speaker form
2. **Image is validated** (type, size)
3. **File is uploaded** to Firebase Storage at `speakers/filename.ext`
4. **Download URL is generated** by Firebase
5. **URL is saved** to Firestore in speaker document
6. **Image is served** via Firebase CDN

## File Naming Convention

Images are automatically named:
```
{speaker-name-sanitized}-{timestamp}.{extension}

Examples:
- wamkele-keabetswe-mene-1709567890123.jpg
- emily-njeri-mburu-ndoria-1709567891234.png
```

## Storage Quota

- **Free tier:** 5GB storage, 1GB/day downloads
- **Blaze plan:** Pay as you go

Monitor usage in Firebase Console → Storage → Usage tab

## Troubleshooting

### Upload Fails

**Error:** "Firebase Storage: User does not have permission"
- **Solution:** Update storage rules as shown above

**Error:** "File size too large"
- **Solution:** Ensure image is under 5MB

**Error:** "Network error"
- **Solution:** Check internet connection and Firebase config

### Images Not Displaying

1. Check Firebase Console → Storage to verify upload
2. Verify download URL in Firestore
3. Check browser console for CORS errors
4. Ensure storage rules allow public read

## Testing

To test the image upload:

1. Go to `/admin/speakers/add`
2. Fill in speaker name
3. Click image upload area
4. Select an image
5. Preview should show immediately
6. Submit form
7. Check Firebase Console → Storage → speakers/
8. Verify image appears in the folder
9. Check public `/speakers` page to see the image

## Benefits of Firebase Storage

✅ **Global CDN** - Fast image delivery worldwide
✅ **Automatic scaling** - Handles traffic spikes
✅ **Secure URLs** - Download URLs are hard to guess
✅ **No server needed** - Fully managed by Firebase
✅ **Built-in optimization** - Images are served efficiently

## Next Steps

After configuring storage rules:
1. Test image upload with a sample speaker
2. Verify image appears on public page
3. Upload initial speakers via `/admin/upload-speakers`
4. Monitor storage usage in Firebase Console

