---
title: "Calculadora de Elecciones"
description: "Comparador visual de resultados electorales en Chile."
tags: ["Programación", "Pública"]
projectTag: "Calculadora de Elecciones"
role: "Proyecto Individual"
status: "Terminado"
dimension: "Pequeña"
---

Este proyecto nace de una fijación personal con el apartado técnico de la página de resultados electorales del Servel. Desde que me percaté de que esta hecha de forma horrible, he coqueteado con la idea desarrollar herramientas que permitan mejorar la experiencia del análisis de resultados electorales.

## La Visualización

El núcleo del proyecto es el mapa de Chile en SVG, donde cada región se colorea según la tendencia de votación. Esto permite identificar rápidamente bastiones políticos y zonas de competencia estrecha entre candidatos u opciones que se pueden elegir con completa libertad. Por ejemplo, es posible comparar el rendimiento región por región de opciones con desempeño similar, como MEO y Parisi el 2013.

## Datos

Los datos fueron extraidos de los archivos Excel que publica el Servel en su página web para el archivo histórico de resultados electorales, por el momento solo se tienen resultados de elecciones desde el 2012 en adelante, y por motivos tecnicos como archivos zip corruptos publicados por el Servel, no se tienen resultados de algunas elecciones.