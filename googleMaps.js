const puppeteer = require('puppeteer');
const XLSX = require('xlsx');


async function autoScroll(page,searchTerm){   
    await page.evaluate(async(searchTerm)=>{
        do{
            await new Promise ((resolve,reject) =>{
                    let totalHeight = 0;
                    let distance = 300;                    
                    let timer = setInterval(()=>{                        
                        const scrollableMenu = document.querySelector(`div[aria-label="Resultados de ${searchTerm}"]`)                          
                        let scrollHeight = scrollableMenu.scrollHeight
                        scrollableMenu.scrollBy(0,distance)
                        totalHeight += distance

                        if(totalHeight >= scrollHeight){
                            clearInterval(timer)
                            resolve()
                        }
                    },100)                    
                })
        }while(document.querySelector('.HlvSq') === null)
    },searchTerm)    
}

//async function scrapping(){
(async()=>{
    let baseUrl = 'https://www.google.com.mx/maps/search/vivero+en+durango+OR+viveros+en+durango/@24.0229216,-104.6827443,13z/data=!4m2!2m1!6e6?authuser=0&hl=es'
    let totalResults = 2
    let corePlace = 'Tabasco'
    let fileName = 'viverosDurango.xlsx'
    let typeOfPlace = 'Parque Ecoturístico'
    let searchTerm = 'vivero en durango OR viveros en durango'
    
   
    const browser = await puppeteer.launch({headless:false}) //
    const page = await browser.newPage()    
    await page.setViewport({width:1300,height:900});
    await page.goto(`${baseUrl}`,{waitUntil: 'domcontentloaded'})
    await autoScroll(page,searchTerm)
   
    const viverosLinks = await page.evaluate((totalResults)=>{
        const dataCardsArr = document.querySelectorAll('a.hfpxzc')
        const viverosLinks =[]        
        dataCardsArr.forEach((element) => {
            viverosLinks.push(element.href)            
        })      
        return viverosLinks.slice(0,totalResults)
    },totalResults)
    console.log('viverosLinks', viverosLinks)
    console.log('viverosLinks Length', viverosLinks.length)
    
    const viverosData = []
    let acct = 0
    for (let link of viverosLinks){
        await page.goto(link)    
       // await getiframe(page) 
        await page.waitForSelector('.DUwDvf.fontHeadlineLarge span') 
       
        const viveroSpecifics = await page.evaluate((typeOfPlace,corePlace)=>{
            const viveroInfo ={}
            
            const missingData= document.querySelectorAll('span.DkEaL')
            const missingDataArr=[]
            for(let dataPoint of missingData) {
                    let missingDataList = dataPoint.innerText
                    missingDataArr.push(missingDataList)
            };

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

            let dataSize = document.querySelectorAll('.Io6YTe.fontBodyMedium').length                
            if(document.querySelector('.Io6YTe.fontBodyMedium') === null){
                    phone = 'No cuenta con teléfono'  
                    web = 'Web no disponible'              
                    address = 'No cuenta con dirección'
                    city = 'No cuenta con ciudad'  
            }else if(missingDataArr.find(missingData => missingData.includes('teléfono')) && missingDataArr.find(missingData => missingData.includes('web')) ){
                    phone = 'No cuenta con teléfono'
                    web = 'Web no disponible'
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent 
            }else if (missingDataArr.find(missingData => missingData.includes('teléfono'))){
                    phone = 'No cuenta con teléfono'
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
                    web = document.querySelectorAll('a.CsEnBe')[1].href
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent 
            }else if(missingDataArr.find(missingData => missingData.includes('web'))){
                    web = 'Web no disponible'
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent 
                    phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent  
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent 
            }else if (dataSize <= 2){
                    phone = 'no cuenta con teléfono'  
                    web = 'Web no disponible'              
                    address = 'no cuenta con dirección'
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent   
            }else if(dataSize === 3 && checkData(missingDataArr) === false ){
                    address= 'No cuenta con dirección'
                    web = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent 
                    phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent  
                    city = 'no cuenta con ciudad'
            }else {
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent 
                    web = document.querySelectorAll('a.CsEnBe')[1].href
                    phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent  
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[3].textContent 
            };

            function searchWeb(viveroWeb){
                if(viveroWeb.includes('no disponible')){
                    return 'web no disponible'                        
                }else{
                    return `<a href="${viveroWeb}">Web del vivero ${viveroInfo.name}</a>`
                }                  
            }

            if(missingDataArr.find(missingData => missingData.includes('foto'))|| document.querySelector('.aoRNLd.kn2E5e.NMjTrf.lvtCsd img') === null){
                photo = 'no hay foto'
            }else{
                photo = document.querySelector('.aoRNLd.kn2E5e.NMjTrf.lvtCsd img').currentSrc
            }

            let horarioArr =[]
            let horario = document.querySelectorAll('.mWUh3d')
            if (horario.length === 0 || document.querySelector('.mWUh3d') === null ){
                horarioArr.push('No se cuenta con horario oficial')
            }else{
                horario.forEach(el => horarioArr.push(el.ariaLabel)) 
            }
          
            function cleanHorario(horarioArray){
               const splitArray =              
                horarioArray.map(el => {
                    const cleanEl = el.replace(/,\sCopiar el horario/g,'')
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

            const cleanHorarioArray = cleanHorario(horarioArr)




            let totalComments = document.querySelectorAll('.MyEned span.wiI7pd').length
            if ( totalComments < 1 || document.querySelector('.MyEned span.wiI7pd') === null ) {
                comments = 'no hay opiniones'
                cantidadResenas = '0'
                stars = '0.0'           
            }else{
                const commentsArr = []
                document.querySelectorAll('.MyEned span.wiI7pd').forEach(comment => commentsArr.push(comment.innerText)); 
                comments = commentsArr
                cantidadResenas = document.querySelectorAll('.fontBodyMedium.dmRWX')[0].innerText.split('\n')[1].replace(' reseñas','').replace(' reseña', '').replace('(','').replace(')','')
                stars = document.querySelectorAll('.fontBodyMedium.dmRWX')[0].innerText.split('\n')[0].replace(',','.')
            }     

            function spinnedText(textOptionsArr){
                let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
                return selectedText
            }

            const typeOfPlaceArr = [
                'Parque Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Sitio Ecoturístico', 'Parque Ecológico','Parque Ecoturístico', 'Parque Natural','Parque Ecoturístico', 'Centro de Ecoturismo', 'Parque de Ecoturismo' 
            ]




           
                viveroInfo.name = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[1].textContent 
                viveroInfo.address= address 
                viveroInfo.phone= phone
                viveroInfo.web = web
                // viveroInfo.horario = horarioArr.toString().replace('Copiar el horario','')
                //viveroInfo.horario = horarioArr
                viveroInfo.horario = cleanHorarioArray
                viveroInfo.cityClean = city.slice(8,)
                viveroInfo.urlgMaps = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[0].baseURI
                viveroInfo.city= city
                viveroInfo.stars =  stars
                viveroInfo.CantidadResenas =  cantidadResenas
                viveroInfo.opiniones = comments.toString()
                viveroInfo.structuredData = `
                    <h2>${typeOfPlace} ${viveroInfo.name}</h2>
                    <p> ¿Estás buscando los mejores Parques Ecoturísticos en ${corePlace}? ¡Estás en el lugar correcto! Pues en este artículo vamos a presentarte cuáles son los  ${spinnedText(typeOfPlaceArr)} que han sido mejor evaluados en este estado. \n Para esto, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso entrevistas para poder determinar cuáles son los  ${spinnedText(typeOfPlaceArr)} que mejor calificación han recibido en ${corePlace} durante los últimos años. \n Con esta prueba social como respaldo, hoy te daremos los ${spinnedText(typeOfPlaceArr)} mejor calificados y te compartiremos su ubicación, medios oficiales de contacto, horarios y cómo llegar hasta ellos, junto con la calificación promedio con la que cuenta cada lugar. \n Así que prepárate y ¡a disfrutar del ecoturismo en ${corePlace}!</p>
                    <h3><b>Dirección del ${typeOfPlace} ${viveroInfo.name}: </b></h3>
                    <p>El ${typeOfPlace} se ubica en${viveroInfo.address}</p>
                    <p><b>Teléfono del ${typeOfPlace}: </b>${viveroInfo.phone}</p>
                    <p><b>Horarios Oficiales: </b>${viveroInfo.horario}</p>
                    <p><b>Sitio Web: </b>${searchWeb(viveroInfo.web)}</p>
                    <p><b>Ubicación: </b><a href='${viveroInfo.urlgMaps}'>Mapa del ${typeOfPlace} ${viveroInfo.name}</a></p>                        
                    `
                //viveroInfo.iframe = document.querySelectorAll('.yA7sBe')[0].value
                viveroInfo.photo = photo
                viveroInfo.missingData = missingDataArr.toString()
            
            
            
                return viveroInfo
        },typeOfPlace, corePlace)

        acct++
        viverosData.push({acct,...viveroSpecifics})
        console.log('viveroSpecifics',acct, viveroSpecifics)
    }
    console.log('viverosData:', viverosData)
    console.log('Total de viveros:', viverosData.length)
    await browser.close()

    const workbook = XLSX.utils.book_new()
    let worksheet = XLSX.utils.json_to_sheet(viverosData)
    XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
    XLSX.writeFile(workbook, fileName)
})()
//}
// scrapping()