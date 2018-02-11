Param(
  [string] $color
)

"Color detected..."
Start-Sleep 2

"Starting processing..."
cd "processing"
.\pbe.exe
Start-Sleep 7

cd ".."
cd "piet"
"Running piet script..."
.\piet.cmd > "url.txt"

Start-Sleep 4

$text = Get-Content -Path url.txt
$url = $text[2]

IF ($color -eq 'R') { $url = $url + '?color=red'}
ELSEIF ($color -eq 'G') { $url = $url + '?color=green'}
ELSEIF ($color -eq 'B') { $url = $url + '?color=blue'}
"Opening $url ..."
Start-Sleep 3
start microsoft-edge:$url
