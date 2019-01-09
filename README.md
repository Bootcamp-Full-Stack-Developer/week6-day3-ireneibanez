##Pokemons, promises y async-await

# Introducción

En esta práctica vamos a utilizar las promesas y la sintaxis async/await para 
hacer consultas a la api de pokemon. El objetivo es buscar el pokemon introducido
por el usuario y luego permitir ver las evoluciones de este. 

Las consultas a la API las realizaremos con fetch, puedes buscar información acerca de como
funciona en internet. Pero como adelanto, te dire que fetch devuelve una promesa.

Primero realizaremos el ejercicio utilizando solo promesas y tras esto, lo haremos
utilizando la nueva sintaxis de async y await.

# Iteración 1
En esta primera iteración debemos buscar el pokemon introducido por el usuario en el input.
Para ello, debes utilizar la función searchPokemon la cual deberá realizar las siguiente tareas:

 - Llamar a la función resetAll, la cual reiniciara el estado y el DOM con cada nueva búsqueda.
 - Obtener el valor introducido por el usuario en el campo input y comprobar que a introducido algo.
 - Realizar la consulta mediante fetch y utilizando la variable ENDPOINT. Ademas deberas añadirle a la url /pokemon/ y el
   campo introducido en el inputText. Utiliza string templates de ES6, por ejemplo: `${ENDPOINT}pokemon/${text}`.
  
 - Una vez recibida la respuesta, debes controlar los errores 404, ya que fetch los da como una respuesta
 válida y debemos controlarlos por nuestra cuenta.
 
 - Por último deberas igualar el valor de la variable pokemonSearched al resultado de la consulta y llamar a los métodos
 createPokemonInfo y createBtnEvolutions que se encargarán de pintar el pokemon en el HTML.
 
 Tip: Las respuestas obtenidas por el método fetch deben ser tratadas mediante el método .json().
             
# Iteración 2

# Iteración 3

# Iteración 4