---
title: "Uber"
description: "Las combinadas"
pubDate: "2026-06-30"
tags: ["Ideas", "Salismo"]
music:
  title: "We've Only Just Begun"
  author: "Carpenters"
  verse: "Workin' together day to day, together"
---

El otro día me encontraba en el cumpleaños de un gran amigo, y planeando la salida llegó el momento más importante de toda la noche: el momento de decidir cómo volvería a casa.

## Los carretes

Con el pasar de los años, y a medida que el contexto socioeconómico de las personas con las que me rodeaba fue cambiando, junto con esto cambió la forma de carretear. Pareciera casi que...

> "No es la conciencia la que determina la vida, sino la vida la que determina la conciencia."
> — Un viejo que mató a 500 millones de personas, o algo así

Bueno, el punto es que, como mis amigos empezaron a manejar más plata, cambiaron los hábitos de carretear, entre ellos el de quedarse en la casa del carrete hasta el día siguiente para no pagar el Uber. En la mayoría (por no decir la totalidad) de los carretes (juntas) a los que fui durante el liceo me devolvía en metro a mi casa. ¿Por qué? Obviamente era por la plata. En el 90% de esos carretes dormía en el suelo, en una silla o en algún otro lugar denigrante que terminaba en un dolor de espalda o algo así, pero hasta que no se conoce la comodidad, nada de esto es realmente un problema.

Y como tal, esta frontera de lo que toleras en tu día a día y lo que no se va corriendo a medida que tienes más dinero que te permita vivir una vida más cómoda. A los mismos que hace 10 años vi tirados en un suelo de baldosas, tapándose con un diario en la tercera noche más fría del año, hoy mirarían casi que con risa la sola idea de quedarse a dormir en un colchón inflable en vez de pedirse un Uber.

## ¿Dónde se detiene?

¿No es acaso una trampa? ¿Cuándo se supone que nos conformamos? ¿Es un proceso natural del desarrollo personal o es una artimaña de nuestro simio interno, que busca comodidad como un fin y no como un medio? Si nuestras metas de vida se basan en comodidades y no en otra cosa, ¿cuándo se está suficientemente cómodo? ¿Qué tan preparados como personas nos deja tanta comodidad? Bueno, eso da por sí solo para un megapost, pero volvamos a Uber.

## El viaje de vuelta

Basta: nada de lo que he hablado hasta ahora es relevante para el post. ¡Focus! Como varios de mis amigos ya trabajan y yo no, me ha tocado sentir desde la vereda de la pobreza el salto social que implica esto del Uber. Tampoco me puedo hacer el weón, a mí también ya me da paja quedarme en una casa y no dormir en mi rica camita, pero es una decisión mucho más difícil que para mis amigos asalariados.

¿Qué se puede hacer entonces? Durante la transición y en mis tiempos de mayor pobreza, adquirí el no adecuado hábito de irme en micro a la casa. Aunque no lo hice muchas veces, no fue necesario hacerlo tantas veces para darse cuenta de que era una mala idea (por temas de seguridad), por lo que la otra opción fue la única que iba quedando: la de combinar el Uber.

## El óptimo social

Sin duda un problema interesante. Es, casi que por donde uno lo mire, siempre la mejor opción. Entre que probablemente una carrera más larga tenga más probabilidad de ser tomada, que sale más barato, que te vas acompañado, que se emite menos CO₂ o cuánta weá, son pocos los contras de compartir un Uber. Sin embargo, el problema de cómo compartirlo no es tan directo.

Este sábado pasado ocurrió que entre 3 de los que quedábamos hacíamos una línea casi recta para llegar a casa, pero a la primera parada le salía más barato pedirlo solo (según la forma de dividir la cuenta que siempre usamos, que es dividirla en partes iguales). Luego de un rato, el precio bajó un poco y lo que le salía pedirlo solo se equiparó al costo dividido, por lo que aperró y se sumó igual (además que este amigo es terrible crack). Pero la pregunta obvia termina siendo: ¿cuál sería la forma justa de dividirse el Uber?

La economía sonríe cuando un Uber es compartido. Al final el tema del dinero y cuánta tontera se habla entre aquellos que se creen mejor que el resto se puede reducir a un problema de asignación de recursos (entendiendo como recursos algo así como... todo). Y si sonríe, es nuestro deber incentivarlo lo más posible. En mi [post sobre el transporte público](/blog/2026/01/17/sobre-el-transporte-publico) formulo un poco más la idea de cómo se vería mi mundo ideal en este aspecto, pero por ahora solo tenemos Uber, y al menos a corto plazo, debemos concentrar nuestros esfuerzos en aquello que ya tenemos.

## Plan para dividir el Uber justamente

Definimos la función $uber(x)$, donde $x$ es una lista de personas, como el costo del Uber que deja a todas las personas de la lista en su casa.

Si una lista $A$ representa a las personas que comparten el viaje, y $A_i$ representa a la $i$-ésima persona de esa lista, entonces lo que debe pagar cada una se puede escribir como:

$$
p(A_i)
=
\frac{uber([A_i])}{\sum_{x=1}^{n} uber([A_x])}\cdot uber(A)
$$

En palabras, cada persona paga una fracción del total proporcional a lo que le costaría ir sola.

Ya hice la [app](/aplicaciones/uber) y la empezaré a usar cuando me dé la perso pa sacarla. Idealmente la usaré cuando su uso signifique que yo pago más plata y no al revés, pa que no parezca que quiero implementar esta weá de cagado jajaja.
