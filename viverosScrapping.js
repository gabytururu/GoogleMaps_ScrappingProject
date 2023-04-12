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


(async()=>{
    let baseUrl = 'https://www.google.com/maps/search/viveros+en+tepic/@21.4898264,-104.9417262,12z'
    let totalResults = 120
    let searchTerm = 'viveros en tepic'
    let typeOfPlace = 'viveros'
    let corePlace = 'tepic'
    let state = 'nayarit'
    let slug = `${typeOfPlace}-en-${corePlace}-${state}`
    let fileName = 'viveros_tepicNAY.xlsx'
    let sheetName = 'fullDB_tepicNAY'
    let targetWebsite = 'tierradeplantas.com'
    
   
    const browser = await puppeteer.launch({headless:false}) //slowMo: 300
    const page = await browser.newPage()    
    await page.setViewport({width:1300,height:900});
    await page.goto(`${baseUrl}`,{waitUntil: 'domcontentloaded'})
    await autoScroll(page,searchTerm)
   
    const placesLinks = await page.evaluate((totalResults)=>{
        const dataCardsArr = document.querySelectorAll('a.hfpxzc')
        const placesLinks =[]        
        dataCardsArr.forEach((element) => {
            placesLinks.push(element.href)            
        })      
        return placesLinks.slice(0,totalResults)
    },totalResults)

    console.log('placesLinks', placesLinks)
    console.log('placesLinks Length', placesLinks.length)
    
    const placesData = []
    let acct = 0
    for (let link of placesLinks){
        await page.goto(link)  
        await page.waitForSelector('.DUwDvf.fontHeadlineLarge span') 
        //const placeName = await page.$$eval('.DUwDvf.fontHeadlineLarge span', el => el[1].textContent)
        //const placeName = await page.$eval('h1.DUwDvf.fontHeadlineLarge', el => el.textContent)    
        //await page.waitForSelector(`button[aria-label='Compartir ${placeName}']`)
        await page.waitForSelector('button.g88MCb.S9kvJb[data-value="Compartir"]')
        await page.click('button.g88MCb.S9kvJb[data-value="Compartir"]')
        await page.waitForNavigation()
        await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
        await page.click('button.zaxyGe.L6Bbsd.YTfrze')
        await page.waitForSelector('input.yA7sBe')
        const iframeMap = await page.$eval('input.yA7sBe', el => el.getAttribute('value'))
        const mapWidth = iframeMap.replace('width="600"','width="390"')
        const iframeResized = mapWidth.replace('height="450"','height="420"')
       
        const placeSpecifics = await page.evaluate((typeOfPlace,state, corePlace,acct,targetWebsite,iframeResized, slug)=>{
            const placeInfo ={}
            const placeName = document.querySelector('h1.DUwDvf.fontHeadlineLarge').textContent 

            function titleCase(placeName){
                const lowerCase = placeName.toLowerCase()
                const splitted = lowerCase.split(' ')                
                let cleanUpArr=[]
                for (let el of splitted){
                const firstUpper = el[0].toUpperCase()
                const restLower = el.slice(1).toLowerCase()
                const fullName = firstUpper + restLower
                cleanUpArr.push(fullName)
                }
                const titleCaseName = cleanUpArr.join(' ')                    
                return titleCaseName 
            }
            const titleCaseName = titleCase(placeName)

            function lowerCase(placeName){
                let lowerCase = placeName.toLowerCase()
                return lowerCase
            }
            const lowerCaseName = lowerCase(placeName)


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
            }else if (missingDataArr.find(missingData => missingData.includes('teléfono')) && missingDataArr.find(missingData => !missingData.includes('web'))){
                    phone = 'No cuenta con teléfono'
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
                    web = document.querySelectorAll('a.CsEnBe')[1].href
                    city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent 
            }else if(missingDataArr.find(missingData => missingData.includes('web')) && missingDataArr > 2 ){
                    // if(document.querySelectorAll('.Io6YTe.fontBodyMedium')[2] === 'undefined'){
                    //     city = 'La ciudad de este sitio no está disponible'
                    // }else{
                    //     city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent
                    // }

                    web = 'Web no disponible'
                    address= document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent 
                    phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent  
                    //city = city
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

            function searchWeb(placeWeb){
                if(placeWeb.includes('no disponible')){
                    return 'web no disponible'                        
                }else{
                    return `<a href="${placeWeb}">Web del place ${placeInfo.name}</a>`
                }                  
            }

            if(missingDataArr.find(missingData => missingData.includes('foto'))|| document.querySelector('.aoRNLd.kn2E5e.NMjTrf.lvtCsd img') === null){
                photo = 'no hay foto'
            }else{
                photo = document.querySelector('.aoRNLd.kn2E5e.NMjTrf.lvtCsd img').currentSrc
            }
            
            let photoFileName = photo.replace('https://lh5.googleusercontent.com/p/','')           
            photoFileName = photoFileName.replace('https://lh3.googleusercontent.com/gps-proxy/','')             
            //let photoNewName = `${placeInfo.name.replace(/\s/ig,'_')}_${acct}`
            const removeAccents = (str) => {
                let noAccents = str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
                return noAccents
            }
            let accentTest = 'holis estación de policía'
            //str.normalize("NFD").replace(/\p{Diacritic}/gu, "")

            let horarioArr =[]
            let horario = document.querySelectorAll('.mWUh3d')
            
            if (horario.length === 0 || document.querySelector('.mWUh3d') === null ){
                horarioArr.push('No se cuenta con horario oficial')
            }else{
                horario.forEach(el => horarioArr.push(el.ariaLabel)) 
            }


            function cleanHorario(horarioArray){

                if (horarioArray.toString().includes('No se cuenta')){

                    return 'No se cuenta con horario oficial'

                } else{                
                    const splitArray = 
                    horarioArray.map(el => { 
                        const cleanEl = el.replace(/,\sCopiar el horario/g,'')
                        const lowerD = cleanEl.replace(/D/g,'d')
                        const noColon = lowerD.replace(/,/g,'')
                        const noChange = noColon.replace(/\sEl horario podría cambiar/,'')
                        const noParenthesis = noChange.replace(/\([^()]+\)/g,'')
                        const noParenthesisAgain = noParenthesis.replace(/\([^()]+\)/g,'')
                        const noDoubleSpace = noParenthesisAgain.replace(/\s\s/,' ')
                        const splitted = noDoubleSpace.split('')
                        // const splitted = noColon.split('')
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
            }

            const cleanHorarioArray = cleanHorario(horarioArr)
            let horarioOrganized = ''

            if (cleanHorarioArray === 'No se cuenta con horario oficial'){
                horarioOrganized = 'No se cuenta con horario oficial'

            }else {
                horarioOrganized = {
                    lunes: cleanHorarioArray.find(el=>el.includes('Lunes')),
                    martes: cleanHorarioArray.find(el => el.includes('Martes')),
                    miercoles: cleanHorarioArray.find(el => el.includes('Miércoles')),
                    jueves: cleanHorarioArray.find(el => el.includes('Jueves')),
                    viernes: cleanHorarioArray.find(el => el.includes('Viernes')),
                    sabado: cleanHorarioArray.find(el => el.includes('Sábado')),
                    domingo: cleanHorarioArray.find(el => el.includes('Domingo')),
                }   

            }

            
            //-------------CANTIDAD_RESEÑAS STARTS --------------//
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
            //-------------CANTIDAD_RESEÑAS ENDS --------------//

        
                
                placeInfo.name = placeName        
                placeInfo.titleCaseName = titleCaseName        
                placeInfo.lowerCaseName = lowerCaseName                
                placeInfo.address= address 
                placeInfo.phone= phone
                placeInfo.web = web
                placeInfo.horario = horarioOrganized
                placeInfo.horarioText = cleanHorarioArray.toString()
                placeInfo.horarioLunes = horarioOrganized.lunes
                placeInfo.horarioMartes = horarioOrganized.martes
                placeInfo.horarioMiercoles = horarioOrganized.miercoles
                placeInfo.horarioJueves = horarioOrganized.jueves
                placeInfo.horarioViernes = horarioOrganized.viernes
                placeInfo.horarioSabado = horarioOrganized.sabado
                placeInfo.horarioDomingo = horarioOrganized.domingo
                placeInfo.cityClean = city.slice(8,)
                placeInfo.searchedCity = corePlace
                placeInfo.searchedState = state
                placeInfo.urlgMaps = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[0].baseURI
                placeInfo.iframeMap = iframeResized
                placeInfo.city= city
                placeInfo.stars =  stars
                placeInfo.cantidadResenas =  cantidadResenas
                placeInfo.opiniones = comments.toString()
                placeInfo.photoOriginalURL = photo
                placeInfo.photoDownloadScript = `wget --no-check-certificate ${photo}`
                //placeInfo.photoFileName = photoFileNameFinal 
                placeInfo.photoFileName = photoFileName
                placeInfo.photoNewName = `${placeInfo.name.replace(/\s/ig,'_')}_${acct}`
                //placeInfo.photoNewName = photoNewName
                placeInfo.photoNewNameNoAccent = removeAccents(placeInfo.photoNewName)
                placeInfo.photoNewFullFileName = `${placeInfo.photoNewNameNoAccent}.jpg`
                placeInfo.photoNewURL = `https://${targetWebsite}/wp-content/uploads/${new Date().getFullYear()}/0${new Date().getMonth()+1}/${placeInfo.photoNewFullFileName}`
                placeInfo.fileNameConversionScript = `ren "${placeInfo.photoFileName}" "${placeInfo.photoNewFullFileName}"`
                placeInfo.slug = slug
                placeInfo.missingData = missingDataArr.toString()          
                return placeInfo
        },typeOfPlace, state, corePlace,acct,targetWebsite,iframeResized, slug)

        acct++
        placesData.push({acct,...placeSpecifics})
        console.log('placeSpecifics',acct, placeSpecifics)
    }
    console.log('placesData:', placesData)
    console.log('Total de placesData:', placesData.length)
    await browser.close()

    const workbook = XLSX.utils.book_new()
    let worksheet = XLSX.utils.json_to_sheet(placesData)
    XLSX.utils.book_append_sheet(workbook,worksheet,sheetName)
    XLSX.writeFile(workbook, fileName)
})()
