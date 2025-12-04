# Admin App

This is a separate Next.js application for the admin panel, built as a separate app in a monolithic repository structure.

## Structure

```
admin-app/
  app/              # Admin pages (no /admin prefix needed)
  next.config.mjs   # No output: export (supports dynamic routes)
  package.json      # Admin app dependencies
  tsconfig.json     # TypeScript config
```

## Shared Resources

The admin app shares resources from the root:
- `components/` - UI components
- `lib/` - Firebase services and utilities
- `public/` - Static assets (images, etc.)

## Development

Run the admin app separately:

```bash
npm run dev:admin
```

This starts the admin app on port 3001.

## Routes

- `/` - Redirects to `/login` or `/dashboard` based on auth
- `/login` - Admin login page
- `/dashboard` - Admin dashboard (main page)
- `/speakers/add` - Add speaker
- `/gallery/add` - Add gallery image
- `/gallery/batch-upload` - Batch upload images
- `/gallery/categories` - Manage categories

Note: Speaker and gallery image editing are now done via centered modals from their respective dashboards, eliminating the need for dynamic routes and ensuring compatibility with static export.

## Building

Build the admin app separately:

```bash
npm run build:admin
```

This creates a production build in `admin-app/.next/` that can be deployed separately.

## Key Differences from Public App

1. **No static export** - Admin app uses dynamic routes
2. **Separate port** - Runs on port 3001 in dev mode
3. **No /admin prefix** - Routes are at root level
4. **Full server-side support** - Can use all Next.js features
