#!/bin/bash

# Range von 1.0.2 bis 1.0.14
for i in $(seq 2 14); do
  tag="1.0.$i"
  echo "Lösche Release und Tag: $tag"

  # Release löschen (falls existiert)
  gh release delete "$tag" --yes

  # Tag im Remote löschen
  git push origin :refs/tags/"$tag"
done
