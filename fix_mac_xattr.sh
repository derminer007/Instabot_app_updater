# Aktueller Pfad des Skripts
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DESTINATION_FOLDER="$SCRIPT_DIR/soft-ui-dashboard-pro-react.app"

sudo xattr -c -r "$DESTINATION_FOLDER"