# Railway Deployment Guide for NOFX

This guide walks you through deploying NOFX to Railway using the two-service architecture (backend + frontend).

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository with NOFX code
- (Optional) Railway CLI installed

## Architecture

- **Backend Service**: Go API server with SQLite database
- **Frontend Service**: React app served via Nginx
- **Railway Volume**: Persistent storage for SQLite database and logs

## Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your NOFX repository
5. Railway will create a project and detect the Dockerfiles

## Step 2: Create Backend Service

1. In your Railway project, click "New Service"
2. Select "GitHub Repo" and choose your repository
3. Railway may auto-detect a Dockerfile - **you need to change it**
4. Configure the service:
   - **Name**: `nofx-backend` (or your preferred name)
   - Go to **Settings** → **Build**
   - **Dockerfile Path**: Set to `docker/Dockerfile.backend`
   - **Root Directory**: `/` (project root) - leave as default
   - **Important**: Make sure the Dockerfile path is explicitly set to `docker/Dockerfile.backend`

### Backend Environment Variables

Add these environment variables in the **backend service** in Railway dashboard (NOT the frontend service):

**Required**:
- `JWT_SECRET`: Your JWT secret key (generate a strong random string)
  - Example: Use `openssl rand -base64 32` to generate

**Optional**:
- `ADMIN_MODE`: Set to `true` or `1` to enable admin mode (default: `true`)
  - **Backend only** - Set this in the backend service, not the frontend
  - When enabled, all API endpoints require admin authentication
  - **Important**: When `ADMIN_MODE` is set to `true`, you must also set `NOFX_ADMIN_PASSWORD`
  - The environment variable value will be synced to the database on startup
- `NOFX_ADMIN_PASSWORD`: Admin password required when `ADMIN_MODE=true` (required if admin mode is enabled)
  - **Backend only** - Set this in the backend service, not the frontend
  - Use a strong, secure password
  - This is used to authenticate admin users when admin mode is enabled
- `BETA_MODE`: Set to `true` to enable beta mode (default: `false`)
- `DB_PATH`: Custom database path (default: `/app/data/config.db`)
- `TZ`: Timezone (e.g., `UTC`, `America/New_York`)

**Note**: `PORT` is automatically set by Railway - do not set it manually.

### Create Railway Volume for Backend

1. In the backend service, go to "Volumes" tab
2. Click "Add Volume"
3. Configure:
   - **Name**: `nofx-data` (or your preferred name)
   - **Mount Path**: `/app/data`
   - **Size**: Start with 1GB (can be increased later)

This volume will persist:
- `config.db` (SQLite database)
- `decision_logs/` (AI decision logs)
- `beta_codes.txt` (if used)

## Step 3: Create Frontend Service

1. In your Railway project, click "New Service" again
2. Select "GitHub Repo" and choose the same repository
3. **Important**: Railway may try to use the backend Dockerfile - you must change it
4. Configure the service:
   - **Name**: `nofx-frontend` (or your preferred name)
   - Go to **Settings** → **Build**
   - **Dockerfile Path**: Set to `docker/Dockerfile.frontend` (this is critical!)
   - **Root Directory**: `/` (project root) - leave as default
   - **Important**: Double-check that the Dockerfile path shows `docker/Dockerfile.frontend` and not `docker/Dockerfile.backend`

### Frontend Environment Variables

Add this environment variable:

**Required**:
- `BACKEND_URL`: The backend service URL
  - Format: `http://<backend-service-name>:<port>`
  - Example: If backend service is named `nofx-backend`, use: `http://nofx-backend:8080`
  - **Note**: Railway provides service URLs via environment variables. You can also use the Railway-generated service URL.

**How to find backend URL**:
1. Go to backend service in Railway
2. Click "Settings" → "Networking"
3. Copy the "Private Network" URL or use the service name

**Alternative**: Railway may provide `${{NOFX_BACKEND.PRIVATE_URL}}` or similar. Check Railway's service variables.

## Step 4: Configure Service Networking

Railway automatically creates a private network between services. The frontend can reach the backend using:

- Service name: `http://nofx-backend:8080` (if backend is named `nofx-backend`)
- Or use Railway's service URL environment variables

## Step 5: Deploy

1. Railway will automatically deploy when you push to the connected branch
2. Or trigger a manual deploy from the Railway dashboard
3. Monitor build logs for any issues

### Build Time

- Backend: ~5-10 minutes (compiles TA-Lib and Go binary)
- Frontend: ~2-5 minutes (builds React app)

## Step 6: Configure Custom Domains (Optional)

1. Go to frontend service → "Settings" → "Networking"
2. Click "Generate Domain" or add custom domain
3. Railway will provide a public URL like `https://nofx-frontend-production.up.railway.app`

The frontend will automatically proxy API requests to the backend.

## Step 7: Verify Deployment

1. **Backend Health Check**:
   ```bash
   curl https://<backend-url>/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Frontend Health Check**:
   ```bash
   curl https://<frontend-url>/health
   ```
   Should return: `OK`

3. **Access Web Interface**:
   - Open frontend URL in browser
   - Should see the NOFX landing page
   - API calls should work (check browser console for errors)

## Troubleshooting

### Backend Issues

**Database not persisting**:
- Verify Railway Volume is mounted at `/app/data`
- Check volume is attached to backend service
- Verify database file exists: Check logs for database path

**Port errors**:
- Railway automatically sets `PORT` - don't override it
- Ensure code reads `PORT` env var (already implemented)

**TA-Lib build failures**:
- Check build logs for compilation errors
- May take longer on first build (5-10 minutes)

### Frontend Issues

**API calls failing**:
- Verify `BACKEND_URL` environment variable is set correctly
- Check nginx logs in Railway dashboard
- Ensure backend service is running and accessible

**502 Bad Gateway**:
- Backend service may not be running
- Check backend health endpoint
- Verify `BACKEND_URL` is correct

### General Issues

**Build fails**:
- Check Railway build logs
- Verify Dockerfiles are correct
- Ensure all dependencies are in Dockerfiles

**Service won't start**:
- Check service logs in Railway dashboard
- Verify environment variables are set
- Check health check endpoints

## Environment Variable Reference

### Backend Service

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | Auto | `8080` | Railway automatically sets this |
| `JWT_SECRET` | Yes | - | JWT secret key for authentication |
| `ADMIN_MODE` | No | `true` | Enable admin mode. Set to `true` or `1` to enable. When enabled, requires `NOFX_ADMIN_PASSWORD`. Value is synced to database on startup. |
| `NOFX_ADMIN_PASSWORD` | Conditional | - | Admin password (required when `ADMIN_MODE=true`). Used for admin authentication when admin mode is enabled. |
| `BETA_MODE` | No | `false` | Enable beta mode (requires beta codes) |
| `DB_PATH` | No | `/app/data/config.db` | SQLite database path |
| `TZ` | No | `UTC` | Timezone |

### Frontend Service

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | Auto | `80` | Railway automatically sets this |
| `BACKEND_URL` | Yes | - | Backend service URL (e.g., `http://nofx-backend:8080`) |

## Data Persistence

The Railway Volume mounted at `/app/data` persists:

- **config.db**: SQLite database with all configurations
- **decision_logs/**: AI trading decision logs
- **beta_codes.txt**: Beta access codes (if used)

**Important**: Volume data persists across deployments. To reset:
1. Detach volume in Railway dashboard
2. Delete volume (⚠️ destroys all data)
3. Create new volume and attach

## Scaling

Railway supports horizontal scaling:

1. Go to service → "Settings" → "Scaling"
2. Adjust instance count
3. Railway will load balance requests

**Note**: SQLite is not designed for multiple writers. For production scaling, consider migrating to PostgreSQL.

## Cost Optimization

- **Free Tier**: 500 hours/month, $5 credit
- **Volume Storage**: Charged per GB/month
- **Build Time**: Free tier has build time limits

Monitor usage in Railway dashboard.

## Security Notes

1. **JWT Secret**: Use a strong, random secret (never commit to git)
2. **API Keys**: Store in Railway environment variables (encrypted)
3. **Database**: SQLite file is in Railway Volume (private)
4. **Network**: Services communicate via private Railway network

## Next Steps

After deployment:

1. Configure AI models through web interface
2. Configure exchange APIs (Binance, Hyperliquid, etc.)
3. Create traders
4. Start trading!

## Support

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- NOFX Issues: GitHub Issues

## Migration from Local/Docker

If migrating from local Docker setup:

1. Export database: `sqlite3 config.db .dump > backup.sql`
2. Deploy to Railway
3. Import data via web interface or SQLite CLI
4. Update environment variables in Railway
5. Verify all configurations migrated

---

**Last Updated**: 2025-01-27

