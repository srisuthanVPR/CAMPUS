@echo off
echo Starting Campus Sustainability Dashboard with MongoDB...
echo.

echo Starting MongoDB...
start "MongoDB" mongod --dbpath ./data --port 27017
timeout /t 3 /nobreak > nul

echo Starting Node.js Server...
start "Node.js Server" node server.js
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" python -m http.server 8000

echo.
echo ========================================
echo Campus Sustainability Dashboard Started!
echo ========================================
echo.
echo MongoDB: http://localhost:27017
echo Backend API: http://localhost:3000
echo Frontend: http://localhost:8000
echo.
echo Login Credentials:
echo Student: student / student123
echo Admin: admin / admin123
echo.
echo Press any key to exit...
pause > nul
