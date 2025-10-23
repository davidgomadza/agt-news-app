# The AGT - News App

A modern news application built with Encore.ts and React, similar to the New York Post online.

## Features

- 📰 Article management with categories
- 🔥 Breaking news section
- ⭐ Featured articles
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- ⚡ Fast performance with React Query
- 🔐 Type-safe API communication

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Encore CLI installed

### Setup

1. **Add your logo:**
   - Replace `frontend/public/logo.png` with your actual logo file
   - The logo should be in PNG format for best results

2. **Run the application:**
   ```bash
   encore run
   ```

3. **Access the application:**
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:4000/api

### Creating Sample Content

Use the API endpoints to create articles:

```bash
# Create an article
curl -X POST http://localhost:4000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Breaking: Major News Event",
    "excerpt": "This is a brief summary of the article...",
    "content": "Full article content goes here...",
    "author": "John Doe",
    "categoryId": 1,
    "isBreaking": true,
    "isFeatured": false
  }'
```

## Project Structure

```
backend/
  article/          # Article service
  category/         # Category service
  db/              # Database migrations
frontend/
  components/      # Reusable components
  pages/          # Page components
  public/         # Static assets (add logo here!)
```

## Categories

The app comes pre-configured with these categories:
- Breaking News
- Politics
- Sports
- Entertainment
- Business
- Technology
- Opinion
- Lifestyle

## License

MIT
