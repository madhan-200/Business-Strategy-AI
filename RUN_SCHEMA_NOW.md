# 🎯 Final Step: Run Database Schema

## ✅ What's Done:
- Database connection string updated in `backend/.env`
- Connection: `postgresql://postgres:madhan@2003@db.nrgitcfnirilqmkjtpee.supabase.co:5432/postgres`

---

## 📋 Now: Create Database Tables

### **In Your Supabase Dashboard:**

1. **Click "SQL Editor"** in the left sidebar
2. **Click "New query"** button
3. **Copy the schema below** and paste it into the SQL Editor
4. **Click "Run"** (or press Ctrl+Enter)
5. You should see: **"Success. No rows returned"**

---

## 📄 Schema to Run:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  niche VARCHAR(255),
  audience TEXT,
  goals TEXT,
  challenges TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
);

-- Create strategies table
CREATE TABLE IF NOT EXISTS strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  summary TEXT,
  growth_score INTEGER,
  target_audience JSONB,
  marketing_channels JSONB,
  sales_funnel JSONB,
  content_calendar JSONB,
  pricing_strategy JSONB,
  competitors JSONB,
  kpis JSONB,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_strategies_business_id ON strategies(business_id);
CREATE INDEX idx_strategies_generated_at ON strategies(generated_at DESC);
```

---

## ✅ Verify Tables Created

After running the schema:

1. Go to **"Table Editor"** in Supabase sidebar
2. You should see **3 tables**:
   - `users`
   - `businesses`
   - `strategies`

---

## 🚀 After Schema is Run

Once you see the tables, you're **100% READY TO LAUNCH!**

Run these commands:

```bash
# Install dependencies (if not done)
npm install
cd backend && npm install && cd ..

# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend  
npm run dev
```

Visit: **http://localhost:5173**

---

## 🎉 You're Done!

After running the schema, your StratAI platform will be fully operational!

**Let me know when you've run the schema and I'll help you start the app!** 🚀
