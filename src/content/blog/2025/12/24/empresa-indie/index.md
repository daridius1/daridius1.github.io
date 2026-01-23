---
title: 'Empresa indie'
description: 'Dos días luchando con la vil mierda de WhatsApp'
pubDate: '2025-12-24'
tags: ["Proyectos", "WhatsApp Wrapped"]
---

Resulta que la función de exportar un chat de WhatsApp es peor de lo que esperaba. De hecho, es una vil mierda.

## El bug que lo cambió todo

Todo comenzó cuando mi prima Cata me reportó el feedback de haber probado la primera versión de la app. En resumen, hizo cualquier wea. Lo más preocupante fue que me reportó problemas de fecha... ¿de fecha? El resumen identificó que en su grupo habían hablado en abril del 2025, siendo que el grupo con el que estaba experimentando se había creado en octubre de este año. Bastante sospechoso.

## WhatsApp y su caos

Desde que vi cómo WhatsApp exporta las cosas desde mi celu supe que algo andaba mal, pero nunca imaginé que fuera tan rancio. Resulta que es todo a la chacota: en iOS hace algunas cosas y en Android otras. La forma en la que se registran mensajes especiales es sumamente chacota, como si lo hubiese hecho un practicante. Básicamente todo se lleva a texto plano con criterios de etiquetado dignos de una tarea de intro a la progra.

## La solución artesanal

Bueno, 2 días solo trabajando en el parser. Creé un chat nuevo para que tuviera todos los casos de mierda de WhatsApp (stickers, votaciones, mandar ubicación, etc.), para que mis testers me puedan mandar su archivo exportado con el formato que les haga su celu y así poder mejorar el parser, al que no le queda más opción que ser hecho a mano, caso por caso.

## No hay vuelta atrás

Qué paja, realmente. Me dieron ganas de tirar la toalla, pero ya excedí el límite de ideas que puedo abandonar por ahora, así que tocó aceptar, hacer ingeniería y resolver estos problemillas de mierda uno por uno.
