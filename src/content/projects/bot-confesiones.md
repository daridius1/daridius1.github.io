---
title: "Beauchef Confesiones Bot"
description: "Bot automatizado de confesiones de Beauchef"
tags: ["Programación", "IA"]
projectTag: "Bot Confesiones"
role: "Proyecto Individual"
status: "Terminado"
dimension: "Mediano"
---

El **Beauchef Confesiones Bot** (@beauchefconfesionesbot en instagram) fue un proyecto creado con el fin de reemplazar y automatizar por completo la labor manual de administrar una página de confesiones.

La motivación principal provino de la convicción de que las tareas repetitivas y monótonas deben realizarlas las máquinas. Tras un intento previo frustrado a inicios de 2024 por las restricciones de la API de Meta, el proyecto se concretó a finales de 2025 integrando modelos de lenguaje para la moderación automática.

## ¿Cómo funcionaba?

El bot operaba con un pipeline de automatización de extremo a extremo:

1. **Recepción**: Un formulario anónimo de Google Forms conectado a Google Sheets.
2. **Lectura**: API de Google Drive / Sheets para extraer las respuestas enviadas.
3. **Censura y moderación**: Uso de LLMs (inicialmente Gemini y posteriormente DeepSeek Flash v4) para evaluar el contenido y filtrar confesiones inadecuadas.
4. **Generación visual**: Creación dinámica de la imagen de la confesión mediante Pillow (PIL) en Python.
5. **Alojamiento**: Subida a la API de imgbb para contar con una URL pública requerida por la API de Instagram.
6. **Publicación**: Publicación automática mediante la API de Instagram.
7. **Hosting**: Desplegado y corriendo 24/7 en una Raspberry Pi.

## Alcance e impacto

Durante sus más de 6 meses de funcionamiento continuo (de diciembre de 2025 a julio de 2026), el bot logró un impacto masivo dentro de la facultad:

- **+1.000 seguidores** en la cuenta de Instagram.
- **+4 millones de visualizaciones** acumuladas en sus publicaciones.
- **3.390 confesiones recibidas**, de las cuales **2.860 fueron publicadas** y el resto censurado por el filtro de moderación.
- Picos de actividad de casi **1.800 confesiones mensuales** entre mayo y junio de 2026.

## Cierre

En julio de 2026, tras el término del semestre, el bot fue dormido por el bien de la humanidad. El cierre se dio tras una reflexión sobre la responsabilidad y los límites éticos de la moderación automática en temas personales y políticos de la facultad, sumado al cambio en la plataforma de Meta for Developers que deprecó las API keys utilizadas e introdujo bloqueo regional en Chile.
