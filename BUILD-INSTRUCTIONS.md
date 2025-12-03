# Build Instructions

## Building the Project

This project has two build modes:

### 1. Build with Admin Pages (Development/Full Build)

```bash
npm run build
```

This builds the entire application including admin pages. Use this for:
- Development testing
- Full feature deployment on a server with backend
- Local testing with Firebase

**Output:** All pages including `/admin/*` in the `/out` directory

---

### 2. Build without Admin Pages (Public/Static Export) ✅ **RECOMMENDED**

```bash
npm run build:public
```

This builds only the public-facing pages, excluding all admin functionality. Use this for:
- **Static hosting** (Netlify, Vercel, GitHub Pages, etc.)
- **Public website deployment**
- **Production CDN distribution**

**What it does:**
1. Temporarily moves `app/admin` folder outside the app directory
2. Runs the Next.js build
3. Restores the admin folder to its original location
4. Admin pages remain available in development mode

**Output:** Public pages only in `/out` directory (no admin routes)

**Pages included in build:**
- ✅ `/` - Home page
- ✅ `/about` - About page
- ✅ `/about/target-audience` - Target audience
- ✅ `/activities` - Activities page
- ✅ `/contact` - Contact page
- ✅ `/media` - Media gallery
- ✅ `/partners` - Partners page
- ✅ `/programme` - Programme page
- ✅ `/speakers` - Speakers page (with initial speakers)

**Pages excluded from build:**
- ❌ `/admin` - Admin dashboard
- ❌ `/admin/login` - Admin login
- ❌ `/admin/speakers/add` - Add speaker
- ❌ `/admin/speakers/edit/[id]` - Edit speaker
- ❌ `/admin/upload-speakers` - Upload speakers utility

---

## Development Mode

```bash
npm run dev
```

Runs the development server with **all pages** including admin.

**Admin access in development:**
- Navigate to: `http://localhost:3000/admin/login`
- Login with credentials
- Full admin functionality available

---

## Build Output

After running `npm run build:public`, the `/out` directory contains:

```
/out/
  ├── index.html              (Home page)
  ├── about.html              (About page)
  ├── about/
  │   └── target-audience.html
  ├── activities.html
  ├── contact.html
  ├── media.html
  ├── partners.html
  ├── programme.html
  ├── speakers.html           (Speakers with initial 4)
  ├── test-firebase.html
  ├── _next/                  (Static assets)
  └── (images and other assets)
```

**No admin pages in output!** ✅

---

## Deployment

### For Static Hosting (Netlify, Vercel, GitHub Pages)

1. Run the public build:
   ```bash
   npm run build:public
   ```

2. Deploy the `/out` directory

3. **Important:** The build script automatically copies server configuration files:
   - `_redirects` - For Netlify (handles route redirects)
   - `.htaccess` - For Apache servers (handles route rewrites)
   - `vercel.json` - For Vercel (already in root, will be used automatically)

   These files ensure that refreshing inner pages (like `/speakers` or `/about`) works correctly instead of showing 404 errors.

4. Admin functionality:
   - **Not included** in static build
   - Use admin in development mode only
   - Or deploy admin separately to a server with backend support

### Fixing 404 Errors on Refresh

If you're experiencing 404 errors when refreshing inner pages, make sure:

1. **For Netlify:** The `_redirects` file is in the `/out` directory (automatically copied)
2. **For Apache:** The `.htaccess` file is in the `/out` directory (automatically copied)
3. **For Vercel:** The `vercel.json` file in the root directory will be used automatically
4. **For GitHub Pages:** You may need to add a `404.html` file that redirects to `index.html` (already included in build)

### For Server Deployment (with Admin)

1. Run full build:
   ```bash
   npm run build
   ```

2. Deploy the entire application

3. Set up:
   - Firebase configuration
   - Admin authentication
   - Server-side rendering support

---

## Why Exclude Admin from Static Build?

Admin pages require:
- ✅ Firebase write operations (can't be static)
- ✅ Authentication (needs server/session management)
- ✅ Dynamic data updates (incompatible with static export)
- ✅ File uploads (requires server-side handling)

Static export is **read-only** and perfect for the public website.

---

## Workflow Recommendations

### Development Workflow:
```bash
# Work on features
npm run dev

# Test admin features
# Visit http://localhost:3000/admin

# Build for production (public only)
npm run build:public

# Deploy /out directory
```

### Content Management Workflow:
```bash
# Run development server
npm run dev

# Login to admin
# Add/edit speakers, view submissions, etc.

# When ready to deploy updates
npm run build:public

# Deploy updated /out directory
```

---

## Build Script Details

The `build-public.sh` script:
1. Checks if `app/admin` exists
2. Moves it to `admin-backup` (outside app directory)
3. Runs `next build` (only builds public pages)
4. Captures exit code
5. Moves `admin-backup` back to `app/admin`
6. Reports success/failure

**Safe and reversible** - Admin folder is always restored!

---

## Troubleshooting

### Build Fails

If the build fails:
- Admin folder is automatically restored
- Check error messages in console
- Fix issues and run `npm run build:public` again

### Admin Missing After Build

This is **expected** behavior for `build:public`:
- Admin pages are not in `/out`
- They remain in your source code (`app/admin`)
- Available in `npm run dev` mode

### Need Admin in Production

Use a **hybrid deployment**:
- Static site for public pages (from `/out`)
- Separate server deployment for admin
- Or use full build with server deployment

---

## Summary

| Command | Use Case | Output |
|---------|----------|--------|
| `npm run dev` | Development | All pages (including admin) |
| `npm run build` | Full build | All pages in `/out` |
| `npm run build:public` | **Production (recommended)** | **Public pages only in `/out`** |

**For most deployments, use:** `npm run build:public` ✅


