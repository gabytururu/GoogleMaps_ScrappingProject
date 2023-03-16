
const placeName = 'PARQUE Guadalupe ecoturismo'

function firstUpperCase(){
    let lowerCase = placeName.toLowerCase()
    let splitted = lowerCase.split('')
    splitted[0] = splitted[0].toUpperCase()
    let jointed = splitted.join()
    let clean= jointed.replace(/,/gi,'')
    return clean
}
console.log(firstUpperCase(placeName))

function titleCase(){
    let lowerCase = placeName.toLowerCase()
    let splitted = lowerCase.split(' ')
    console.log('firstSplitted',splitted)
    let cleanUpArr=[]
    for (let el of splitted){
       let firstUpper = el[0].toUpperCase()
       let restLower = el.slice(1).toLowerCase()
       let fullName = firstUpper + restLower
       cleanUpArr.push(fullName)
    }
   let titleCaseName = cleanUpArr.join(' ')
    
   return titleCaseName 
}
console.log(titleCase(placeName))

function lowerCase(){
    let lowerCase = placeName.toLowerCase()
    return lowerCase
}

console.log(lowerCase('lowerCaseTitle',placeName))


[`Este Parque ecoturístico tiene 4.3 estrellas de calificación promedio, a partir de las más de 350 opiniones de sus visitantes... ¿nada mal no?. Es por eso que es parte de esta lista de los Mejores mejor calificados de Tabasco. Con este respaldo estamos más que seguras(os) que se trata  de un sitio que vas a disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el Parque Ecoturístico 'Cascadas de VillaLuz' en Tabasco es sin duda una gran opción`,
`Bueno pues si eres de quienes ama estar en contacto con la naturaleza y andas por Tabasco, entonces no puedes perderte la experiencia de visitar el Parque Ecoturístico Cascadas de VillaLuz. Con una calificación promedio de 4.4 estrellas de más de 150 visitantes, no tenemos duda de que se trata de un favorito de esta región. Así que nada...prepárate para sumergirte y disfrutar a tope de los paisajes naturales de Tabasco y Lánzate a Cascadas de VillaLuz`,
`El Parque Ecoturístico Cascadas de VillaLuz es una opción fantástica para tener una aventura natural en Tabasco. Su calificación promedio es de 4.8 estrellas respaldada por más de 500 visitantes, así que no tenemos duda de que este lugar pertenece a la lista de los Centros Ecoturísticos mejor rankeados de de Tabasco y que se trata de uno de los principales atractivos naturales en la región. Así que ya sabes... ¿ganas de naturaleza?... pues entonces Parque Natural Cascadas de VillaLuz es una grandísima opción`,
`Si te apasiona la naturaleza y andas en busca de aventuras ¡pues no se diga más! porque sin duda el Parque Ecoturístico Cascadas de VillaLuz es una opción en Tabasco que no debes dejar pasar. Este parque ecoturístico tiene una calificación promedio de 4.6 estrellas, basada en las opiniones de más de 250 visitantes, motivo por el que forma parte de este rank. Así es que... siendo uno de los parques ecoturísticos mejores calificados en Tabasco  ¿qué esperas para visitarlo?`,
`Bueno... pues ya que andas buscando salir de lo cotidiano... ¿Qué tal disfrutar de algunos de los paisajes más bonitos y naturales de Tabasco?. Pues eso es lo que El Parque Ecoturístico Cascadas de VillaLuz te ofrece. Este sitio tiene una calificación promedio de 4.7 estrellas, a partir de opiniones de al menos 50 visitantes previos a ti, y es por eso que se considera uno de los top de este estado. Así que nada... sin excusas y ¡a vivir esta experiencia en la naturaleza!`,
`Entendemos que si estás aquí, es porque estás buscando un buen lugar en Tabasco para conectarte con la naturaleza y disfrutarla a tope. Y nada... que el Parque Ecoturístico Cascadas de VillaLuz es sin duda alguna una de tus mejores opciones para lograrlo. Este parque ecoturístico ha sido evaluada por más de 300 visitantes, que le otorgan en promedio una calificación de 4.5 estrellas, haciéndolo uno de los sitios más recomendados de Tabasco. Así que nada.. a pasar del pensamiento a la acción y a poner el parque ecoturístico Cascadas de VillaLuz en tu ruta de estos días ¡pero ya!`,
`Uno de los sitios naturales más memorables de Tabasco es sin duda alguna el Parque Ecoturístico Cascadas de VillaLuz. Este lugar está respaldado por un montón de visitantes previos (más de 300), y evaluaciones promedio que rondan las 4.9 estrellas, lo que lo hace un favorito de esta región. Es por eso que forma parte de esta lista de los mejores centros ecoturísticos de Tabasco, y es por eso también que nos parece una recomendación imperdible para ti.`,
`Si andas en búsca de experiencias únicas en la naturaleza, entonces el Parque Ecoturístico Cascadas de VillaLuz en Tabasco tiene que ser parte de tu lista. Este es un centro ecoturístico con más de 400 opiniones de visitantes y que ha sido de manera consistente calificado con promedios de 4.6 estrellas, es por eso que aunque pueda tener algunas áreas de mejora, es sin duda uno de los mejores lugares para disfrutar de la naturaleza en la región. Así que no lo pienses mucho más y ¡a visitar las cascadas de villa luz!`,
`El Parque Ecoturístico Cascadas de VillaLuz es una de las joyas naturales que tiene Tabasco. Se trata de un lugar evaluado en promedio con 4.5 estrellas por lo menos por 250 personas. Es por esto que no podemos dejar de recomendártelo como uno de los favoritos para los amantes de la naturaleza en Tabasco. Así que ya sabes, guárdate toda la información logística que vamos a proporcionarte y anímate a visitar este increíble centro ecoturístico cuanto antes`,
`Si se trata de explorar la belleza natural de Tabasco, entonces el Parque Ecoturístico Cascadas de VillaLuz es lo que llamamos un "must". Este centro ecoturístico está recomendado por más de 600 opiniones de visitantes que lo han evaluado hasta con 4.8 estrellas. Se trata de uno de los espacios naturales más amenos de la región y por eso una alternativa que no debes dejar de visitar si andas por Tabasco buscando algo natural`,
`Si eres de los que disfrutan de los paisajes naturales, entonces tienes que visitar el Parque Ecoturístico Cascadas de VillaLuz en Tabasco. Con más de 300 opiniones de visitantes y una calificación promedio de 4.2 estrellas, este lugar es uno de los más valorados en la región`,
`¿Quieres vivir un paseo increible en contacto con la naturaleza? entonces no puedes dejar de considerar una visita al El Parque Ecoturístico Cascadas de VillaLuz en Tabasco. Con una calificación promedio de 4.9 estrellas y más de 700 opiniones de visitantes, este lugar es una de las mejores opciones para los amantes del ecoturismo en esta región. Así es que ¡toma nota  de todo lo requerido para tu visita a continuación!`,
`Si estás en busca de un lugar para conectarte con la naturaleza, el Parque Ecoturístico Cascadas de VillaLuz en Tabasco una de las mejores opciones. Este sitio forma parte de esta lista de los mejores de Tabasco gracias al respaldo y opiniones de más de 500 visitantes y que le han otorgado una calificación de más de 4.8 estrellas en promedio. Este centro sin duda es uno de los mejores para disfrutar del entorno natural de Tabasco y practicar el ecoturismo y la aventura en la región`,
`Si estás en Tabasco en búsqueda de algo de ecoturismo y aventura entonces el Parque Ecoturístico Cascadas de VillaLuz no se te puede escapar. Hemos decidido incluir este centro ecoturístico en esta lista de los mejores de Tabasco gracias al respaldo y opiniones de más de 200 visitantes que lo han evaluado por lo menos con 4.3 estrellas de calificación (de las más altas para este estado de Mexico). Así que chécate todos lo detalles necesarios para tu visita y ¡no se diga más! ¡a vivir el ecoturismo en Tabasco en las Cascadas de Villa Luz!`,
`Si lo que buscas es conectar con la naturaleza de Tabasco, entonces tienes que -sí o sí- programarte para una visita al Parque Ecoturístico Cascadas de VillaLuz. Este es uno de los centros ecoturísticos mejor calificados de Tabasco (con 4.4 estrellas y más de 150 opiniones de visitantes), lo que lo hace un favorito de los amantes del ecoturismo y la aventura natural. Si andas en esas entonces, revisa los detalles siguientes para tener una visita segura y ¡lánzate a las cascadas de Villa Luz!`,
`¿Te gusta el ecoturismo o andas en Tabasco buscando algo de aventura natural? Entonces pon ya mismo en tu lista al Parque Ecoturístico Cascadas de VillaLuz. Este es un lugar ideal para encontrarte con la naturaleza y disfrutar de paisajes lindos. Es un centro ecoturístico que ha sido evaluado por más de 400 opiniones de visitantes y un promedio de 4.5 estrellas de calificación. Aunque puede que haya algunos detallitos que es posible mejorar, la realidad es que las Cascadas de villaLuz son un paso obligado si lo que estás buscando es ecoturismo y naturaleza en Tabasco`,

]
