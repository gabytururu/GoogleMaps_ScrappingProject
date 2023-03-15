let missingData = [
   'falta teléfono', 
   'falta sitio web', 
 //  'falta horario',
]

let dataLength = missingData.length

// if (dataLength === 3 && missingData.find(missingData => !missingData.includes('teléfono'))){
//    console.log('si falta web')
//    console.log(`ell array tiene ${dataLength} elementos`)
// }

// if ( missingData.find(missingData => !missingData.includes('teléfono'))){
//    console.log('si falta web o tel')
//    console.log(`ell array tiene ${dataLength} elementos`)
// }

let resultPhone;
let resultWeb;
let bothResults;
function checkData (array){
   if(array.find(arrEl => arrEl.includes('teléfono'))){
     resultPhone = true
   }else {
      resultPhone = false
   }

   if (array.find(arrEl => arrEl.includes('web'))){
      resultWeb = true
   }else{
     resultWeb = false
   }

   if (resultPhone && resultWeb){
      bothResults = true
   }else {
      bothResults = false
   }
   return bothResults
}

console.log('results of both variables True?:', checkData(missingData))





// let array = [
//     'digo uno, yupiya',
//     'digo dos, yupiya',
//     'digo tres, yupiya',
//     'digo cuatro, yupiya',
//     'digo cinco',
//     'digo seis, yupiya',
//     'digo siete'
// ]

// // let filteredArr = array.filter(sentence => sentence.includes('yupiya'))
// // console.log(filteredArr)

// let cleanArr = array.map(line => {
//     let cleanLines = line.toString().replace(', yupiya','')
//     return cleanLines
// }) 
// console.log(cleanArr)

// array.forEach((line,i) => {
//     if(line.includes(' yupiya','')){
//        // console.log(`line ${i} includes yupiya`)
//         line.replace('yupiya','yupiye')
//         console.log(`$line${i} is : ${line}`)
//     }else{
//         console.log(`line ${i} does NOT include Yupiya`)
//     }
  
// })

// let municipiosTab = [

    
// ]
// let munen =[];

// municipiosTab.forEach(mun => {
//    munen.push(`viveros en ${mun}`)   
//    munen.push(`viveros ${mun}`)   
// })

// console.log(munen)








