// let typeofPlace = 'Parque Ecoturístico'
// let stars = Math.random()*5
// let comments = Math.random()*500
// let namePlace = 'Cenote AEIOU'
// let place = 'Tabasco'


// let textOptions = [
//     `Este ${typeofPlace} tiene ${stars} en promedio, de más de ${comments} de sus visitantes... ¿nada mal no?. Es por eso que es parte de esta lista de los ${typeofPlace} mejor calificados de ${place}. Con este respaldo estamos más que seguras(os) que se trata también de un sitio que puedes disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el ${typeofPlace} ${namePlace }en ${place}, es sin duda una gran opción `,
//     `Bueno pues si eres de quienes ama estar en contacto con la naturaleza y andas por ${place}, entonces no puedes perderte la experiencia de visitar el ${typeofPlace} ${namePlace}. Con una calificación promedio de ${stars} estrellas de más de ${comments} visitantes, no tenemos duda de que se trata de un favorito de esta región. Así que nada...prepárate para sumergirte y disfrutar a tope de los paisajes naturales de ${namePlace}`,
//     `El ${typeofPlace} Cascadas de Villa Luz es una opción fantástica para tener una aventura natural en ${place}. Su calificación promedio es de ${stars} respaldada por más de ${comments}visitantes, así que no tenemos duda de que este lugar pertenece a la lista de los ${typeofPlace} mejor rankeados de ${place} y que se trata de uno de los principales atractivos naturales en la región. Así que ya sabes... ¿ganas de naturaleza?... pues el ${typeofPlace} ${namePlace} es una grandísima opción.`,
// ]
// let typeOfPlaceArr = [
//     'Parque Ecoturístico',
//     'Centro Ecoturístico',
//     'Parque Ecoturístico', 
//     'Sitio Ecoturístico', 
//     'Parque Ecológico',
//     'Parque Ecoturístico', 
//     'Parque Natural',
//     'Parque Ecoturístico', 
//     'Centro de Ecoturismo', 
//     'Parque de Ecoturismo',
// ]

// function spinnedText(textOptionsArr){
//     let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
//     return selectedText
// }
// console.log(spinnedText(textOptions))
// console.log(spinnedText(typeOfPlaceArr))



let indexArray =[]
let finalArray =[]
//let finalArr =[] /// almacena y desde placeInfo llama el último index ej [-1] asi siempre sera el ultimo agregado sin previa rep
let links = [
    'link1', 'link2', 'link3', 'link4', 'link5', 'link6', 'link7', 'link8', 'link9', 'link10'
]

for (let link of links){

    let typeOfPlaceObjectArr = [
        {index:0, text:'Parque Ecoturístico'},
        {index:1, text:'Centro Ecoturístico'},
        {index:2, text:'Parque Ecoturístico'}, 
        {index:3, text:'Sitio Ecoturístico'}, 
        {index:4, text:'Parque Ecológico'},
        {index:5, text:'Parque Ecoturístico'}, 
        {index:6, text:'Parque Natural'},
        {index:7, text:'Parque Ecoturístico'}, 
        {index:8, text:'Centro de Ecoturismo'}, 
        {index:9, text:'Parque de Ecoturismo'},
    ]
    
    let i = Math.floor(Math.random() * typeOfPlaceObjectArr.length)

    function spinnedTextNoRepetition(typeOfPlaceObjectArr){        
        do{            
            i = Math.floor(Math.random() * typeOfPlaceObjectArr.length)          
        }while(indexArray.includes(i))

        indexArray.push(i)
        for (let index of indexArray){
            typeOfPlaceObjectArr.find(el => {
                index === typeOfPlaceObjectArr.ObjectK
            })

        }

        return indexArray

        
    
    }
    
    console.log('indexArray en construcción', indexArray)
    spinnedTextNoRepetition(typeOfPlaceObjectArr)

}


console.log('indexArray FINAL',indexArray)