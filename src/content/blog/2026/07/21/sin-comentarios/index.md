---
title: "Sin comentarios"
description: "¡Hasta ahora!"
pubDate: "2026-07-21"
tags: ["Proyectos", "Blog"]
---

Muchas veces me lo sugirieron, ¡pero nunca mientras tenía mi homeserver corriendo! Y luego de que un gran amigo me lo recomendara, me animé a agregar la sección de comentarios a este sucio blog.

## Cusdis

Aunque fue el homeserver lo que me animó, igual qué paja andar hosteando weás, además de que la flaca tiene solo 2 GB de RAM y pararse de la silla probablemente ya la deja al borde del infarto, por lo que probé un servicio que según el clanker me ofrecía todo lo que yo quería: Cusdis.

¡Sucio clanker! Me mintió, y dentro de todas las limitaciones que tenía este cochino servicio, la que lo liquidó para mí fue que los comentarios los tendría que aprobar a mano. ¡Plop! ¿Qué sentido tiene esa weá? ¡Que pase la modelo número 2!

## Artalk

Ya caché que si quería tener algo a la altura de un blog tan pulento como el mío tendría que hostearlo yo mismo. Y eso hice. El clanker me recomendó Artalk y no andaba de ánimos para pensar, así que como buen conductor cuando está borracho (de flojera en este caso), le pasé las llaves del auto a Gemini. Justo antes de quedarme dormido me di cuenta de que para esta weá quería usar Docker... ¡Docker! ¡Para una weá que va a tener que soportar un tráfico de 2 comentarios al mes y que probablemente le termine dando un aneurisma a la flaca! Ni de broma, total, si se cae la sección de comentarios del blog, a nadie le va a importar.

Así que levanté esta shiet a fierro pelao. Y cuando vi la caja de comentarios, cambiarla fue obviamente lo primero que se me ocurrió. Era horrible, ¿y por alguna razón te pedía correo y página web? ¿xD? Bueno. Había que cambiar el diseño, así que me serví un juguito y...

## Gemini resuelve todos mis problemas!

Strike 1... strike 2... strike 3, ¡estás fuera! Si tres prompts no pueden arreglar un problema tan simple de diseño no es problema de la IA, es problema del programa. Pensé que como era self-hosteable sería fácil de personalizar, pero parece que nada más alejado de la realidad.

## El martillo de oro

Luego de 2 intentos fallidos, me dispuse a sacar de mi caja de herramientas mi querido *[martillo de oro](https://es.wikipedia.org/wiki/Martillo_de_oro)*. Le dije todo lo que quería a Antigravity y echándole un ojo a la flaca dijo: "Oye watón, tenís corriendo PocketBase, ¿por qué no hacemos la maldad de meter los comentarios ahí yera?". A PocketBase lo tengo corriendo mi nuevo superproyecto para cambiar el mundo... entonces no estaba seguro. Pero "donde caben uno caben dos" nos dijo Isaac Newton cuando lo dejaron abajo del Uber, así que le metí carepalo una tabla culiá extra a la DB y le dije a Antigravity "programa todo esto" y pum, santo remedio.

¿Habrá quedado en 3 el contador total de prompts? 2 más para corregir detalles, pero cifra récord de todos modos.

## Testeo

En producción, a capela como dicen los lolos. Si lees esto y no funcionan los comentarios házmelo saber. AI slop has no limits.
