# Deploying to Vercel

## Quick Deploy

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Login/signup when asked
   - Confirm project settings
   - Deploy!

3. **Production Deploy**:
   ```bash
   vercel --prod
   ```

## Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## After Deployment

Once deployed, you'll get a URL like: `your-portfolio.vercel.app`

Test it:
```bash
curl your-portfolio.vercel.app
curl your-portfolio.vercel.app/projects
curl your-portfolio.vercel.app/json
```

## Custom Domain

In Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

Then you can do:
```bash
curl yourname.com
```

## Environment Variables

If you need environment variables, add them in:
- Vercel Dashboard → Project Settings → Environment Variables

## Local Testing

```bash
npm start
curl http://localhost:3000
```
