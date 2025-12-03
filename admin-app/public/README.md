# Admin App Public Assets

This directory contains static assets for the admin app.

## Logo Files

- `logo.png` - Main logo (used on login page)
- `logo-b.png` - Logo variant (used on dashboard)

## Syncing Assets

If you update logo files in the root `public/` directory, you may need to copy them here:

```bash
# From project root:
cp public/logo.png admin-app/public/
cp public/logo-b.png admin-app/public/
```

Or create a symlink to keep them in sync automatically (not recommended for deployment).
