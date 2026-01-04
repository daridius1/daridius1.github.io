---
title: 'TERMINADO, GIT PUSH'
description: 'Primera versión del WhatsApp Wrapped en producción'
pubDate: '2025-12-26'
tags: ["Proyectos", "WhatsApp Wrapped"]
---

Luego de pasarlo como el pico, trabajar arduamente estos últimos días y acostarme a las 5 el día de ayer, finalmente salió la primera versión del **WhatsApp Wrapped**. Me hace muy feliz haber llegado a algo funcional y en producción, y que, aunque simple, está hecho de una forma bastante ingeniosa y toma el peso a la importancia de trabajar con datos sensibles de la gente y de desarrollar software transparente.

## ¿Quedan errores?

Varios, probablemente. Exportando el chat de uno de mis grupos de amigos apareció como el mensaje más enviado un "esperando por este mensaje" o algo por el estilo XD.

## Sobre cómo quedó al final

El flujo de la info del chat es:

### En local

1. Se sube el chat exportado
2. Se parsea
3. Se sacan las estadísticas
4. Se pide una pequeña corrección de los nombres que aparecieron en la estadística (tipo: si tienes agregado a un amigo como "Juan Médico", puedes corregirlo, ya que el export utiliza el nombre con el que lo tienes agregado)
5. Comprime el wrapped
6. Lo encripta
7. Sube el archivo encriptado a un worker KV de Cloudflare (esta es la única información que sale del cliente mientras se procesa el wrapped. Está encriptada y, además, se borra automáticamente después de 7 días, por lo que debería ser totalmente seguro. De todas formas, el cálculo total de las estadísticas tampoco es algo tan sensible, y si alguien anda compartiendo el link con esos datos, no es mucho menos privado que estar compartiendo pantallazos o chats lisa y llanamente)
8. Crea el link con las dos llaves (la del KV de Cloudflare y la de la encriptación), ambas claves necesarias para ver el wrapped, y la de encriptación solo creada en local

Y ya, para ver el wrapped, si abres el link con ambas llaves, las utiliza para traerse el wrapped, desencriptarlo y mostrar de manera bonita las estadísticas.

## Privacidad y transparencia

Como pueden ver, es 100% privado por el lado del cliente, y el código es open source y corre en una GitHub Pages, por lo que soy inocente de cualquier acusación de robo de datos o weas así. Aunque en esta sociedad yo creo que a nadie le importa.

## Lo que viene

Bueno, eso. En verdad solo me queda esperar a ver las reacciones de mis amigos y cachar si la idea prendió o no. Reportaré cómo le va a lo largo de lo que queda de año.
