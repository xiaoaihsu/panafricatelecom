/**
 * PAN-AFRICA TELECOM — SHOP MIGRATION & DEPLOYMENT GUIDE
 * ======================================================
 * 
 * HOW THIS WEBSITE WORKS
 * ----------------------
 * This is a Next.js 16 application — static-first (SSG) with optional dynamic routes.
 * Products are stored in JSON files (data/products.json) so you can edit them without code.
 * 
 * DEPLOYMENT OPTIONS (from simplest to most flexible)
 * ===================================================
 * 
 * OPTION A: VERCEL (RECOMMENDED — FREE, FASTEST)
 * -----------------------------------------------
 * 1. Create GitHub account at github.com
 * 2. Create a new repository: "panafricatelecom"
 * 3. Push this project to GitHub:
 *      git init
 *      git add .
 *      git commit -m "initial"
 *      git branch -M main
 *      git remote add origin https://github.com/YOUR-USERNAME/panafricatelecom.git
 *      git push -u origin main
 * 4. Go to vercel.com → Sign up → "Import Project" → select your GitHub repo
 * 5. Vercel auto-detects Next.js → click Deploy
 * 6. Your site is live at: https://panafricatelecom.vercel.app
 * 7. To use your own domain (panafricatelecom.co.za):
 *    - Vercel Dashboard → Domains → Add → panafricatelecom.co.za
 *    - Go to your domain registrar (where you bought panafricatelecom.co.za)
 *    - Add DNS records Vercel gives you (usually CNAME)
 * 8. Future updates: just push to GitHub → Vercel auto-deploys
 * 
 * OPTION B: NETLIFY (FREE, SIMPLE)
 * ---------------------------------
 * 1. Push code to GitHub (same as above)
 * 2. Go to netlify.com → Sign up → "Add new site" → Import from GitHub
 * 3. Select repository → Deploy settings (build command: npm run build, publish: .next)
 * 4. Add custom domain in Site settings → Domain management
 * 
 * OPTION C: cPANEL / SHARED HOSTING (your current WordPress host)
 * -----------------------------------------------------------------
 * Your current host (panafricatelecom.co.za) likely runs cPanel/shared Linux hosting.
 * This type of hosting does NOT support Next.js out of the box because Next.js needs
 * a Node.js server. However, you have TWO paths:
 * 
 * PATH 1: SUBDOMAIN (keep WordPress + add Next.js on subdomain)
 * --------------------------------------------------------------
 * 1. In cPanel → Subdomains → Create: shop.panafricatelecom.co.za
 *    Document root: /public_html/shop
 * 2. Deploy Next.js as a standalone app on a Node.js host (Railway, Render, etc.)
 *    - Use Vercel or Railway (see OPTION A or D) for the shop
 * 3. Point subdomain CNAME to your new host
 * 4. Result: yoursite.co.za stays on WordPress, shop.yoursite.co.za is the new shop
 * 
 * PATH 2: FULL MIGRATION (replace WordPress entirely)
 * ---------------------------------------------------
 * You will need to move away from basic shared hosting to a Node.js-capable host.
 * This means either:
 *    - Cloud VPS (DigitalOcean, Linode, AWS Lightsail) — you manage everything
 *    - Managed Node.js hosting (Railway, Render, Vercel) — easier
 * 
 * STEP-BY-STEP FOR PATH 2 ON RAILWAY (cheapest managed option):
 * 
 * 1. Go to railway.app → Sign up (free tier available)
 * 2. "New Project" → "Deploy from GitHub repo"
 * 3. Select your panafricatelecom repo
 * 4. Railway auto-detects Next.js build
 * 5. In Project Settings → Variables: add NODE_ENV=production
 * 6. Deploy → get a URL like: yourapp.railway.app
 * 7. Buy domain from any registrar (Namecheap, Hover, afrihost, co.za registrars)
 * 8. Add custom domain in Railway → Settings → Domains
 * 9. Update DNS at your registrar per Railway's instructions
 * 
 * NOTE ON WORDPRESS MIGRATION:
 * -----------------------------
 * Since you're replacing WordPress entirely:
 * 1. Export your WordPress content (Posts, Pages, Images)
 *    - WordPress dashboard → Tools → Export → All content (XML file)
 *    - Download all media from /wp-content/uploads/
 * 2. Import content into new site:
 *    - For blog posts: create similar pages in Next.js
 *    - For images: upload to /public/images/ or use a CDN
 *    - For products: use the /admin panel on the new site
 * 3. Redirects: After DNS switch, add redirects in your new host so
 *    old WordPress URLs point to new pages
 *    e.g., /about → /about, /services → /services, /shop → /shop
 * 
 * 
 * KEEPING WORDPRESS + ADDING SHOP (hybrid approach)
 * =================================================
 * 1. Keep WordPress at panafricatelecom.co.za (main company site)
 * 2. Deploy Next.js shop to shop.panafricatelecom.co.za (subdomain)
 * 3. Link from WordPress menu to shop.panafricatelecom.co.za
 * 4. Benefits: no risk to existing site, gradual migration
 * 
 * 
 * CRITICAL CHECKLIST BEFORE GOING LIVE
 * =====================================
 * [ ] Export/backup your WordPress site (All-in-One WP Migration plugin)
 * [ ] Set up new hosting (Vercel recommended)
 * [ ] Test everything on the new URL
 * [ ] Update all content (products, prices, images)
 * [ ] Set up email (new host won't have WordPress email — use Gmail business or Zoho)
 * [ ] Update DNS at registrar
 * [ ] Test thoroughly on new host
 * [ ] Keep WordPress backup for 30 days after switch
 * [ ] Monitor 404s and fix with redirects
 * 
 * 
 * ENVIRONMENT VARIABLES (if needed later)
 * ======================================
 * Create a .env.local file (not committed to git):
 * 
 * # For email (when adding contact forms with email)
 * SMTP_USER=your@email.com
 * SMTP_PASS=yourpassword
 * 
 * # For payment gateway (when adding real payments)
 * STRIPE_SECRET_KEY=sk_live_...
 * NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 * 
 * For now, these are not needed — the basic shop works without them.
 * 
 * 
 * BUILD COMMANDS
 * ==============
 * Development:  npm run dev     (runs at localhost:3000)
 * Production:   npm run build   (creates .next/ folder)
 * Preview:     npm run start   (serves production build locally)
 * 
 * 
 * SUPPORT
 * =======
 * Next.js docs: https://nextjs.org/docs
 * Vercel deployment: https://vercel.com/docs
 * Railway docs: https://docs.railway.app
 */

export {};