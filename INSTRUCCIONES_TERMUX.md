# Cómo abrir Oca 111 en Termux / Android

El error `ENOENT` aparece cuando ejecutas `npm start` en una carpeta que no contiene los archivos de la app. En tu caso estabas en:

```text
/storage/emulated/0
```

pero ahí no estaban `package.json` ni `server.py`.

## Estructura correcta

Crea una carpeta para el juego, por ejemplo:

```text
/storage/emulated/0/Oca111
```

Dentro deben estar estos archivos y carpetas:

```text
Oca111/
├── index.html
├── package.json
├── package-lock.json
├── server.py
└── src/
    ├── main.js
    └── styles.css
```

## Arrancar el servidor

En Termux entra primero a la carpeta donde copiaste la app:

```bash
cd ~/storage/shared/Oca111
```

Luego arranca el servidor con una de estas opciones:

```bash
npm start
```

O directamente:

```bash
python3 server.py
```

Después abre el navegador en:

```text
http://127.0.0.1:4173
```

## Si no existe la carpeta Oca111

Créala y copia ahí todos los archivos:

```bash
mkdir -p ~/storage/shared/Oca111
```

Después mueve o copia dentro de esa carpeta `index.html`, `package.json`, `package-lock.json`, `server.py` y la carpeta `src` completa.

## Comprobar que estás en la carpeta correcta

Antes de arrancar, ejecuta:

```bash
pwd
```

Debería mostrar algo parecido a:

```text
/storage/emulated/0/Oca111
```

Y luego ejecuta:

```bash
find . -maxdepth 2 -type f
```

Deberías ver como mínimo:

```text
./index.html
./package.json
./server.py
./src/main.js
./src/styles.css
```
