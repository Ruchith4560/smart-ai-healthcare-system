@echo off
REM Build script for Smart AI Healthcare Application on Windows

echo Building Smart AI Healthcare Application...

REM Build frontend
echo Building frontend...
cd frontend
call npm install
call npm run build
cd ..

if errorlevel 1 (
    echo Frontend build failed!
    exit /b 1
)

REM Install Python dependencies
echo Installing Python dependencies...
cd app
pip install -r requirements.txt
cd ..

if errorlevel 1 (
    echo Python dependencies installation failed!
    exit /b 1
)

echo.
echo Build completed successfully!
echo Frontend built to: frontend\dist
echo.
echo To start the application:
echo   cd app ^&^& uvicorn main:app --reload
pause
