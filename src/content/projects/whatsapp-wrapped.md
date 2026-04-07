---
title: "WhatsApp Wrapped"
description: "El Wrapped de WhatsApp"
tags: ["Programación"]
projectTag: "WhatsApp Wrapped"
role: "Proyecto Individual"
status: "Terminado"
dimension: "Pequeño"
---

En medio de la fiebre de popularidad de los "Wrapped" de Spotify, pensé en la posibilidad de hacer uno, pero con los chats de WhatsApp. La idea era ver el resumen del año de una conversación, tanto grupal como individual.

El mayor desafío fue la forma en que WhatsApp exporta las conversaciones, ya que el formato depende del sistema, y varía según factores como el sistema operativo, el formato de hora, de fecha, etc. Existe una librería de JS para parsear chats de WhatsApp, pero cubría una parte parcial de los casos, y para temas estadísticos estaba lejos de ser suficiente.

El resultado quedó bastante bueno. Al inicio el resumen quedaba en el link, pero para mantener la privacidad de los usuarios usé Cloudflare KV, donde cada resumen tenía un plazo de expiración, y los resúmenes creaban tanto la ID en Cloudflare como la llave para desencriptar el resumen, ya que al servidor llegaban los datos encriptados.

El proyecto fue un fracaso en proporción a mis expectativas, aunque igual creo que tuvo unos... ¿800 usos?, algo de ese orden. Cuando lo publiqué, hice un TikTok promocionándolo, que al menos tuvo una buena cantidad de likes, pero lo atadoso que es exportar un chat de WhatsApp, creo, fue el principal obstáculo para que se viralizara.
