#!/bin/bash

# Script to rename image files with spaces/special characters
# This fixes issues with URL encoding and makes filenames web-friendly

echo "🔧 Renaming images to be web-friendly..."

# Function to rename files in a directory
rename_files() {
    local dir=$1
    local category=$2
    local count=1
    
    echo "Processing: $dir"
    
    for file in "$dir"/*; do
        if [ -f "$file" ]; then
            # Get filename and extension
            filename=$(basename "$file")
            extension="${filename##*.}"
            
            # Create new filename (category-1.jpg, category-2.jpg, etc.)
            newname="${category}-${count}.${extension}"
            newpath="$dir/$newname"
            
            # Rename if different
            if [ "$file" != "$newpath" ]; then
                mv "$file" "$newpath"
                echo "  ✓ Renamed: $filename → $newname"
            fi
            
            ((count++))
        fi
    done
}

# Navigate to assets directory
cd "$(dirname "$0")/src/assets" || exit

# Rename files in each category
rename_files "shawls" "shawl"
rename_files "pherans" "pheran"
rename_files "handbags" "handbag"
rename_files "dry-fruits" "dryfruit"
rename_files "gift-hampers" "gift"

echo "✅ Done! All images renamed to web-friendly names."

