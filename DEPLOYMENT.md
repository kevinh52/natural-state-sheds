# Deployment Guide for Natural State Sheds

This guide provides step-by-step instructions for deploying your Natural State Sheds website to various hosting platforms.

## Prerequisites

- Your website code is ready and tested locally
- You have a GitHub account (recommended for easy deployment)
- You have your custom domain ready (optional but recommended)

## Option 1: Vercel (Recommended)

Vercel is the easiest option for Next.js applications and offers excellent performance.

### Step 1: Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Ensure your repository is public or you have a Vercel account**

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `out` (auto-detected)
   - Install Command: `npm install` (auto-detected)
5. **Click "Deploy"**

### Step 3: Configure Custom Domain

1. **In your Vercel dashboard**, go to your project
2. **Click "Settings" → "Domains"**
3. **Add your custom domain** (e.g., `naturalstatesheds.com`)
4. **Update your DNS**:
   - Add a CNAME record pointing to your Vercel URL
   - Or use Vercel's nameservers if you want them to manage DNS

### Step 4: Environment Variables (if needed)

If you add any environment variables later:
1. Go to **Settings** → **Environment Variables**
2. Add your variables
3. Redeploy

## Option 2: Netlify

Netlify is another excellent option for static sites.

### Step 1: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `out`
5. **Click "Deploy site"**

### Step 2: Configure Custom Domain

1. **Go to "Site settings" → "Domain management"**
2. **Add custom domain**
3. **Update DNS records** as instructed

## Option 3: Cloudflare Pages

Cloudflare Pages is great if you're already using Cloudflare for DNS.

### Step 1: Deploy to Cloudflare Pages

1. **Go to [pages.cloudflare.com](https://pages.cloudflare.com)**
2. **Click "Create a project"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: 18
5. **Click "Save and Deploy"**

### Step 2: Configure Custom Domain

1. **Go to "Custom domains"**
2. **Add your domain**
3. **Update DNS** if needed

## Option 4: Traditional Web Hosting

If you prefer traditional web hosting (cPanel, etc.):

### Step 1: Build Locally

```bash
npm run build
```

### Step 2: Upload Files

1. **Upload the entire `out` folder** to your web hosting
2. **Ensure the files are in the public_html directory** (or equivalent)
3. **Test your site**

## Post-Deployment Checklist

### 1. Test Your Site

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Search functionality works
- [ ] Map displays properly
- [ ] Location pages load
- [ ] Mobile responsiveness works

### 2. SEO Verification

- [ ] Meta tags are present
- [ ] Page titles are correct
- [ ] URLs are SEO-friendly
- [ ] Sitemap is generated (if needed)

### 3. Performance Check

- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] No console errors

### 4. Analytics Setup (Optional)

Consider adding Google Analytics or similar:

1. **Create a Google Analytics account**
2. **Add the tracking code** to your layout
3. **Verify tracking is working**

## Updating Your Site

### For Vercel/Netlify/Cloudflare Pages:

1. **Make your changes locally**
2. **Commit and push to GitHub**
3. **Deployment happens automatically**

### For Traditional Hosting:

1. **Make your changes locally**
2. **Run `npm run build`**
3. **Upload the new `out` folder**

## Updating Dealer Data

### Method 1: Update CSV and Redeploy

1. **Edit `data/dealers.csv`**
2. **Commit and push changes**
3. **Site rebuilds automatically**

### Method 2: API Integration (Future Enhancement)

For real-time updates, you could:
1. **Set up a simple API** (Vercel Functions, Netlify Functions)
2. **Store dealer data in a database**
3. **Update via admin panel**

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (should be 18+)
- Ensure all dependencies are installed
- Check for TypeScript errors

**Map Not Loading:**
- Verify Leaflet CSS is included
- Check browser console for errors
- Ensure internet connection (for map tiles)

**Images Not Loading:**
- Check file paths
- Ensure images are in the `public` folder
- Verify Next.js Image component usage

**SEO Issues:**
- Check meta tags are properly set
- Verify page titles and descriptions
- Test with Google's Rich Results Test

### Getting Help

1. **Check the browser console** for errors
2. **Review the deployment logs** in your hosting platform
3. **Test locally** with `npm run dev`
4. **Check the Next.js documentation**

## Performance Optimization

### Automatic Optimizations

- **Static Generation**: All pages are pre-built
- **Code Splitting**: Automatic by Next.js
- **Image Optimization**: Next.js Image component

### Manual Optimizations

- **Compress images** before adding to public folder
- **Minimize CSS/JS** (handled by build process)
- **Use CDN** for static assets (handled by hosting platform)

## Security Considerations

- **HTTPS**: Automatically handled by modern hosting platforms
- **No sensitive data** in client-side code
- **Regular updates** of dependencies

---

**Need Help?** Contact your development team or refer to the platform-specific documentation. 