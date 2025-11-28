# Quick Setup Script for StratAI
# Run this script to set up the database using Supabase (cloud)

Write-Host "🚀 StratAI Database Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if backend .env exists
if (!(Test-Path "backend\.env")) {
    Write-Host "❌ backend\.env not found. Creating from example..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Created backend\.env" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 STEP 1: Database Setup" -ForegroundColor Yellow
Write-Host "=========================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose your database option:" -ForegroundColor White
Write-Host "  1. Supabase (Cloud - Recommended, Free, Easy)" -ForegroundColor Green
Write-Host "  2. Local PostgreSQL (Requires installation)" -ForegroundColor Yellow
Write-Host ""

$choice = Read-Host "Enter choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "🌐 Setting up Supabase..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Follow these steps:" -ForegroundColor White
    Write-Host "1. Open https://supabase.com in your browser" -ForegroundColor White
    Write-Host "2. Sign up or log in" -ForegroundColor White
    Write-Host "3. Click 'New Project'" -ForegroundColor White
    Write-Host "4. Fill in:" -ForegroundColor White
    Write-Host "   - Project Name: stratai" -ForegroundColor Gray
    Write-Host "   - Database Password: (create a strong password)" -ForegroundColor Gray
    Write-Host "   - Region: (choose closest to you)" -ForegroundColor Gray
    Write-Host "5. Wait 2 minutes for project creation" -ForegroundColor White
    Write-Host "6. Go to Settings → Database → Connection String → URI" -ForegroundColor White
    Write-Host ""
    
    Start-Process "https://supabase.com"
    
    Write-Host "Press Enter after you've created the project..." -ForegroundColor Yellow
    Read-Host
    
    Write-Host ""
    $dbUrl = Read-Host "Paste your Supabase connection string here"
    
    # Update backend .env
    $envContent = Get-Content "backend\.env" -Raw
    $envContent = $envContent -replace 'DATABASE_URL=.*', "DATABASE_URL=$dbUrl"
    Set-Content "backend\.env" -Value $envContent
    
    Write-Host "✅ Database URL updated in backend\.env" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now, let's run the schema:" -ForegroundColor Cyan
    Write-Host "1. Go to Supabase Dashboard → SQL Editor" -ForegroundColor White
    Write-Host "2. Click 'New Query'" -ForegroundColor White
    Write-Host "3. Copy the contents of backend\schema.sql" -ForegroundColor White
    Write-Host "4. Paste and click 'Run'" -ForegroundColor White
    Write-Host ""
    
    # Open schema file
    Start-Process "notepad" -ArgumentList "backend\schema.sql"
    Start-Process "https://app.supabase.com"
    
    Write-Host "Press Enter after running the schema..." -ForegroundColor Yellow
    Read-Host
    
} else {
    Write-Host ""
    Write-Host "📦 Local PostgreSQL Setup" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please install PostgreSQL first:" -ForegroundColor Yellow
    Write-Host "https://www.postgresql.org/download/windows/" -ForegroundColor Blue
    Write-Host ""
    Write-Host "After installation, run this script again." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "📋 STEP 2: Firebase Setup" -ForegroundColor Yellow
Write-Host "=========================" -ForegroundColor Yellow
Write-Host ""

Write-Host "Opening Firebase Console..." -ForegroundColor Cyan
Start-Process "https://console.firebase.google.com"
Write-Host ""

Write-Host "Follow these steps in Firebase Console:" -ForegroundColor White
Write-Host ""
Write-Host "A. Create Project (if not exists):" -ForegroundColor Cyan
Write-Host "   1. Click 'Add project'" -ForegroundColor White
Write-Host "   2. Name: stratai" -ForegroundColor White
Write-Host "   3. Disable Analytics (optional)" -ForegroundColor White
Write-Host "   4. Click 'Create project'" -ForegroundColor White
Write-Host ""

Write-Host "B. Enable Authentication:" -ForegroundColor Cyan
Write-Host "   1. Go to Build → Authentication" -ForegroundColor White
Write-Host "   2. Click 'Get started'" -ForegroundColor White
Write-Host "   3. Enable 'Email/Password'" -ForegroundColor White
Write-Host "   4. Enable 'Google'" -ForegroundColor White
Write-Host ""

Write-Host "C. Get Web Config:" -ForegroundColor Cyan
Write-Host "   1. Go to Project Settings (gear icon)" -ForegroundColor White
Write-Host "   2. Scroll to 'Your apps' → Click Web icon (</>) " -ForegroundColor White
Write-Host "   3. App nickname: stratai-web" -ForegroundColor White
Write-Host "   4. Copy the firebaseConfig object" -ForegroundColor White
Write-Host ""

Write-Host "Press Enter when ready to input Firebase config..." -ForegroundColor Yellow
Read-Host

Write-Host ""
Write-Host "Enter Firebase Configuration:" -ForegroundColor Cyan
$apiKey = Read-Host "API Key (AIza...)"
$authDomain = Read-Host "Auth Domain (...firebaseapp.com)"
$projectId = Read-Host "Project ID"
$storageBucket = Read-Host "Storage Bucket (...appspot.com)"
$messagingSenderId = Read-Host "Messaging Sender ID"
$appId = Read-Host "App ID (1:...)"

# Create frontend .env.local
$frontendEnv = @"
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=$apiKey
VITE_FIREBASE_AUTH_DOMAIN=$authDomain
VITE_FIREBASE_PROJECT_ID=$projectId
VITE_FIREBASE_STORAGE_BUCKET=$storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=$messagingSenderId
VITE_FIREBASE_APP_ID=$appId
"@

Set-Content ".env.local" -Value $frontendEnv
Write-Host "✅ Created .env.local with Firebase config" -ForegroundColor Green

Write-Host ""
Write-Host "D. Get Service Account (for backend):" -ForegroundColor Cyan
Write-Host "   1. Go to Project Settings → Service Accounts" -ForegroundColor White
Write-Host "   2. Click 'Generate new private key'" -ForegroundColor White
Write-Host "   3. Save the JSON file to backend\ folder" -ForegroundColor White
Write-Host "   4. Rename it to: firebase-service-account.json" -ForegroundColor White
Write-Host ""

Write-Host "Press Enter after saving the service account file..." -ForegroundColor Yellow
Read-Host

# Update backend .env with service account path
$envContent = Get-Content "backend\.env" -Raw
if ($envContent -notmatch "GOOGLE_APPLICATION_CREDENTIALS") {
    $envContent += "`nGOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json"
    Set-Content "backend\.env" -Value $envContent
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Install dependencies:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Gray
Write-Host "   cd backend && npm install && cd .." -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the servers:" -ForegroundColor White
Write-Host "   Terminal 1: cd backend && npm run dev" -ForegroundColor Gray
Write-Host "   Terminal 2: npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Visit: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your StratAI platform is ready!" -ForegroundColor Green
