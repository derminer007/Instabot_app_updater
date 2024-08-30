#!/bin/bash
# Bash Skript für macOS

# Aktueller Pfad des Skripts
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Repository und Branch definieren
REPO_URL="https://github.com/derminer007/Instabot_app_updater"
BRANCH="main"
ZIP_URL="$REPO_URL/archive/refs/heads/$BRANCH.zip"
OUTPUT_FILE="$SCRIPT_DIR/repository.zip"
OUTPUT_FOLDER="$SCRIPT_DIR/repository"
SOURCE_FOLDER="$OUTPUT_FOLDER/Instabot_app_updater-$BRANCH"  # Der entpackte Ordner
DESTINATION_FOLDER="$SCRIPT_DIR/../soft-ui-dashboard-pro-react.app/Contents/Resources/app/build"  # Zielordner, wo die Dateien kopiert werden sollen

# Herunterladen der ZIP-Datei
curl -L $ZIP_URL -o $OUTPUT_FILE

# Entpacken der ZIP-Datei
unzip -o $OUTPUT_FILE -d $OUTPUT_FOLDER

# Dateien kopieren und vorhandene Dateien ersetzen
cp -f "$SOURCE_FOLDER/main.js" "$DESTINATION_FOLDER"
cp -f "$SOURCE_FOLDER/preload.js" "$DESTINATION_FOLDER"
cp -rf "$SOURCE_FOLDER/static" "$DESTINATION_FOLDER"

# Entfernen der ZIP-Datei und des entpackten Ordners
rm $OUTPUT_FILE
rm -rf $OUTPUT_FOLDER
#echo $DESTINATION_FOLDER > "$SCRIPT_DIR/t.txt"
#echo "Test" > "$DESTINATION_FOLDER/t.txt"
