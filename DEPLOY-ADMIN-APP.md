# Deploy Admin App to Firebase

This guide explains how to deploy the admin-app to Firebase Hosting.

## Prerequisites

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not already done):
```bash
firebase init hosting
```
- Select "Use an existing project" or create a new one
- Set public directory to: `admin-app/out`
- Configure as single-page app: Yes
- Set up automatic builds: No (we'll build manually)

## Deployment Steps

1. **Build the admin app:**
```bash
cd admin-app
npm run build
```

This will create a static export in `admin-app/out/` directory.

2. **Deploy to Firebase:**
```bash
# From the root directory
firebase deploy --only hosting
```

Or deploy from the admin-app directory:
```bash
cd admin-app
npm run build
cd ..
firebase deploy --only hosting
```

## Configuration Files

- `firebase.json` - Firebase hosting configuration pointing to `admin-app/out`
- `.firebaserc` - Firebase project configuration
- `admin-app/next.config.mjs` - Configured with `output: 'export'` for static export

## Important Notes

⚠️ **Dynamic Routes Limitation**: Since we're using static export (`output: 'export'`), dynamic routes like `/speakers/edit/[id]` and `/gallery/edit/[id]` will need to be handled differently. Firebase Hosting with static export doesn't support server-side rendering.

**Alternative Solutions:**
1. Use Firebase Functions for dynamic routes
2. Use client-side routing only (already implemented)
3. Pre-generate all possible routes at build time

## Troubleshooting

If you encounter issues:

1. **Clear build cache:**
```bash
cd admin-app
rm -rf .next out
npm run build
```

2. **Check Firebase project:**
```bash
firebase projects:list
firebase use <project-id>
```

3. **Verify build output:**
```bash
ls -la admin-app/out
```

## Environment Variables

Make sure your Firebase configuration in `lib/firebase.ts` is set up correctly for production.
