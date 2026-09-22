# Blog personal

## Preparación local

El proyecto requiere Node.js 22.12 o superior. Si usas `nvm`:

```sh
nvm use
npm install
npm run dev
```

`astro: not found` significa que todavía falta ejecutar `npm install` en este directorio.

## Publicación

Usa siempre el script completo:

```sh
./deploy.sh
```

El script guarda los archivos fuente en la rama principal, los sube y solo entonces publica el sitio generado en `gh-pages`. El comando `npm run deploy` rechaza una publicación si existen cambios sin guardar o si la rama fuente no está sincronizada con su rama remota.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run check`           | Revisa tipos y contenido                         |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run verify`          | Ejecuta revisión y build                         |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
