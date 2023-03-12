


let array = [
    'jueves, De 08:00 a 19:00, Copiar el horario',
    'viernes, De 08:00 a 19:00, Copiar el horario',
    'sábado, De 08:00 a 17:00, Copiar el horario',
    'domingo, De 09:00 a 17:00, Copiar el horario',
    'lunes, De 08:00 a 19:00, Copiar el horario',
    'martes, De 08:00 a 19:00, Copiar el horario',
    'miércoles, De 08:00 a 19:00, Copiar el horario'
]

function cleanHorario(horarioArray){
    
    const splitArray = horarioArray.map(el => {
        const cleanEl = el.replace(/, Copiar el horario/g, '')
        const lowerD = cleanEl.replace(/D/g,'d')
        const noColon = lowerD.replace(/,/g,'')
        const splitted = noColon.split('')
        return splitted
    })
    
    for (let arr of splitArray){
        arr[0] = arr[0].toUpperCase()
    }
    
    let newCleanArray = []
    splitArray.forEach(el => {
    let joinet = el.join('')
    newCleanArray.push(joinet)
    })

    return newCleanArray
}

const cleanHorarioArr = cleanHorario(array)

console.log(cleanHorarioArr)

const horarioObject = {
    lunes: cleanHorarioArr.find(el => el.includes('Lunes')),
    martes: cleanHorarioArr.find(el => el.includes('Martes')),
    miercoles: cleanHorarioArr.find(el => el.includes('Miércoles')),
    jueves: cleanHorarioArr.find(el => el.includes('Jueves')),
    viernes: cleanHorarioArr.find(el => el.includes('Viernes')),
    sabado: cleanHorarioArr.find(el => el.includes('Sábado')),
    domingo: cleanHorarioArr.find(el => el.includes('Domingo')),
}


console.log(horarioObject)

// cleanHorarioArr.find(el => { 
   
// })

  
// function createHorario(object){

//     console.log('imprimiendoObject CreateH',object[2].time)
//     object.find(el => {
//         let jueves = el.includes('jueves')
//         console.log (jueves.time)
//     })
//     // const horario = `
//     //     <p>Lunes:
//     // `

// }
// createHorario(newArray)