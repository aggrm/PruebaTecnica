@echo off
setlocal

REM Cambia estas rutas según la instalación de MongoDB y tu proyecto Node.js
set MONGO_PATH="C:\Program Files\MongoDB\Server\7.0\bin"
set PROJECT_PATH="E:\WorkSpace\prueba_movistar"

REM Intentar iniciar el servicio MongoDB
echo Iniciando el servicio MongoDB...
net start MongoDB

REM Verificar si el servicio se inició correctamente
if %ERRORLEVEL% neq 0 (
    echo No se pudo iniciar el servicio MongoDB. Intentando iniciar mongod.exe manualmente...
    start "" %MONGO_PATH%\mongod.exe --dbpath %MONGO_PATH%\..\data\db
) else (
    echo El servicio MongoDB se inició correctamente.
)

REM Esperar unos segundos para asegurar que MongoDB está en funcionamiento
timeout /t 5

REM Cambiar al directorio del proyecto y iniciar la aplicación Node.js
echo Iniciando la aplicación Node.js...
cd /d %PROJECT_PATH%
npm start

endlocal
pause
