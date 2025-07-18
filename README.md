# Natural State Sheds Website

A comprehensive, SEO-optimized website for Natural State Sheds, serving as a landing page for portable building dealers throughout Arkansas.

## Features

- **SEO-Optimized Landing Pages**: Individual pages for major/mid-major Arkansas cities
- **Interactive Map**: Shows all dealer locations with Leaflet.js
- **Search Functionality**: Search dealers by city or zip code
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Dynamic Content**: Easy to update dealer information via CSV
- **Location Pages**: SEO-focused pages for each city, showing closest dealer if none in that city

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js with React-Leaflet
- **CSV Parsing**: PapaParse
- **Language**: TypeScript
- **Deployment**: Vercel, Netlify, or Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd natural-state-sheds
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
natural-state-sheds/
├── data/
│   └── dealers.csv          # Dealer data (update this file)
├── public/
│   └── logo.svg            # Company logo
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── locations/      # Location pages
│   ├── components/         # React components
│   └── lib/
│       └── dealers.ts      # Dealer utilities
└── README.md
```

## Updating Dealer Data

### CSV Format

The dealer data is stored in `data/dealers.csv`. The CSV should have the following columns:

```csv
Website Disp,Phone,Website,BarnDealer.,BarnDealerlr,Shipping Stre,Shipping City,Shipping Stat,Shipping Zip/,3D Builder Si,Facebook Url,Email Addres
```

### Adding/Removing Dealers

1. **Edit the CSV file**: Update `data/dealers.csv` with your dealer information
2. **Rebuild the site**: The site will automatically use the updated data
3. **Deploy**: Push changes to trigger a new deployment

### CSV Column Descriptions

- `Website Disp`: Dealer display name
- `Phone`: Contact phone number
- `Website`: Dealer website URL
- `Shipping Stre`: Street address
- `Shipping City`: City name
- `Shipping Stat`: State (should be "Arkansas")
- `Shipping Zip/`: Zip code
- `Facebook Url`: Facebook profile/page
- `Email Addres`: Email address

## Deployment

### Option 1: Vercel (Recommended)

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Deploy automatically

2. **Environment Variables** (if needed):
   - Add any environment variables in Vercel dashboard

3. **Custom Domain**:
   - Add your custom domain in Vercel settings

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `out`
3. **Deploy**: Connect your repository to Netlify

### Option 3: Cloudflare Pages

1. **Build Command**: `npm run build`
2. **Build Output Directory**: `out`
3. **Node.js Version**: 18

### Build Configuration

Update `next.config.ts` for static export:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

## SEO Features

### Meta Tags
- Dynamic titles and descriptions for each city page
- Open Graph tags for social sharing
- Keywords targeting shed-related searches

### URL Structure
- `/locations/[city]` - Individual city pages
- SEO-friendly URLs (e.g., `/locations/little-rock`)

### Content Optimization
- Location-specific content for each city
- Relevant keywords naturally integrated
- Internal linking between pages

## Customization

### Colors
The color scheme is based on your logo:
- **Dark Green**: `#228B22`
- **Brown**: `#8B4513`
- **Light Blue**: `#87CEEB`
- **Cream**: `#F5F5DC`

### Logo
Replace `public/logo.svg` with your actual logo file.

### Styling
Modify `src/app/globals.css` to adjust colors and styling.

## Adding New Cities

1. **Update coordinates**: Add city coordinates in `src/lib/dealers.ts`
2. **Generate pages**: Pages are automatically generated for all cities in the coordinates list
3. **Deploy**: Changes will be reflected after deployment

## Performance

- **Static Generation**: All pages are pre-built for fast loading
- **Image Optimization**: Next.js Image component for optimized images
- **Code Splitting**: Automatic code splitting for better performance

## Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Contact your development team

## License

This project is proprietary to Natural State Sheds.

---

**Last Updated**: July 2024
**Version**: 1.0.0
