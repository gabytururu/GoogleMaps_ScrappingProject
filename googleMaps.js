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
    let baseUrl = 'https://www.google.com/maps/search/parques+ecotur%C3%ADsticos+en+oaxaca+OR+centros+ecotur%C3%ADsticos+en+oaxaca+OR+parques+ecol%C3%B3gicos+en+oaxaca/@17.0685414,-96.7203396,11z/data=!4m2!2m1!6e1'
    let totalResults = 120
    let searchTerm = 'parques ecoturísticos en oaxaca OR centros ecoturísticos en oaxaca OR parques ecológicos en oaxaca'
    let typeOfPlace = 'Parque Ecoturístico'
    let corePlace = 'Oaxaca'
    let slug = 'parques-ecoturismo-en-oaxaca'
    let fileName = 'parquesEcoturismoOaxaca.xlsx'
    let targetWebsite = 'rumbonaturaleza.com'
    
   
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
       
        const placeSpecifics = await page.evaluate((typeOfPlace,corePlace,acct,targetWebsite,iframeResized, slug)=>{
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
            let photoFileNameFinal = photoFileName.replace('https://lh3.googleusercontent.com/gps-proxy/','')
          

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

        

            //-------------TEXT_SPINNER STARTS --------------//
                function spinnedText(textOptionsArr){
                    let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
                    return selectedText
                }
                const typeOfPlaceArrTitleCase = [
                    'Parque Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Sitio Ecoturístico', 'Parque Ecológico','Parque Ecoturístico', 'Parque Natural','Parque Ecoturístico', 'Centro de Ecoturismo', 'Parque de Ecoturismo' 
                ]
                const typeOfPlaceArrlowerCase = [
                    'parque ecoturístico', 'centro ecoturístico','parque ecoturístico', 'sitio ecoturístico', 'parque ecológico','parque ecoturístico', 'parque natural','parque ecoturístico', 'centro de ecoturismo', 'parque de ecoturismo' 
                ]

                const typeofPlaceLowerPlural =[
                    'parques ecoturísticos', 'centros ecoturísticos','parques ecoturísticos', 'sitios ecoturísticos', 'parques ecológicos','parques ecoturísticos', 'parques naturales','parques ecoturísticos', 'centros de ecoturismo', 'parques de ecoturismo' 
                ]
                const comoLlegarArr = [
                    'Para llegar, puedes símplemente colocar esta dirección en el googleMaps o Waze o apoyarte en este ',
                    'Para ir a este lugar usar esa dirección en un gps o ayudarte con este ',
                    'Para encontrar esta dirección, puedes usar un navegador como el waze o este ',
                    'Para ir a este sitio, coloca esta dirección en una herramienta de navegación o apóyate con este ',
                    'Para ir a este centro manejando, puedes usar esta dirección oficial con tu google maps o usando este  ',
                    'LLegar al lugar es bastante sencillo. Símplemente coloca la dirección en una app con gps, o apóyate con este ',
                    'Puedes ir a este lugar sin problemas manejando, sólo coloca su dirección oficial en waze, google maps o equivalente, o guíate con este ',
                    'Para ir a este parque, simplemente basta con colocar la dirección en una app de navegación o siguiendo este ',
                    'Podrás llegar manejando sin ningún problema, símplemente usa la dirección en una app como waze o googleMaps, o usa este enlace al ',
                    'Para llegar a este lugar, simplemente ingresa la dirección en una app de navegación o utiliza este enlace al',
                    'Si necesitas ir a este sitio manejando puedes apoyarte poniendo la dirección en un navegador tipo waze o googleMaps o siguiendo directamente este ',
                    'Para ir llegar a este lugar sólo necesitas poner la dirección en una app tipo googleMaps o irte siguiendo este link del ',
                    'Para encontrar la dirección manejando, puedes apoyarte poniéndola en una app de navegación o ir directo a este ',
                    'Para llegar a este parque puedes poner colocar la dirección en una herramienta de navegación tipo waze o irte por medio de este enlace ',
                    'Para encontrar el sitio manejando puedes ingresar la dirección en una app tipo googleMaps o irte a este enlace al ',
                    'Con esta dirección y una app de navegación tipo Waze o GoogleMaps es muy sencillo llegar. Pudes hacerlo directo o ayudándote de este link al ',
                    'Para llegar a este sitio, simplemente ingresa la dirección en una app de navegación o síguete este enlace al',
                    'Para llegar al centro manejando puedes poner la dirección en un navegador digital (ej. waze o googleMaps), o irte usando este enlace directo al ',
                    'Si necesitas llegar a este destino, basta con que ingreses la dirección en una app de navegación o sigas este',
                    'Utiliza la dirección en una herramienta de navegación para llegar directamente, o sigue este enlace al ',
                    'Para encontrar el lugar, símplemente apóyate de una app de navegación (ej. GoogleMaps) ingresando esta dirección, o utiliza este enlace al',
                    '¿Estás lista(o) para lanzarte a este sitio? Entonces pon la dirección en tu app de navegación favorita o síguete por este enlace al ',
                    'Para llegar a este destino, apóyate en un navegador digital o vete directo a googleMaps por medio de este link al ',
                    'Si ya estás con todo listo para irte a este lugar entonces ¡no se diga más!, puedes ir siguiendo directamente la ruta de googleMaps mediante este ',
                    'Para encontrar esta dirección, puedes apoyarte en tu app de navegación favorita o irte directo a la navegación de googleMaps por medio de este ',
                    'Encontrar esta dirección es muy sencillo utilizando una herramienta de navegación como Waze o siguiendo directamente este ',
                    'Puedes llegar a este centro facilmente manejando apoyándote en una aplicación de navegación (ej. maps) o consultando este ',
                    'Para llegar a este parque, simplemente sigue las indicaciones de tu aplicación de navegación preferida o utiliza este link al ',
                    'La verdad es que llegar a este Centro no tiene gran dificultad. Puedes encontrar la dirección de un lugar siguiendo cualquier aplicación de navegación que se te facilite o siguiendo esta liga al ',
                    'Con esta dirección y un googleMaps o waze típico del celular vas a poder llegar sin ningún problema al sitio. Igual para facilitarte el proceso, acá te va una liga al ',
                    'Si ingresas esta dirección en una app de navegación, seguro llegas manejando sin dificultades. Y -en caso de que te sea más fácil- igual acá te compaprtimos una liga directa al ',
                ]
                const aclaracionHorariosArr =[
                    'Aunque estos horarios están oficialmente vigentes, siempre es bueno consultar sus sitios de contacto y redes oficiales antes de visitarlos, por cualquier cambio extraordinario que pudieran tener.',
                    'A pesar de contar con horarios oficiales, te recomendamos siempre visitar sus sitios de contacto y redes oficiales antes de ir al lugar, así podrás identificar cualquier cambio extraordinario que hayan tenido.',
                    'Siempre es importante -aún si cuentas con estos horarios oficiales-, revisar en sus redes sociales y medios de contacto antes de ir. Así podrás asegurarte de que no hayan tenido ningún cambio de horario o logístico de último momento.',
                    'Aunque estos horarios sean oficialmente vigentes, nunca está de más que antes de lanzarte, revises en sus redes sociales o contactos digitales que no haya habido ningún cambio logístico extraordinario en sus horarios de apertura y cierre.',
                    'Aunque cuentes ya con los horarios oficiales de apertura de este lugar, siempre te recomendamos que antes de ir eches un ojito a sus redes sociales y vías de contacto, para asegurarte de que no hayan tenido algún cambio logístico de última hora',
                    'Aunque los horarios oficiales estén disponibles, es recomendable siempre verificar sus sitios de contacto y redes sociales antes de visitar el lugar, por cualquier cambio extraordinario que pudieran haber tenido',
                    'Te sugerimos siempre revisar sus medios de contacto y redes sociales, incluso si cuentas con los horarios oficiales, para asegurarte de que no haya habido cambios inesperados en el horario o en la logística del lugar',
                    'Es importante verificar en sus redes sociales o contactos digitales antes de ir, incluso si ya tienes los horarios oficiales, para evitar cualquier cambio logístico de última hora',
                    'Aunque estos horarios sean oficiales, la verdad que siempre es ideal revisar en sus redes sociales y medios de contacto antes de ir, para asegurarte de que no hayan tenido algún cambio extraordinario de horario o logística',
                    'A pesar de que los horarios estén oficialmente vigentes, siempre está bien mirar en sus sitios de contacto y redes antes de visitarlos, por cualquier cambio extraordinario que pudieran tener, ambios por temporadas vacacionales, festivos, etc.',
                    'Antes de visitar el lugar, es una buena idea verificar sus sitios de contacto digitales y redes sociales, aún si ya cuentas con los horarios oficiales, para evitar cualquier cambio inesperado o sorpresas ya que estés ahí (por ej. cambio por días feriados)',
                    'Te recomendamos  igual siempre revisar sus redes sociales y contactos digitales antes de ir, pues aunque este horario es oficial, pueden haber cambios en fechas especiales, épocas vacacionales y demás',
                    'Aunque los horarios estén oficialmente vigentes, siempre es prudente revisar sus sitios de contacto y redes antes de lanzarte, por cualquier cambio extraordinario que puedan tener',
                    'Es importante verificar sus redes sociales o contactos digitales antes de ir, porque independientemente de estos horarios oficiales, siempre pueden existir cambios de último momento por situaciones extraordinarias de clima, temporada vacacional y demás',
                    'Siempre está bueno que, aunque ya tengas estos horarios oficiales, cheques sus redes sociales y medios de contacto antes de ir, para estar al tanto de cualquier cambio de horario o logística inesperado',
                    'Antes de visitar el lugar, es importante revisar sus sitios digitales y redes sociales, así te aseguras de detectar cualquier cambio que hayan tenido de última hora por cuestiones de fechas especiales, vacaciones, temporadas altas, etc',
                    'A pesar de que los horarios sean oficiales, es buena idea que antes ir, revises siempre cómo están las cosas en sus redes sociales y contactos digitales, esto te permitirá asegurarte de que no haya cambios de horario o logística antes de tu arribo al lugar',
                    'Te sugerimos verificar siempre sus canales digitales y redes sociales antes de ir al parque pues incluso si cuentas con los horarios oficiales, pudiera haber cambios especiales por feriados, vacaciones o situaciones inesperadas',
                    'Aunque los horarios estén oficialmente vigentes, es bueno que cheques en sus redes y canales digitales el estátus del centro o parque antes de ir. Así te aseguras de que no ha habido cambios especiales o cierres extraordinarios por feriados o holidays especiales',
                    'Es importante revisar en sus redes sociales o contactos digitales antes de ir, incluso si ya tienes los horarios oficiales, para evitar cualquier cambio logístico o de horario de última hora',     
                ]



               
                

            
                //-------------TEXT_SPINNER ENDS---------------//
              
                
                placeInfo.name = placeName        
                placeInfo.titleCaseName = titleCaseName        
                placeInfo.lowerCaseName = lowerCaseName                
                placeInfo.address= address 
                placeInfo.phone= phone
                placeInfo.web = web
                // placeInfo.horario = horarioOrganized.toString().includes('No se cuenta')? horarioOrganized.toString(): `${horarioOrganized.lunes},${horarioOrganized.martes},${horarioOrganized.miercoles},${horarioOrganized.jueves},${horarioOrganized.viernes},${horarioOrganized.sabado},${horarioOrganized.domingo},`
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
                placeInfo.state = corePlace
                placeInfo.urlgMaps = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[0].baseURI
                placeInfo.iframeMap = iframeResized
                placeInfo.city= city
                placeInfo.stars =  stars
                placeInfo.cantidadResenas =  cantidadResenas
                placeInfo.opiniones = comments.toString()
                placeInfo.photoOriginalURL = photo
                placeInfo.photoDownloadScript = `wget --no-check-certificate ${photo}`
                placeInfo.photoFileName = photoFileNameFinal ///wtf pq se repite?
                placeInfo.photoNewName = `${placeInfo.name.replace(/\s/ig,'_')}_${acct}`
                placeInfo.photoNewFullFileName = `${placeInfo.photoNewName}.jpg`
                placeInfo.photoNewURL = `https://${targetWebsite}/wp-content/uploads/${new Date().getFullYear()}/0${new Date().getMonth()+1}/${placeInfo.photoNewName}.jpg`
                placeInfo.fileNameConversionScript = `ren "${placeInfo.photoFileName}" "${placeInfo.photoNewName}.jpg"`
                placeInfo.slug = slug
                placeInfo.missingData = missingDataArr.toString()  
                // placeInfo.articleIntro = `
                //     <p> ¿Estás buscando los mejores parques ecoturísticos en ${placeInfo.state}? Entonces sin duda ¡estás en el lugar correcto!. Hoy en este artículo vamos a presentarte cuáles son los  ${spinnedText(typeofPlaceLowerPlural)} que han sido mejor evaluados en este estado. \n Para poder definir esta listade los mejores, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso algunas entrevistas que nos permitieron determinar cuáles son y dónde se ubican los ${spinnedText(typeofPlaceLowerPlural)} que mejores experiencias han brindado a sus visitantes, y que mayor calificación han recibido en ${placeInfo.state} durante los últimos años. \n Con esta prueba social como respaldo, hoy te compartimos la lista de los ${spinnedText(typeOfPlaceArrlowerCase)} mejor calificados en ${placeInfo.state} en ${new Date().getFullYear} junto con su ubicación, medios oficiales de contacto, horarios y cómo llegar hasta ellos; así como la calificación promedio con la que cuenta cada lugar. \n Prepárate con esto y ¡a disfrutar del ecoturismo en ${placeInfo.state}!</p>                    
                //     `
                // placeInfo.structuredData = `
                //     <h2><b>${spinnedText(typeOfPlaceArrTitleCase)} ${placeInfo.titleCaseName}</b></h2>
                //         <img src="${placeInfo.photoNewURL}" alt="${placeInfo.name}">   
                //         <div>${placeInfo.iframeMap}</div>
                //         <div></div>
                //         <p>${spinnedText(placeIntroArr)}</p>
                //         <h3><b>¿Cómo llegar al ${spinnedText(typeOfPlaceArrTitleCase)} "${placeInfo.titleCaseName}"? </b></h3>
                //             <p>Este ${spinnedText(typeOfPlaceArrlowerCase)} se ubica en ${placeInfo.address}\n ${spinnedText(comoLlegarArr)}<a href='${placeInfo.urlgMaps}'>Mapa del ${spinnedText(typeOfPlaceArrTitleCase)} ${placeInfo.titleCaseName}</a></p>
                //         <h3><b>¿Cuáles son los contactos del ${spinnedText(typeOfPlaceArrlowerCase)} ${placeInfo.titleCaseName}?</b></h3>
                //             <p>Los contactos disponibles del ${spinnedText(typeOfPlaceArrTitleCase)} ${placeInfo.titleCaseName} son: </p>
                //             <ul>
                //                 <li><b>Teléfono:</b>${placeInfo.phone}</li>
                //                 <li><b>SitioWeb:</b>${searchWeb(placeInfo.web)}</li>                                
                //             </ul>
                //         <h3><b>¿En qué horarios y días se puede visitar el ${spinnedText(typeOfPlaceArrlowerCase)} ${placeInfo.titleCaseName}?</b></h3>
                //         ${placeInfo.horario === 'No se cuenta con horario oficial' ? 
                //             `<p> Lamentablemente este sitio no cuenta con horarios publicados oficialmente, posiblemente debido a que existen variaciones frecuentes en sus horarios de operación. \n Por este motivo, te recomendamos consultar sus sitios oficiales en una fecha cercana a tu visita o contactarlos directamente para pedir la actualización más reciente de sus días y horas de operación.`
                //         :
                //             `<p>Los horarios oficiales del ${spinnedText(typeOfPlaceArrlowerCase)} ${placeInfo.titleCaseName} son los siguientes:</p>                       
                //             <ul>
                //                 <li>${placeInfo.horario.lunes}</li>
                //                 <li>${placeInfo.horario.martes}</li>
                //                 <li>${placeInfo.horario.miercoles}</li>
                //                 <li>${placeInfo.horario.jueves}</li>
                //                 <li>${placeInfo.horario.viernes}</li>
                //                 <li>${placeInfo.horario.sabado}</li>
                //                 <li>${placeInfo.horario.domingo}</li>
                //             </ul>
                //             <p>${spinnedText(aclaracionHorariosArr)}</p>`                                           
                //         }`           
                // placeInfo.photoLocal =`
                //     <img src="${placeInfo.photoNewURL}" alt="${placeInfo.name}">                
                // `               
                return placeInfo
        },typeOfPlace, corePlace,acct,targetWebsite,iframeResized, slug)

        acct++
        placesData.push({acct,...placeSpecifics})
        //console.log('placeSpecifics',acct, placeSpecifics)
    }
    console.log('placesData:', placesData)
    console.log('Total de placesData:', placesData.length)
    await browser.close()

    const workbook = XLSX.utils.book_new()
    let worksheet = XLSX.utils.json_to_sheet(placesData)
    XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
    XLSX.writeFile(workbook, fileName)
})()
//}
// scrapping()