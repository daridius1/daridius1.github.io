---
title: "Elecciones problemáticas del Servel"
description: "El sysadmin del Servel debe ser un comercial"
pubDate: "2026-01-13"
tags: ["Proyectos", "Calculadora de Elecciones"]
---

Por razones que explicaré en otro momento, mi imagen del encargado de sistemas del Servel es bastante mala, y aunque en este caso el error no es de plataforma, le voy a echar la culpa igual.

En el registro histórico de elecciones del Servel, desde el 2012 en adelante, el resumen público de cada elección está hecho con un PowerBI. Debo admitir que se ven bastante chulas algunas estadísticas, pero a mí eso no me sirve. La plataforma se estaba nutriendo del Excel adjunto que viene con cada votación, en el que hay un resumen de los votos por comuna, de donde pude extraer la votación de cada región.

## El problema

Varios de estos Excels están corruptos XD. Lo que me da pena es que se supone que hay gente a la que le pagan por estas cosas. Yo me pregunto: ¿cada cuánto hay una elección? ¿Hay alguna excusa para que este tipo de errores sucedan? Puede ser que sí; en verdad este tipo de trabajos desde fuera uno los mira a huevo, pero objetivamente, son solo archivos subidos a AWS. ¿Cómo no se pudo comprobar que el archivo venía corrupto?

## La solución

La solución es bastante simple: ignorar esas elecciones porque, total, a quién le importa la elección de consejeros regionales 2021.

## ¿La solución?

Si me sigue motivando este proyecto, puede que encuentre los resultados de estas elecciones en otra parte (porque esos datos existen en algún lugar si o si). También podría agregar las elecciones anteriores al 2012, que no están en este formato para el que ya tengo una estrategia de extracción de datos.

## Resultado parcial

Me gustó cómo quedó la página; está bonita y es decentemente responsiva, así que *fuck it*, voy a anotarlo como un nuevo triunfo para Daridius. Por cierto, creo que uno de estos días volveré a comprar daridius.cl.
