#!/bin/bash
# Bash Skript für macOS

# Aktueller Pfad des Skripts
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Repository und Branch definieren
REPO_URL="https://github.com/derminer007/Instabot_app_updater"
BRANCH="staging"
ZIP_URL="$REPO_URL/archive/refs/heads/$BRANCH.zip"
OUTPUT_FILE="$SCRIPT_DIR/repository.zip"
OUTPUT_FOLDER="$SCRIPT_DIR/repository"
SOURCE_FOLDER="$OUTPUT_FOLDER/Instabot_app_updater-$BRANCH"  # Der entpackte Ordner
DESTINATION_FOLDER="$SCRIPT_DIR"  # Zielordner, wo die Dateien kopiert werden sollen

# Programm aufräumen
CLEAN_APP_FOLDER="$SCRIPT_DIR/../"
rm -rf "$CLEAN_APP_FOLDER/src"
rm -rf "$CLEAN_APP_FOLDER/public"
rm -f "$CLEAN_APP_FOLDER/CHANGELOG.md"
rm -f "$CLEAN_APP_FOLDER/jsconfig.json"

rm -f "$CLEAN_APP_FOLDER/.env"
rm -f "$CLEAN_APP_FOLDER/.eslintrc.json"
rm -f "$CLEAN_APP_FOLDER/.npmrc"
rm -f "$CLEAN_APP_FOLDER/.prettierrc.json"

# Herunterladen der ZIP-Datei
curl -L $ZIP_URL -o $OUTPUT_FILE

# Entpacken der ZIP-Datei
unzip -o $OUTPUT_FILE -d $OUTPUT_FOLDER

# Dateien kopieren und vorhandene Dateien ersetzen
cp -f "$SOURCE_FOLDER/main.js" "$DESTINATION_FOLDER"
cp -f "$SOURCE_FOLDER/preload.js" "$DESTINATION_FOLDER"
rm -rf "$DESTINATION_FOLDER/static"
cp -rf "$SOURCE_FOLDER/static" "$DESTINATION_FOLDER"
cp -f "$SOURCE_FOLDER/index.html" "$DESTINATION_FOLDER"
cp -f "$SOURCE_FOLDER/asset-manifest.json" "$DESTINATION_FOLDER"

# Neu: i18n.js (Backend-Übersetzungen) aktualisieren
if [ -f "$SOURCE_FOLDER/i18n.js" ]; then
	cp -f "$SOURCE_FOLDER/i18n.js" "$DESTINATION_FOLDER"
else
	echo "i18n.js nicht im ZIP gefunden, lade per curl nach..."
	# Primärer Fallback: aus dem Updater-Repository
	curl -fsSL "https://raw.githubusercontent.com/derminer007/Instabot_app_updater/$BRANCH/i18n.js" -o "$DESTINATION_FOLDER/i18n.js" || \
	# Sekundärer Fallback: (optional) aus dem Haupt-Repo, falls Branch/Struktur abweicht
	curl -fsSL "https://raw.githubusercontent.com/BerkoKong/Instabot_app/production_testgruppe_englisch/build/i18n.js" -o "$DESTINATION_FOLDER/i18n.js" || true
fi

if [ ! -f "$DESTINATION_FOLDER/i18n.js" ]; then
	echo "WARNUNG: i18n.js konnte nicht aktualisiert werden. Übersetzungen könnten fehlen."
fi

# Entfernen der ZIP-Datei und des entpackten Ordners
rm $OUTPUT_FILE
rm -rf $OUTPUT_FOLDER