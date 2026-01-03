---
title: 'Bot de confesiones'
description: 'Automatizar las confesiones de Instagram'
pubDate: '2025-12-28'
tags: ["proyectos", "beauchef", "meta-api"]
---

Luego de ser etiquetado en el chat de las páginas de memes de Beauchef, en el que a modo de broma se planteaba la posibilidad de hacer un bot de confesiones, pensé... **¿y si lo hago?**

Una vez terminado el **Wrapsapp**, todavía me quedan ganas de programar y, la verdad, es que con el no tanto éxito que tuvo, preferí seguir con otra cosa.

## El antecedente
Hace un tiempo (a inicios del 2024), intenté hacer una página de confesiones, pero la forma en que Meta te dejaba usar su API para hacer cosas como subir publicaciones era demasiado webiada (para hacer un simple puto post te pedían verificarte como empresa XD). Terminé tirando la toalla, pero después de mucho tiempo, ya que veía mucho potencial en la automatización de publicaciones en IG.

## El regreso del plan
Y bueno, como dije al inicio, luego de que se me mencionara la idea he decidido hacerla. Le eché un pequeño vistazo a qué onda con la API de Meta y parece que ya no es un "parto" usarla; o al menos se puede usar con tranquilidad en una cuenta propia y con límites de uso razonables que en ningún contexto deberían ser excedidos por un bot de confesiones, al menos.

## El flujo

No sé, pero el flujo se hace hasta un poco obvio:
1.  **Forms en el IG**: Un formulario simple para recolectar todo.
2.  **Hoja de cálculo**: Asociada directamente al forms para organizar los datos.
3.  **API de Google**: Para leer las respuestas de ese forms.
4.  **Censura con LLM**: Usar la API de alguna LLM (probablemente DeepSeek, para aprovechar la plata que le metí) para censurar lo que sea necesario.
5.  **Generación de imagen**: Usar PIL o cualquier otra herramienta de Python para crear la imagen con la confesión.
6.  **Publicación**: Usar la API de IG para subirlo todo automáticamente.
7.  **Hosting**: Que todo esto corra en la Raspberry del Blaz o en el homeserver del Seba.

Veamos que sucede realmente.
