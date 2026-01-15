# Instrucciones de Redacción y Estructura del Blog

Este documento define el flujo de trabajo para procesar borradores y la estructura técnica del blog. **Cualquier IA trabajando en este repositorio debe seguir estas reglas estrictamente.**

## 🎯 Objetivo del Procesamiento de Borradores
El objetivo es transformar el contenido de `borrador.md` en un post final dentro de la colección de Astro, mejorando la calidad del texto sin alterar el fondo.

### Reglas de Oro para la IA:
1. **Corregir Forma, no Fondo:** Se deben corregir errores ortográficos, mala puntuación y problemas de redacción (frases difíciles de entender).
2. **Preservar el Mensaje:** No omitas información ni agregues ideas que no estén en el borrador. La "voz" y las ideas deben ser las del usuario.
3. **Optimización de Redacción:** Puedes reescribir una idea para que fluya mejor, pero nunca cambies el significado original.
4. **Validación de Fecha:** Antes de crear el archivo, **debes preguntar siempre qué fecha (`pubDate`) asignar al blog**, a menos que el usuario ya la haya especificado explícitamente. Esto es crucial por la posibilidad de publicaciones retroactivas.
5. **Inferencia de Título y Descripción:** Generalmente la primera línea del borrador es el título. Si en el borrador se incluye explícitamente una línea que empiece por `descripcion:`, **debes usar ese texto exactamente** como la `description` en el frontmatter. Si no existe, infiere una breve basada en el contenido.

---

## 📁 Estructura Técnica

### Ubicación de los Archivos
Los posts terminados deben guardarse en:
`src/content/blog/[año]/[mes]/[día]/[slug]/index.md`

### Formato del Frontmatter (YAML)
Todo post debe incluir estos encabezados:
```yaml
---
title: "Título optimizado"
description: "Breve resumen basado en el borrador"
pubDate: "YYYY-MM-DD" # Preguntar siempre si no está claro
tags: [] # Dejar siempre vacío por ahora
---
```

---

## 🛠️ Flujo de Trabajo (Paso a Paso)

Cuando el usuario diga **"sigue los pasos de blog instructions"** o pida procesar el borrador:

1. **Lectura:** Leer el archivo `borrador.md`.
2. **Fecha:** Preguntar al usuario por la fecha de publicación (`pubDate`) si no ha sido especificada.
3. **Ejecución Directa:** Una vez que se tenga la fecha, la IA debe generar la versión corregida y **crear el archivo inmediatamente** en la ruta correspondiente. **No se requiere una confirmación final del texto** ("si no le gusta, el usuario lo borrará").
4. **No Limpiar:** **NO borrar ni modificar** el contenido de `borrador.md`. El usuario se encarga de eso manualmente.

---

## 🔗 Referencia de Enrutamiento
Las rutas se generan dinámicamente: `blog/2026/01/01/mi-post`.
Asegúrate de que el `slug` sea amigable (minúsculas y guiones).
