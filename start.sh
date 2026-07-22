#!/usr/bin/env sh
set -eu

if [ ! -f "server.py" ]; then
  echo "No encuentro server.py en esta carpeta."
  echo "Entra primero a la carpeta de la app, por ejemplo:"
  echo "  cd ~/storage/shared/Oca111"
  echo "Esa carpeta debe contener index.html, package.json, server.py y src/."
  exit 1
fi

python3 server.py
