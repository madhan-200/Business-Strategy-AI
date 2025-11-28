# StratAI Backend

Backend API for the Dynamic Business Strategy Engine.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)

4. Setup database:
```bash
# Create database
createdb stratai

# Run schema
psql -d stratai -f schema.sql
```

## Development

Run in development mode with hot reload:
```bash
npm run dev
```

## Production

Build and run:
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/strategy/generate
Generate a new business strategy.

**Request Body:**
```json
{
  "name": "My Business",
  "industry": "Technology",
  "niche": "SaaS",
  "audience": "Small business owners",
  "goals": "Increase revenue",
  "challenges": "Limited marketing budget"
}
```

**Response:** Strategy object with AI-generated insights.

### GET /api/strategy/:id
Retrieve a strategy by ID.

**Response:** Strategy object.

### GET /health
Health check endpoint.

## Database Schema

See `schema.sql` for the complete database structure.

Tables:
- `users`: User accounts
- `businesses`: Business profiles
- `strategies`: Generated strategies with JSONB fields for flexible data storage
