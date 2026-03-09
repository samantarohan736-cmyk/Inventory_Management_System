Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\frontline\inventory4\inventory4; .\mvnw spring-boot:run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\frontline\inventory4\inventory4\frontend; npm run dev"
Write-Host "Started Spring Boot Backend and Vite React Frontend in new windows!" -ForegroundColor Green
