# PowerShell Skript für Windows

# Repository und Branch definieren
$repoUrl = "https://github.com/derminer007/Instabot_app_updater"
$branch = "main"
$zipUrl = "$repoUrl/archive/refs/heads/$branch.zip"
$outputFile = "repository.zip"
$outputFolder = "repository"
$sourceFolder = "$outputFolder\Instabot_app_updater-$branch"  # Der entpackte Ordner
$destinationFolder = "resources\app\build"  # Zielordner, wo die Dateien kopiert werden sollen

# Programm aufräumen
$clean_app_folder = "resources\app"
Remove-Item -Path "$clean_app_folder\src" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$clean_app_folder\CHANGELOG.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$clean_app_folder\jsconfig.json" -Force -ErrorAction SilentlyContinue

Remove-Item -Path "$clean_app_folder\.env" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$clean_app_folder\.eslintrc.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$clean_app_folder\.npmrc" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$clean_app_folder\.prettierrc.json" -Force -ErrorAction SilentlyContinue

# Herunterladen der ZIP-Datei
Invoke-WebRequest -Uri $zipUrl -OutFile $outputFile

# Entpacken der ZIP-Datei
Expand-Archive -Path $outputFile -DestinationPath $outputFolder -Force

# Dateien kopieren und vorhandene Dateien ersetzen
Copy-Item -Path "$sourceFolder\main.js" -Destination $destinationFolder -Force
Copy-Item -Path "$sourceFolder\preload.js" -Destination $destinationFolder -Force
Remove-Item -Path "$destinationFolder\static" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Recurse -Path "$sourceFolder\static" -Destination $destinationFolder -Force
Copy-Item -Path "$sourceFolder\index.html" -Destination $destinationFolder -Force
Copy-Item -Path "$sourceFolder\asset-manifest.json" -Destination $destinationFolder -Force

# Entfernen der ZIP-Datei und des entpackten Ordners
Remove-Item $outputFile
Remove-Item $outputFolder -Recurse -Force
