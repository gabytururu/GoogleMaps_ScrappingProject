    // let array = [
    //     'jueves, De 08:00 a 19:00, Copiar el horario',
    //     'viernes, De 08:00 a 19:00, Copiar el horario',
    //     'sábado, De 08:00 a 17:00, Copiar el horario',
    //     'domingo, De 09:00 a 17:00, Copiar el horario',
    //     'lunes, De 08:00 a 19:00, Copiar el horario',
    //     'martes, De 08:00 a 19:00, Copiar el horario',
    //     'miércoles, De 08:00 a 19:00, Copiar el horario'
    // ]

let array = [
    'Lunes (Natalicio de Benito Juárez (feriado)) de 09:00 a 19:00 El horario podría cambiar',
    'Martes (Natalicio de Benito Juárez) de 09:00 a 19:00 El horario podría cambiar',
    'Miércoles de 09:00 a 19:00',
    'Jueves de 09:00 a 19:00',
    'Viernes de 09:00 a 19:00',
    'Sábado de 09:00 a 19:00',
    'Domingo de 09:30 a 16:00'
]

function cleanHorario(horarioArray){
    
    const splitArray = horarioArray.map(el => {
        const cleanEl = el.replace(/, Copiar el horario/g, '')
        const lowerD = cleanEl.replace(/D/g,'d')
        const noColon = lowerD.replace(/,/g,'')
        const noChange = noColon.replace(/ El horario podría cambiar/,'')
        const noParenthesis = noChange.replace(/\([^()]+\)/g,'')
        const noParenthesisAgain = noParenthesis.replace(/\([^()]+\)/g,'')
        const noDoubleSpace = noParenthesisAgain.replace(/\s\s/,' ')
      // /\([^()]+\)/g
        const splitted = noDoubleSpace.split('')

        return splitted
    })
    
    for (let arr of splitArray){
        arr[0] = arr[0].toUpperCase()
        console.log(arr)
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

