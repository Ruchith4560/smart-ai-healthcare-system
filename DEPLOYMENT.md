# Deployment Guide for Render

This guide explains how to deploy the Smart AI Healthcare application to Render.

## Prerequisites

- GitHub account with the code pushed
- Render account (https://render.com)

## Deployment Steps

### 1. Prepare the Repository

Make sure your repository includes:
- `render.yaml` - Deployment configuration
- `.env.example` - Environment variables template
- `app/requirements.txt` - Python dependencies
- `frontend/package.json` - Node.js dependencies

### 2. Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Fill in the details:
   - Name: `healthcare-db`
   - Database: `healthcare`
   - User: auto-generated
   - Region: Choose closest to you
   - Plan: Free or paid as needed
4. Save and note the connection string

### 3. Deploy the Application

**Option A: Using render.yaml (Recommended)**

1. Push your code to GitHub
2. Go to Render Dashboard
3. Click "New +" → "Web Service"
4. Select "Connect a repository" 
5. Choose your healthcare repository
6. Render will auto-detect render.yaml
7. Click "Deploy"

**Option B: Manual Setup**

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Fill in the details:
   - Name: `smart-ai-healthcare-api`
   - Environment: `Python 3.11`
   - Build Command:
     ```
     cd app && pip install -r requirements.txt && cd ../frontend && npm install && npm run build
     ```
   - Start Command:
     ```
     cd app && uvicorn main:app --host 0.0.0.0 --port 8000
     ```
4. Add Environment Variables:
   - Click "Environment"
   - Add the following (from your `.env` file):
     ```
     DATABASE_URL=<your-postgres-connection-string>
     SECRET_KEY=<generate-a-secure-random-string>
     ALLOWED_ORIGINS=<your-render-domain>
     ```
5. Connect PostgreSQL database:
   - Click "Add PostgreSQL"
   - Select the database you created
6. Click "Create Web Service"

### 4. Configure Environment Variables

Set these on Render Dashboard under Service Settings → Environment:

- `DATABASE_URL`: Auto-populated if linked to PostgreSQL
- `SECRET_KEY`: Generate using Python:
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(32))"
  ```
- `ALLOWED_ORIGINS`: Your Render URL (e.g., `https://yourdomain.onrender.com`)

### 5. Update CORS in Frontend

After deployment, update the API endpoint in `frontend/src/services/api.js`:

```javascript
const API_URL = process.env.VITE_API_URL || 'https://yourdomain.onrender.com/api';
```

### 6. Monitor Deployment

1. Check the "Logs" tab for any build or runtime errors
2. Once deployment is successful, visit your service URL
3. The application should be live!

## Troubleshooting

### Build Fails
- Check Python version compatibility
- Ensure all dependencies are in `requirements.txt`
- Check Node.js version for frontend build

### Database Connection Issues
- Verify DATABASE_URL is correct
- Run migrations if needed
- Check database user permissions

### CORS Errors
- Update ALLOWED_ORIGINS to match your domain
- Check frontend is making requests to correct API URL

### Frontend Not Loading
- Ensure frontend build completes successfully
- Check that dist folder is created
- Verify static file serving is configured

## Local Testing Before Deployment

```bash
# Backend
cd app
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Production Recommendations

- Use a strong SECRET_KEY (Generate with Python secrets module)
- Keep DATABASE_URL secure - don't commit to repository
- Enable HTTPS (Render does this by default)
- Set up monitoring and logging
- Consider upgrading from free tier for production use
- Implement proper error handling and logging
- Add rate limiting for API endpoints
