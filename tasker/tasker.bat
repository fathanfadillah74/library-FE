@echo off
REM Tasker script for copying the config folder and its contents

echo Copying config folder and its contents...

xcopy config %~dp0\config /E /I /Y

echo Copy complete.
pause
