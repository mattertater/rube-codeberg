@ECHO OFF
set c=0
for /f "tokens=*" %%a in ("piet\url.txt") do (
  if !c! equ 2 (start "" %a)
  set /a c+=1 
)
pause