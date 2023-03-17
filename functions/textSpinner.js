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
let typeOfPlaceArr = [
    'Parque Ecoturístico',
    'Centro Ecoturístico',
    'Parque Ecoturístico', 
    'Sitio Ecoturístico', 
    'Parque Ecológico',
    'Parque Ecoturístico', 
    'Parque Natural',
    'Parque Ecoturístico', 
    'Centro de Ecoturismo', 
    'Parque de Ecoturismo',
]

function spinnedText(textOptionsArr){
    let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
    return selectedText
}
console.log(spinnedText(textOptions))
console.log(spinnedText(typeOfPlaceArr))

//----------------------------------------------------------------------------------------//
        let links = [
            'link1', 'link2', 'link3', 'link4', 'link5', 'link6', 'link7', 'link8', 'link9', 'link10', 'link11', 'link12','link13', 
            //'link14','link15', 'link16','link17','link18','link19','link20','link21'
        ]
        let indexArray =[]
        let finalArray =[]
        
        let typeOfPlaceObjectArr = [
            '0Parque Ecoturístico',
            '1Centro Ecoturístico',
            '2Parque Ecoturístico', 
            '3Sitio Ecoturístico', 
            '4Parque Ecológico',
            '5Parque Ecoturístico', 
            '6Parque Natural',
            '7Parque Ecoturístico', 
            '8Centro de Ecoturismo', 
            '9Parque de Ecoturismo', 
            '10Parque Ecoturístico', 
            '11Sitio Ecoturístico', 
            '12Parque Ecológico',
            '13Parque Ecoturístico', 
            '14Parque Natural',
            '15Parque Ecoturístico', 
            '16Centro de Ecoturismo', 
            '17Parque de Ecoturismo'             
        ]
        
        
        // for (let linki = 0; linki <= typeOfPlaceObjectArr.length; linki++){
        for (let link of links){    
            let i = Math.floor(Math.random() * typeOfPlaceObjectArr.length)

            function spinnedTextNoRepetition(typeOfPlaceObjectArr){  
                
                    do{            
                        i = Math.floor(Math.random() * typeOfPlaceObjectArr.length)          
                    }while(indexArray.includes(i))
                        
                    finalArray.push(link + '_' + typeOfPlaceObjectArr[i])
                    indexArray.push(i)  
                
                 

                   // && (finalArray.length < typeOfPlaceObjectArr.length)
                // if (indexArray.includes(i)){
                //     i = Math.floor(Math.random() * typeOfPlaceObjectArr.length)      
                // }else{
                //     finalArray.push(link + '_' + typeOfPlaceObjectArr[i])
                //     indexArray.push(i)   
                // }
                    

                 return finalArray 
            } 

            spinnedTextNoRepetition(typeOfPlaceObjectArr)
        }
    

console.log('indexArray FINAL: ',indexArray)
console.log('finalArray FINAL: ',finalArray)