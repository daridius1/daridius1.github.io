---
title: "Beauchapp"
description: "La red social de Beauchef"
pubDate: "2026-08-03"
tags: ["Proyectos", "Beauchapp"]
---

Llevo mucho tiempo de trabajo muy intenso en la Beauchapp, lo que no me permitió escribir en el blog. Acabo de terminar de redactar el post que voy a publicar en U-Cursos en el que voy a hacer pública la Beauchapp. Me pregunto cómo le irá a ir. Le dediqué caleta de tiempo. Mucho, mucho. Días enteros metido en la weá. Soy muy resiliente a la frustración. Y si le va muy mal, voy a estar bien. Pero sin duda que cuando uno de mis proyectos fracasa... algo muere dentro de mí. Qué lata. Qué lata soñar y soñar, y tener siempre expectativas imposibles de lograr.

Como ya me di la media lata de redactar la weá, voy a reciclar el anuncio de U-Cursos, para que ustedes, queridos lectores de mi blog, puedan leer también el anuncio acá.

Hace mucho tiempo se me ocurrió la idea de que una aplicación como U-Cursos, pero gestionada por estudiantes, podría ser una buena idea. En la que, de forma bien integrada, aspectos de la vida universitaria se puedan potenciar con una aplicación en la que estudiantes pudieran compartir con el resto de la comunidad de forma personalizada y ajustada a la cultura de la facultad, a nuestros intereses y a nuestra realidad. Cuando me puse a pensar en las muchas cosas que se podrían lograr con la app, de a poco me fui convenciendo de que era en verdad una buena idea.

Un par de meses atrás me animé a intentar llevar esta idea a la realidad. Anoté las funcionalidades que pensé podrían ser de mayor aporte y me lancé. La idea es que sea un espacio similar a U-Cursos, donde el no anonimato nos facilite mantener el respeto y la sana convivencia. La cuenta solo se puede crear con el correo del CEC, el @ing.uchile.cl (no el @ug.uchile.cl), solo se puede crear una cuenta por correo, y el prefijo del correo con el que se crea la cuenta es, al mismo tiempo, tu username en la plataforma.

Si quieren entrar a revisar, el link de la página es [beauchapp.daridius.cl](https://beauchapp.daridius.cl). Un detalle bacán es que funciona como una PWA (Progressive Web App). Esto significa que no tienen que descargarla de ninguna tienda de aplicaciones. Si entran desde Safari o Chrome en su celu, pueden darle a la opción de "Agregar a la pantalla de inicio" y les quedará instalada en su teléfono funcionando igual que una aplicación nativa más.

Por ahora, la aplicación tiene 4 funcionalidades principales:

1. Nube de pautas:
Siendo el pauteo de vital importancia para sacar la carrera, espacios como la Nube Mechona no son los mejores para buscar pautas. El formato de "drive de PDFs" no permite una búsqueda adecuada de problemas que se ajusten, por ejemplo, a la necesidad de lo que uno tenga que reforzar, o el no conocimiento sobre la dificultad de un problema puede causar que se esté practicando con ejercicios no ajustados a la etapa del aprendizaje en la que se está. Además de que los PDFs no son responsivos, por lo que, en celulares, a veces es difícil e incómodo leer y explorar los problemas. La Beauchapp trae un espacio donde se pueden subir tanto enunciados como sus respectivas pautas. Y gracias a que tiene integrado Markdown + KaTeX + imágenes, la experiencia de leerlos desde el celu es mucho más agradable. Además, por medio de un sistema de puntuación, la comunidad podrá dar feedback de la dificultad o la calidad de cada problema, lo que ayudará a futuros pauteros a tener una mejor experiencia resolviendo los ejercicios. A cada problema se le pueden agregar tags que permitan filtrar según aquello que se quiere reforzar, además de tener una sección de comentarios donde tanto dudas de enunciado como de solución pueden ser resueltas por la misma comunidad.

2. Ladders:
Si te gusta jugar tenis de mesa, taca taca, ajedrez u otros dentro de la facultad, y en algún momento has imaginado una página donde puedas "rankear" con tus amigos de la u y darle un poco más de sabor a los encuentros, esta funcionalidad de ladders permite, para cada deporte, poder registrar partidas (con aprobación de todos los jugadores involucrados) con otros usuarios y así mantener un historial, un Elo y un ranking para cada juego.

3. Marketplace:
En este momento, el foro de U-Cursos cumple la funcionalidad de marketplace, pero la verdad no es un espacio hecho para esto. Entre que los que ofrecen el producto/servicio tienen que estar escribiendo "up" para volver a la superficie del foro, que buscar algo ahí es casi imposible, que no se pueden subir imágenes y un montón de cosas más, una plataforma con herramientas que faciliten la experiencia de compra y venta en la facultad podría ser de gran ayuda. Clases particulares, comida, ropa usada, arte y mucho más podrá ser ofertado en una experiencia similar a Facebook Marketplace (donde se publica el producto y se facilitan los medios de contacto para coordinar la compra).

4. Tinder Beauchef:
Bueno... mucha gente me dijo que lo hiciera y parecía una oportunidad única. Aunque con un funcionamiento distinto, en esta funcionalidad podrás buscar personas con las que conectar. Es agnóstica a género, orientación u objetivo, simplemente es un carrusel con todas las personas de Beauchef que activen también la funcionalidad. No tiene en sí un objetivo explícito, se pueden buscar amigos, pareja, varias parejas, qué sé yo. Decidí hacerlo distinto a cómo funcionan las aplicaciones de verdad por motivos que me da lata explicar acá.

Y bueno, prefiero aclarar altiro 2 cosas:

- No pretendo ganar plata con esto.
- La filosofía de la plataforma es manejar la menor información sensible posible. Es por esto que no hay chats, por ejemplo, y cada vez que nace la ocasión de realizar un contacto se haría referenciando otras plataformas (como WhatsApp, Instagram o Telegram). Casi todo lo que se hace en la página es "público", por lo que realmente el riesgo de, onda, filtraciones de datos o información privilegiada que solo pueda ver yo, es ínfimo. Hay una sola excepción, que serían los likes y matches de Tinder Beauchef, que bueno... hacerlo anónimo requería harta más pega (implementando cosas como SMPC), que evalué hacer, pero de la que simplemente no me armé el ánimo de realizar. Me tomo en serio la privacidad, y esta info no es algo con lo que pretenda jugar o tomar a la chacota. Encuentro sumamente importante transparentar esto. En un futuro pretendo implementar un sistema que sea anónimo por el lado del servidor, y así evitar cargar con la mochila de gestionar datos privados como estos. Pero, por ahora, cualquiera que lo quiera usar tendrá que conformarse con mi compromiso de no meterme a sapear los likes o matches.

No sé si a alguien le llegue a interesar esta cosa, quizá nadie la use y muera. Pero mientras siga sin pega tengo la disponibilidad total para trabajar en conjunto con comunidades de la u y agregar funcionalidades que les permitan potenciarse y hacer de la app un espacio más divertido. Ideas random que se me ocurren son:

- Agregar a los ladders un competitivo de Integration Bee.
- Agregar muros de cosas como: arte de Comdibujo, música del GMI, torneos de baby de cada dpto., historia que no se quiera perder.
- Pollas de los torneos dentro de la facultad.
- Una funcionalidad que les permita hacer rifas, bingos, sorteos u otros concursos a los centros de alumnos o grupos organizados.

Bueno, el cielo es el límite, pero mientras aún tenga motivación para trabajar en la plataforma (que aún me queda), o si tienen problemas técnicos, algo no les funciona bien o tienen cualquier otro motivo para contactarse conmigo, pueden hablarme por Telegram: @MatadorMarceloSalas1994.

Vivimos en un mundo donde no somos dueños de nuestros datos, y donde empresas extranjeras y algoritmos terminan moldeando nuestro cerebro y nuestra manera de pensar. Donde una cámara nos ve y un micrófono nos escucha las 24 horas del día. Donde todo lo que hacemos es sabido y usado en nuestra contra. No digo que en mis manos estarán mejor esos datos, pero quizás, un mundo donde este poder no lo concentren unos pocos, quizás, pueda ser un mundo mejor...
