# Blog Website — run & deliver

React Router needs a **web server** (do not open `dist/index.html` directly in the browser).

## Development (two terminals)

1. **API + MongoDB**
   ```bash
   cd Server
   node main.js
   ```
   MongoDB must be running on `mongodb://localhost:27017`.

2. **Frontend**
   ```bash
   cd App
   npm install
   npm run dev
   ```
   Open http://localhost:5173 — routes like `/about`, `/author` work via Vite proxy.

## Deliver / production (single server — recommended)

Build the app, then serve **API + React** together on port **3000**:

```bash
cd App
npm install
npm run build

cd ../Server
npm install
node main.js
```

Open **http://localhost:3000** — home, `/about`, `/contact`, `/author`, `/blog/your-slug` all work.

## Author password

The `/author` page is protected. Default password: **`blogadmin`**

To change it, set `AUTHOR_PASSWORD` before starting the server:

```bash
# Windows PowerShell
$env:AUTHOR_PASSWORD="your-secure-password"
node main.js
```

Or copy `Server/.env.example` to `Server/.env` and edit the value (load with a tool like `dotenv` if you add it, or use the env var above).

Publishing, editing, and deleting posts requires a valid sign-in. Reading the public blog does not.

Share the whole **Blog Website** folder. The recipient needs:

- Node.js installed  
- MongoDB running  
- Commands above (`npm run build` in `App`, then `node main.js` in `Server`)

## What was fixed

- Express now uses `fallthrough: true` on static files so paths like `/about` return `index.html` and React Router can render.
- Frontend API calls use relative URLs (`/blogs`, `/add`) so they work when the site is served from the same server.
