let typeofPlace = 'Parque Ecoturístico'
let stars = Math.random()*5
let comments = Math.random()*500
let namePlace = 'Cenote AEIOU'
let place = 'Tabasco'


let textOptions = [
    `Este ${typeofPlace} tiene ${stars} en promedio, de más de ${comments} de sus visitantes... ¿nada mal no?. Es por eso que es parte de esta lista de los ${typeofPlace} mejor calificados de ${place}. Con este respaldo estamos más que seguras(os) que se trata también de un sitio que puedes disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el ${typeofPlace} ${namePlace }en ${place}, es sin duda una gran opción `,
    `Bueno pues si eres de quienes ama estar en contacto con la naturaleza y andas por ${place}, entonces no puedes perderte la experiencia de visitar el ${typeofPlace} ${namePlace}. Con una calificación promedio de ${stars} estrellas de más de ${comments} visitantes, no tenemos duda de que se trata de un favorito de esta región. Así que nada...prepárate para sumergirte y disfrutar a tope de los paisajes naturales de ${namePlace}`,
    `El ${typeofPlace} Cascadas de Villa Luz es una opción fantástica para tener una aventura natural en ${place}. Su calificación promedio es de ${stars} respaldada por más de ${comments}visitantes, así que no tenemos duda de que este lugar pertenece a la lista de los ${typeofPlace} mejor rankeados de ${place} y que se trata de uno de los principales atractivos naturales en la región. Así que ya sabes... ¿ganas de naturaleza?... pues el ${typeofPlace} ${namePlace} es una grandísima opción.`,
]


function spinnedText(textOptionsArr){
    let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
    return selectedText
}
console.log(spinnedText(textOptions))

// Si eres un amante de la naturaleza y estás en Tabasco, no puedes perderte la oportunidad de visitar el Parque Ecoturístico Cascadas de Villa Luz. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este lugar es un verdadero tesoro para quienes disfrutan de la flora y fauna autóctona. Este respaldo es prueba suficiente de que se trata de uno de los principales centros ecoturísticos de la región.

// El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es un destino obligado para los amantes de la naturaleza. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, puedes estar seguro de que este lugar te sorprenderá con su belleza natural. La cantidad de opiniones positivas que ha recibido este espacio ecoturístico es respaldo suficiente para ponerlo en esta lista, pues demuestra que es uno de los principales atractivos turísticos en Tabasco.

// Si buscas una experiencia en contacto con la naturaleza, el Parque Ecoturístico Cascadas de Villa Luz en Tabasco es una excelente opción. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este lugar es un verdadero oasis para aquellos que buscan un respiro en medio del entorno urbano. Este respaldo es prueba suficiente de que se trata de uno de los centros ecoturísticos más destacados en la región.
//     Si estás en busca de un lugar para conectar con la naturaleza en Tabasco, no puedes perderte el Parque Ecoturístico Cascadas de Villa Luz. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este centro ecoturístico es uno de los más destacados de la región.

// ¿Te gusta la naturaleza? Si estás en Tabasco, no puedes dejar de visitar el Parque Ecoturístico Cascadas de Villa Luz. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este lugar es un verdadero paraíso natural.

// El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es un lugar mágico para aquellos que disfrutan de la naturaleza. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, es uno de los lugares más recomendados para disfrutar de la flora y fauna autóctona.

// Si eres un amante de la naturaleza, el Parque Ecoturístico Cascadas de Villa Luz en Tabasco es el lugar perfecto para ti. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, no hay duda de que es uno de los principales centros ecoturísticos de la región.

// ¿Quieres disfrutar de un contacto auténtico con la naturaleza? El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es el lugar indicado. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este centro ecoturístico es uno de los más recomendados de la región.

// Si buscas un lugar donde puedas disfrutar de la naturaleza en su máxima expresión, no puedes perderte el Parque Ecoturístico Cascadas de Villa Luz en Tabasco. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, es uno de los principales centros ecoturísticos de la región.

// El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es un destino turístico obligado para aquellos que quieren disfrutar de la naturaleza. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este lugar es garantía de un contacto auténtico con el entorno natural.

// ¿Estás buscando un lugar donde puedas disfrutar de la naturaleza en su estado puro? El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es el lugar ideal. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, este centro ecoturístico es uno de los más recomendados de la región.

// El Parque Ecoturístico Cascadas de Villa Luz en Tabasco es uno de los principales atractivos turísticos de la región para aquellos que quieren disfrutar de la naturaleza. Con una calificación promedio de 4.8 estrellas basada en la opinión de más de 350 visitantes, es un lugar que no puedes dejar de visitar.

// Si quieres experiment


let typeOfPlaceArr = ['Parque Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Sitio Ecoturístico', 'Parque Ecológico','Parque Ecoturístico', 'Parque Natural','Parque Ecoturístico', 'Centro de Ecoturismo', 'Parque de Ecoturismo' ]

console.log(spinnedText(typeOfPlaceArr))