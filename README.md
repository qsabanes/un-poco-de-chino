# Un poco de chino

Una web para repasar chino al ritmo de la clase, en PC y móvil.

**[Abrir la aplicación](https://qsabanes.github.io/un-poco-de-chino/)**

## Para practicar

- Sesiones 1–3: sonidos, presentaciones, países y preguntas.
- Reconocimiento de caracteres desde pinyin y construcción de frases sin teclado chino.
- Tarjetas con repetición espaciada, vocabulario de clase y mazos opcionales HSK 1–3 de 2026.
- Tabla de 403 sílabas y 1.612 audios, comparación de tonos y ejercicios de escucha.
- Trabalenguas con elección de tono por sílaba, corrección y audio completo en mandarín (voz sintetizada, normal y lento).
- Contrastes de pronunciación b/p, d/t, g/k, j/q/x, s/sh y otros, manteniendo el mismo tono.
- Compositor de pinyin a caracteres e importación personal de audios del libro.

El progreso y las grabaciones se guardan en el navegador. Puedes exportar el
progreso desde la aplicación para trasladarlo entre dispositivos. No hay
cuentas ni sincronización automática. La web funciona sin conexión después
de la primera visita; los audios de pronunciación se guardan al escucharlos.

## Ejecutar en local

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Abre http://127.0.0.1:8765. Para preparar los archivos de publicación:

```sh
node prepare-dist.mjs
```

GitHub Actions prepara `dist/` y lo publica en Pages al actualizar `main`.

## Materiales y permisos

Los ejercicios son adaptaciones de estudio, no correcciones oficiales.
Los PDF, los mensajes completos de clase y los audios del libro no se publican.

- Listas HSK y glosas: [fuentes y licencias](hsk-sources.txt).
- Grabaciones de Yoyo Chinese reutilizadas con autorización expresa:
  [procedencia y permisos](pronunciation-sources.txt).

La publicación del repositorio no concede una licencia general para reutilizar
las grabaciones. Consulta los permisos de cada recurso.
