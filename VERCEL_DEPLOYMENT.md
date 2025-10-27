# Vercel Deployment Guide

## 🚀 How to Deploy to Vercel

### Step 1: Configure Environment Variables in Vercel

In the Vercel deployment screen, under **Environment Variables**, add:

| Key        | Value                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `MONGO_DB` | `mongodb+srv://dani034406:Daniel6285@cluster0.g0vqepz.mongodb.net/xtoken_registrations?retryWrites=true&w=majority&appName=Cluster0` |

### Step 2: Configure Build Settings

**Framework Preset:** Select **Other** or **Express**

**Root Directory:** `./` (leave as default)

**Build Command:** Leave as **None** or empty (toggle OFF)

**Output Directory:** Leave as **N/A** or empty (toggle OFF)

**Install Command:** `npm install` (should be default)

### Step 3: Deploy

Click **Deploy** button and wait for the build to complete.

---

## 📁 Project Structure for Vercel

```
new_website/
├── api/
│   └── index.js          # Serverless API functions
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── index.html            # Frontend
├── *.png                 # Images
└── README.md
```

---

## 🔧 What Was Changed

### 1. Created `vercel.json`

- Configures how Vercel builds and routes your application
- Routes API requests to `/api/*`
- Serves static files (HTML, images)

### 2. Created `api/index.js`

- Serverless function version of your Express app
- Uses connection pooling for better performance
- Exports the Express app for Vercel to use

### 3. Project Structure

- Moved API logic to `api/` directory
- Kept frontend files in root directory
- Maintained all validation logic

---

## 🌐 After Deployment

Once deployed, your site will be available at:

```
https://your-project-name.vercel.app
```

### API Endpoints:

- `https://your-project-name.vercel.app/` - Homepage
- `https://your-project-name.vercel.app/api/health` - Health check
- `https://your-project-name.vercel.app/api/register` - Registration endpoint
- `https://your-project-name.vercel.app/api/registrations` - Get all registrations

---

## 🔒 Important Security Notes

1. **Environment Variables**:

   - Always set `MONGO_DB` in Vercel's Environment Variables section
   - Never commit `.env` file to Git
   - Vercel will use the environment variables you set in their dashboard

2. **MongoDB Atlas**:

   - Make sure to whitelist Vercel's IP addresses in MongoDB Atlas
   - Or allow access from anywhere (0.0.0.0/0) for Vercel deployments
   - Go to: MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

3. **Domain**:
   - Vercel provides a free `.vercel.app` domain
   - You can add a custom domain in Vercel settings

---

## 🐛 Troubleshooting

### Error: Cannot connect to MongoDB

**Solution**:

1. Check if `MONGO_DB` environment variable is set in Vercel
2. Whitelist Vercel IPs in MongoDB Atlas (or allow 0.0.0.0/0)
3. Check logs in Vercel dashboard

### Error: 404 on API routes

**Solution**:

- Make sure `vercel.json` is in the root directory
- Check if `api/index.js` exists
- Redeploy the project

### Error: Module not found

**Solution**:

- Make sure all dependencies are in `package.json`
- Check Vercel build logs
- Try running `npm install` locally to verify

---

## 📊 Monitoring

### View Logs:

1. Go to Vercel Dashboard
2. Select your project
3. Click on "Deployments"
4. Click on any deployment to see logs

### Check Database:

1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections"
3. Find `xtoken_registrations` database
4. View the `registrations` collection

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you:

- Push to your Git repository (GitHub, GitLab, Bitbucket)
- Merge a pull request
- Make changes in the Vercel dashboard

Every push creates a new deployment with a unique URL for testing.

---

## 💡 Local Development

To continue developing locally:

```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Access at http://localhost:3001
```

The `server.js` file is kept for local development, while `api/index.js` is used for Vercel deployment.

---

## ✅ Deployment Checklist

- [ ] Environment variable `MONGO_DB` added in Vercel
- [ ] MongoDB Atlas allows access from 0.0.0.0/0
- [ ] `vercel.json` exists in root directory
- [ ] `api/index.js` exists with serverless function
- [ ] All files committed to Git repository
- [ ] Framework preset set to "Other" or "Express"
- [ ] Build Command set to "None" or empty
- [ ] Clicked "Deploy" button

---

## 🎉 Success!

Once deployed, test your site:

1. Visit your Vercel URL
2. Fill out the registration form
3. Submit and check for success message
4. Verify data in MongoDB Atlas
5. Share your live site! 🚀
