
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