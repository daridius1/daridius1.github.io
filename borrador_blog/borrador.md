---
title: "Sin comentarios"
description: "¡Hasta ahora!"
pubDate: "2026-07-21"
tags: ["Proyectos", "Blog"]
---

Muchas veces me lo sugirieron, pero nunca mientras tenia mi homeserver corriendo! y luego de que un gran amigo me lo recomendara, me anime a agregar la seccion de comentarios a este sucio blog.

## Cusdis

Aunque fue el homserver lo que me animo, igual que paja andar hosteando weas, ademas de que la flaca tiene solo 2 gb de ram y pararse de la silla probablemente ya la deja al borde del infarto, por lo que probe un servicio que segun el clanker me ofrecia todo lo que yo queria: cusdis.

¡sucio clanker! me mintio, y dentro de todas las limitaciones que tenia este cochino servicio, la que lo liquido para mi fue que los comentarios los tendria que aprobar a mano. plop! que sentido tiene esa wea. que pase la modelo numero 2!

## Artalk

Ya cache que si queria tener algo a la altura de un blog tan pulento como el mio tendria que hostearlo yo mismo. y eso hice. el clanker me recomendo esa wea y no andaba de animos para pensar, asi que como buen conductor cuando esta borracho (de flojera en este caso), le pase las llaves del auto a gemini. justo antes de quedarme dormido me di cuenta que pa esta wea queria usar docker... docker! para una wea que va a tener que soportar un trafico de 2 comentarios al mes y que probablemente le termine dando una ernia a la flaca! ni de broma, total, si se cae la seccion de comentarios del blog, a nadie le va a importar.

Asi que levante esta shiet a fierro pelao. y cuando vi la caja de comentarios, cambiarla fue obviamente lo primero que se me ocurrio. era horrible y por alguna razon te pedia correo y pagina web? xD? bueno. habia que cambiar el diseño, asi que me servi un juguito y...

## Gemini resuelve todos mis problemas!

Strike 1... strike 2... strike 3, estas fuera! si tres prompt no pueden arreglar un problema tan simple de diseño no es problema de la ia, es problema del programa. pense que como era selfhosteable seria facil de personalizar pero pareque nada mas alejado de la realidad.

## el martillo de oro

luego de 2 intentos fallidos, me dispuse a sacar de mi caja de herramientas mi querido *martillo de oro* (https://es.wikipedia.org/wiki/Martillo_de_oro). le dije todo lo que queria a antigravity y echandole un ojo a la flaca dijo: oye waton, tenis corriendo pocketbase, pq no hacemos la maldad de meter los comentarios ahi yera? a pocketbase lo tengo corriendo mi nuevo superproyecto para cambiar el mundo... entonces no estaba seguro. pero donde caben uno caben dos nos dijo isaac newton cuando lo dejaron abajo del uber, asi que le meti carepalo una tabla culia extra a la db y le dije a anigravity "programa todo esto" y pum, santo remedio.

Habra quedado en 3 el contador total de prompst? 2 mas para corregir detalles pero cifra record de todos modos.

## testeo

en produccion, a capela como dicen los lolos. si lees esto y no funcionan los comentarios hazmelo saber. ai slop has no limits.