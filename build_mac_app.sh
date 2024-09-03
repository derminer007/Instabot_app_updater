#!/bin/bash

# soft-ui-updater-mac.app muss im selben Ordner sein wie soft-ui-dashboard-pro-react.app

chmod +x soft-ui-updater-mac.sh
mkdir -p soft-ui-updater-mac.app
cp -f soft-ui-updater-mac.sh soft-ui-updater-mac.app/soft-ui-updater-mac

# chmod +x fix_mac_xattr.sh
# mkdir -p fix_mac_xattr.app
# cp -f fix_mac_xattr.sh fix_mac_xattr.app/fix_mac_xattr