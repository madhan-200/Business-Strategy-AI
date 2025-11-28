# Move Firebase Service Account to Backend
# Run this AFTER clicking "Generate key" in Firebase Console

Write-Host "🔍 Looking for downloaded Firebase service account file..." -ForegroundColor Cyan

# Wait a moment for download to complete
Start-Sleep -Seconds 2

# Find the most recent stratai JSON file in Downloads
$downloadsPath = "$env:USERPROFILE\Downloads"
$serviceAccountFile = Get-ChildItem "$downloadsPath\stratai-*.json" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($serviceAccountFile) {
    Write-Host "✅ Found: $($serviceAccountFile.Name)" -ForegroundColor Green
    
    $destination = "c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\firebase-service-account.json"
    
    # Check if destination already exists
    if (Test-Path $destination) {
        Write-Host "⚠️  Removing old service account file..." -ForegroundColor Yellow
        Remove-Item $destination -Force
    }
    
    # Move and rename
    Move-Item $serviceAccountFile.FullName $destination -Force
    
    Write-Host "✅ Service account saved to: backend\firebase-service-account.json" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Firebase setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Install dependencies: npm install" -ForegroundColor White
    Write-Host "2. Install backend deps: cd backend && npm install && cd .." -ForegroundColor White
    Write-Host "3. Start backend: cd backend && npm run dev" -ForegroundColor White
    Write-Host "4. Start frontend (new terminal): npm run dev" -ForegroundColor White
    
}
else {
    Write-Host "❌ No Firebase service account file found in Downloads" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Click 'Generate key' button in Firebase Console" -ForegroundColor White
    Write-Host "2. Wait for download to complete" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
}
