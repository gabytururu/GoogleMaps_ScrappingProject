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

            const horarioOrganized = {
                lunes: cleanHorarioArray.find(el=>el.includes('Lunes')),
                martes: cleanHorarioArray.find(el => el.includes('Martes')),
                miercoles: cleanHorarioArray.find(el => el.includes('Miércoles')),
                jueves: cleanHorarioArray.find(el => el.includes('Jueves')),
                viernes: cleanHorarioArray.find(el => el.includes('Viernes')),
                sabado: cleanHorarioArray.find(el => el.includes('Sábado')),
                domingo: cleanHorarioArray.find(el => el.includes('Domingo')),
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
                const typeOfPlaceArr = [
                    'Parque Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Sitio Ecoturístico', 'Parque Ecológico','Parque Ecoturístico', 'Parque Natural','Parque Ecoturístico', 'Centro de Ecoturismo', 'Parque de Ecoturismo' 
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
                ]
                const aclaracionHorariosArr =[
                    'Aunque estos horarios están oficialmente vigentes, siempre es bueno consultar sus sitios de contacto y redes oficiales antes de visitarlos, por cualquier cambio extraordinario que pudieran tener.',
                    'A pesar de contar con horarios oficiales, te recomendamos siempre visitar sus sitios de contacto y redes oficiales antes de ir al lugar, así podrás identificar cualquier cambio extraordinario que hayan tenido.',
                    'Siempre es importante -aún si cuentas con estos horarios oficiales-, revisar en sus redes sociales y medios de contacto antes de ir. Así podrás asegurarte de que no hayan tenido ningún cambio de horario o logístico de último momento.',
                    'Aunque estos horarios sean oficialmente vigentes, nunca está de más que antes de lanzarte, revises en sus redes sociales o contactos digitales que no haya habido ningún cambio logístico extraordinario en sus horarios de apertura y cierre.',
                    'Aunque cuentes ya con los horarios oficiales de apertura de este lugar, siempre te recomendamos que antes de ir eches un ojito a sus redes sociales y vías de contacto, para asegurarte de que no hayan tenido algún cambio logístico de última hora',
                ]
                const placeIntroArr = [
                    `Este ${typeOfPlace} tiene ${stars} de calificación promedio, a partir de las más de ${cantidadResenas} opiniones de sus visitantes... ¿nada mal no?. Es por eso que es parte de esta lista de los ${typeOfPlace} mejor calificados de ${corePlace}. Con este respaldo estamos más que seguras(os) que se trata  de un sitio que vas a disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el ${typeOfPlace} ${viveroInfo.name}en ${corePlace}, es sin duda una gran opción`,
                    `Bueno pues si eres de quienes ama estar en contacto con la naturaleza y andas por ${corePlace}, entonces no puedes perderte la experiencia de visitar el ${typeOfPlace} ${viveroInfo.name}. Con una calificación promedio de ${stars} estrellas de más de ${comments} visitantes, no tenemos duda de que se trata de un favorito de esta región. Así que nada...prepárate para sumergirte y disfrutar a tope de los paisajes naturales de ${corePlace}`,
                    `El ${typeOfPlace} ${viveroInfo.name} es una opción fantástica para tener una aventura natural en ${corePlace}. Su calificación promedio es de ${stars} respaldada por más de ${cantidadResenas}visitantes, así que no tenemos duda de que este lugar pertenece a la lista de los ${typeOfPlace} mejor rankeados de ${corePlace} y que se trata de uno de los principales atractivos naturales en la región. Así que ya sabes... ¿ganas de naturaleza?... pues el ${typeOfPlace} ${viveroInfo.name} es una grandísima opción.`,
                ]
            //-------------TEXT_SPINNER ENDS---------------//


           
                viveroInfo.name = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[1].textContent 
                viveroInfo.address= address 
                viveroInfo.phone= phone
                viveroInfo.web = web
                // viveroInfo.horario = horarioArr.toString().replace('Copiar el horario','')
                //viveroInfo.horario = horarioArr
                // viveroInfo.horario = cleanHorarioArray
                viveroInfo.horario = horarioOrganized
                viveroInfo.cityClean = city.slice(8,)
                viveroInfo.urlgMaps = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[0].baseURI
                viveroInfo.city= city
                viveroInfo.stars =  stars
                viveroInfo.CantidadResenas =  cantidadResenas
                viveroInfo.opiniones = comments.toString()
                viveroInfo.structuredData = `
                    <p> ¿Estás buscando los mejores Parques Ecoturísticos en ${corePlace}? ¡Estás en el lugar correcto! Pues en este artículo vamos a presentarte cuáles son los  ${spinnedText(typeOfPlaceArr)} que han sido mejor evaluados en este estado. \n Para esto, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso entrevistas para poder determinar cuáles son los  ${spinnedText(typeOfPlaceArr)} que mejor calificación han recibido en ${corePlace} durante los últimos años. \n Con esta prueba social como respaldo, hoy te daremos los ${spinnedText(typeOfPlaceArr)} mejor calificados y te compartiremos su ubicación, medios oficiales de contacto, horarios y cómo llegar hasta ellos, junto con la calificación promedio con la que cuenta cada lugar. \n Así que prepárate y ¡a disfrutar del ecoturismo en ${corePlace}!</p>
                    <h2><b>${typeOfPlace} ${viveroInfo.name}</b></h2>
                      <p>${spinnedText(placeIntroArr)}</p>
                    <h3><b>¿Cómo llegar al ${spinnedText(typeOfPlaceArr)} ${viveroInfo.name}? </b></h3>
                        <p>El ${spinnedText(typeOfPlaceArr)} se ubica en${viveroInfo.address}. ${spinnedText(comoLlegarArr)}<a href='${viveroInfo.urlgMaps}'>Mapa del ${typeOfPlace} ${viveroInfo.name}</a></p>
                    <h3><b>¿Cuáles son los contactos del ${spinnedText(typeOfPlaceArr)} ${viveroInfo.name}?</b></h3>
                        <p>Los contactos disponibles del ${spinnedText(typeOfPlaceArr)} ${viveroInfo.name} son: </p>
                        <ul>
                            <li><b>Teléfono:</b>${viveroInfo.phone}</li>
                            <li><b>SitioWeb:</b>${searchWeb(viveroInfo.web)}</li>
                        </ul>
                    <h3><b>¿En qué horarios y días se puede visitar el ${spinnedText(typeOfPlaceArr)} ${viveroInfo.name}?</b></h3>
                        <p>Los horarios oficiales del ${spinnedText(typeOfPlaceArr)} ${viveroInfo.name} son los siguientes:</p>
                            <ul>
                                <li>${viveroInfo.horario.lunes}</li>
                                <li>${viveroInfo.horario.martes}</li>
                                <li>${viveroInfo.horario.miercoles}</li>
                                <li>${viveroInfo.horario.jueves}</li>
                                <li>${viveroInfo.horario.viernes}</li>
                                <li>${viveroInfo.horario.sabado}</li>
                                <li>${viveroInfo.horario.domingo}</li>
                            </ul>
                        <p>${spinnedText(aclaracionHorariosArr)}</p>
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