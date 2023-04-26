
// let jsonR = [
//     {place:'cascadas de bla', state:'tabasco', stars: 4.5},
//     {place:'paraje hongos', state:'veracruz', stars: 4.3},
//     {place:'sendero de blu', state:'baja', stars: 4.7},
// ]

// let author = ['camilo nuevo', 'lorenza ganez', 'ramiro cue']

// // let newArr = [...jsonR,...author]
// // console.log(newArr)


// // jsonR[0].author = author[0]
// // console.log(jsonR)


// for (let i = 0; i<jsonR.length; i++){
//     jsonR[i].author = author[i]

// }
// console.log(jsonR)


let str = 'Bosque_de_Arce,_Bosque_de_Maple_92'
// let test = str.toLowerCase()
// console.log(test)


function titleCase(str){
    const lowerCase = str.toLowerCase()
    const splitted = lowerCase.split(' ')                
    let cleanUpArr=[]

    for (let el of splitted){
    const firstUpper = el[0].toUpperCase()
    const restLower = el.slice(1).toLowerCase()
    const titleCaseStr = firstUpper + restLower
    cleanUpArr.push(titleCaseStr)
    }

    const titleCaseName = cleanUpArr.join(' ')                    
    return titleCaseName 
}


let removeAccents = (str) => {
    let noAccents = str.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/,/ig,'').replaceAll('.','').replace('-','').replace(/\s\s/ig,' ').replace(/"/ig,'')

    //no se si deba ser to lowercase pq evita el title case en el q vienen los scripts?
    let cleanPhotoName = noAccents.toLowerCase()
    return cleanPhotoName
}

console.log(removeAccents(str))