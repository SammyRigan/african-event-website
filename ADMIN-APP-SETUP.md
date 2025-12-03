# Admin App Setup - Monolithic Repository Structure

The admin panel has been separated into its own Next.js application (`admin-app/`) to avoid conflicts with static export requirements. This allows the admin to use dynamic routes while the public site remains statically exportable.

## Repository Structure

```
/
  app/                    # Public app (static export)
    admin/                # OLD - can be removed
  admin-app/              # NEW - Separate admin app
    app/
      dashboard/          # Main admin dashboard
      login/              # Login page
      speakers/           # Speaker management
      gallery/            # Gallery management
  components/             # Shared components
  lib/                    # Shared Firebase services
  public/                 # Shared static assets
```

## Running the Apps

### Development Mode

**Run both apps simultaneously (recommended):**

```bash
# Terminal 1: Public app (port 3000)
npm run dev

# Terminal 2: Admin app (port 3001)
npm run dev:admin
```

**Or run individually:**
- Public app: `npm run dev` → `http://localhost:3000`
- Admin app: `npm run dev:admin` → `http://localhost:3001`

### Building

**Public site (static export):**
```bash
npm run build:public
# Output: /out directory (static files)
```

**Admin app (dynamic):**
```bash
npm run build:admin
# Output: admin-app/.next (requires Next.js server)
```

## Admin App Routes

All admin routes are at root level (no `/admin` prefix):
- `/` - Redirects to `/login` or `/dashboard`
- `/login` - Admin login page
- `/dashboard` - Main admin dashboard
- `/speakers/add` - Add speaker
- `/speakers/edit/[id]` - Edit speaker (dynamic route)
- `/gallery/add` - Add gallery image
- `/gallery/edit/[id]` - Edit gallery image (dynamic route)
- `/gallery/batch-upload` - Batch upload images
- `/gallery/categories` - Manage categories

## Key Differences

### Public App (`app/`)
- ✅ Static export (`output: export`)
- ✅ No dynamic routes
- ✅ Can be deployed to static hosting
- ✅ Port 3000

### Admin App (`admin-app/`)
- ✅ No static export (supports dynamic routes)
- ✅ Full Next.js features
- ✅ Requires server deployment
- ✅ Port 3001
- ✅ Shares components, lib, and public from root

## Shared Resources

The admin app accesses shared resources using path aliases:
- `@/components/*` → `../components/*`
- `@/lib/*` → `../lib/*`
- `/logo.png` → `../public/logo.png`

## Authentication

Both apps use the same authentication:
- Email: `admin@creativesconnectafrika.com`
- Password: `CCA2025Admin!`
- Stored in `sessionStorage` as `cca_admin_auth`

## Deployment

### Public Site
1. Run: `npm run build:public`
2. Deploy `/out` directory to static hosting (Netlify, Vercel static, GitHub Pages)

### Admin App
1. Run: `npm run build:admin`
2. Deploy `admin-app/.next` to a server with Next.js runtime (Vercel, custom server)

## Benefits

✅ **No static export conflicts** - Admin uses dynamic routes freely
✅ **Separate deployment** - Deploy admin to different server if needed
✅ **Shared codebase** - Components and services shared between apps
✅ **Independent scaling** - Scale admin and public separately
✅ **Clean separation** - Admin code doesn't affect public build

## Next Steps

1. Test admin app: `npm run dev:admin`
2. Remove old `app/admin` folder (optional, after confirming admin-app works)
3. Update deployment scripts if needed
4. Configure separate domain/subdomain for admin if desired
