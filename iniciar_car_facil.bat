@echo off
title Iniciar CAR Facil
echo ===================================================
echo Iniciando o CAR Facil...
echo ===================================================
echo.
echo Verificando dependencias...
call npm install

echo.
echo Iniciando o servidor web e abrindo o navegador...
call npm run dev -- --open

pause
