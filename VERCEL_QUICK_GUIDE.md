# Vercel Configuration - Quick Reference

## 📋 Exact Settings for Your Screenshot

Based on the Vercel configuration screen you showed, here's what to set:

---

### 1️⃣ Vercel Team

✅ **Daniel's projects** - Keep as is

---

### 2️⃣ Project Name

✅ **new-website** - Keep as is (or change to your preference)

---

### 3️⃣ Framework Preset

Select: **Other** (or **Express** if available)

---

### 4️⃣ Root Directory

✅ **./** - Keep as is (default)

---

### 5️⃣ Build and Output Settings

**Build Command:**

```
None
```

Toggle: **OFF** ❌

**Output Directory:**

```
N/A
```

Toggle: **OFF** ❌

**Install Command:**

```
npm install
```

Toggle: **ON** ✅ (should be default)

---

### 6️⃣ Environment Variables ⚠️ IMPORTANT

Click **"Add More"** and add this variable:

**Key:**

```
MONGO_DB
```

**Value:**

```
mongodb+srv://dani034406:Daniel6285@cluster0.g0vqepz.mongodb.net/xtoken_registrations?retryWrites=true&w=majority&appName=Cluster0
```

**Remove the example variable** (EXAMPLE_NAME / I9JU23NF394R6HH) - click the ➖ button

---

## 🚀 After Configuration

1. Click **Deploy** button
2. Wait 1-2 minutes for build
3. You'll get a URL like: `https://new-website-xxx.vercel.app`
4. Visit your live site!

---

## 🔐 MongoDB Atlas Setup (IMPORTANT!)

Before your site works, you MUST allow Vercel to access MongoDB:

1. Go to **MongoDB Atlas Dashboard**
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Confirm**

⚠️ Without this step, your API will fail to connect to the database!

---

## ✅ Quick Test

After deployment:

1. Visit: `https://your-url.vercel.app`
2. Fill the registration form
3. Click "Join The Private Sale"
4. Should see: "✓ Registration successful!"
5. Check MongoDB Atlas → Collections → xtoken_registrations → registrations

---

## 🐛 If Something Goes Wrong

### Error during deployment:

- Check Vercel logs (click on deployment → View Details)
- Make sure all files are committed to Git

### Site loads but form doesn't work:

- Check Environment Variables are set correctly
- Make sure MongoDB Atlas allows 0.0.0.0/0
- Check browser console for errors (F12)

### API returns errors:

- Check Vercel Functions logs
- Verify MONGO_DB environment variable
- Test: `https://your-url.vercel.app/api/health`

---

## 📸 Visual Checklist

```
✅ Framework Preset: Other
✅ Root Directory: ./
❌ Build Command: None (Toggle OFF)
❌ Output Directory: N/A (Toggle OFF)
✅ Install Command: npm install (Toggle ON)
✅ Environment Variables:
   Key: MONGO_DB
   Value: mongodb+srv://...
```

---

## 🎯 That's It!

Your configuration is now ready for deployment. Click **Deploy** and you're live! 🚀
