@echo off
echo ========================================================
echo PREPARANDO A VERSAO FINAL DO CAR FACIL PARA COMPARTILHAR
echo ========================================================
echo.
echo Compilando o projeto... aguarde um momento.
call npm run build
echo.
echo ========================================================
echo PRONTO! O projeto foi compilado.
echo ========================================================
echo A pasta "dist" contem a versao final do site.
echo.
pause
explorer dist
