@echo off
setlocal

set source_folder=%~dp0
set zip_file=%~dp0chaosBP.mcpack

if exist %zip_file% del %zip_file%

7z a %zip_file% %source_folder%\* -xr!.git* -xr!node_modules -xr!make*

endlocal