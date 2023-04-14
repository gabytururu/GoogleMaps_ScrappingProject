const XLSX = require('xlsx');
const fs = require('fs');
const { table } = require('console');

// -----------download excel to json ----------------------------//

const wbInput = 'viveros_queretaroQRO.xlsx'
const wsInput = 'topFinal_queretaroQRO'
const wbOutput = 'blogPostReady.xlsx'
const csvOutput = 'Canva.csv';

const wb = XLSX.readFile(wbInput)
const ws = wb.Sheets[wsInput]
const jsonResults = XLSX.utils.sheet_to_json(ws)

// console.log('jsonResult:', jsonResults)
// console.log('jsonResult Length:', jsonResults.length)
//console.log(jsonResults[0].searchedCity)


// ------------------------------general functions------------- //

function spinnedText(textOptionsArr){
    let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
    return selectedText
}

// ----------------------------general arrays------------------- //


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
    'Para llegar a este lugar, simplemente ingresa la dirección en una app de navegación o utiliza este enlace al ',
    'Si necesitas ir a este sitio manejando puedes apoyarte poniendo la dirección en un navegador tipo waze o googleMaps o siguiendo directamente este ',
    'Para encontrar este lugar sólo necesitas poner la dirección en una app tipo googleMaps o irte siguiendo este link del ',
    'Para encontrar la dirección manejando, puedes apoyarte poniéndola en una app de navegación o ir directo a este ',
    'Para llegar a este parque puedes poner colocar la dirección en una herramienta de navegación tipo waze o irte por medio de este enlace ',
    'Para encontrar el sitio manejando puedes ingresar la dirección en una app tipo googleMaps o irte a este enlace al ',
    'Con esta dirección y una app de navegación tipo Waze o GoogleMaps es muy sencillo llegar. Pudes hacerlo directo o ayudándote de este link al ',
    'Para llegar a este sitio, simplemente ingresa la dirección en una app de navegación o síguete este enlace al ',
    'Para llegar al centro manejando puedes poner la dirección en un navegador digital (ej. waze o googleMaps), o irte usando este enlace directo al ',
    'Si necesitas llegar a este destino, basta con que ingreses la dirección en una app de navegación o sigas este ',
    'Utiliza la dirección en una herramienta de navegación para llegar directamente, o sigue este enlace al ',
    'Para encontrar el lugar, símplemente apóyate de una app de navegación (ej. GoogleMaps) ingresando esta dirección, o utiliza este enlace al ',
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

//----------------- Blog post construction loop ------------//

let postVariablesArray =[]
let coreContentArray =[]
let photoScripts =[]
let canvaScripts = []
let tableOfContent =[]

for (let place of jsonResults){  

    let postVariables = {
        rank: place.rank,
        titleCaseName: place.titleCaseName,
        name: place.name,
        cantidadResenas: place.cantidadResenas,
        stars: place.stars,
        state: place.searchedState,
        address: place.address,
        phone: place.phone,
        web: place.web,
        horario: place.horarioText,
        lunes: place.horarioLunes,
        martes: place.horarioMartes,
        miercoles: place.horarioMiercoles,
        jueves: place.horarioJueves,
        viernes: place.horarioViernes,
        sabado: place.horarioSabado,
        domingo: place.horarioDomingo,      
        urlgMaps: place.urlgMaps,
        iframe: place.iframeMap,
        originalPhoto: place.photoOriginalURL,
        photoDownloadScript: place.photoDownloadScript,       
        photoFileName: place.photoFileName,
        photoNewName: place.photoNewName,
        photoNewNameNoAccent:place.photoNewNameNoAccent,
        photoNewFullFileName: place.photoNewFullFileName,
        canvaRenameScript: `ren "${place.rank}.jpg" "${place.photoNewFullFileName}"`,
        photoNewURL: place.photoNewURL,
        fileNameConversionScript: place.fileNameConversionScript,
        slug: place.slug,  
        // h2Intro: h2Intros[h2IntroIndexArr_NoRepetition(h2Intros)],
        h2Intro: 'insert ChatGPT',
        postNote: `Nota: Los horarios y contactos de los viveros incluidos en esta lista fueron tomados de sus sitios y publicidad oficial. Si existe algún error ¡por favor no dudes en contactarnos! para hacer las correcciones pertinentes`
    }

    function createNodeId(str){
        let placeName = str.toLowerCase()
        let noAccents = placeName.normalize("NFD").replace(/\p{Diacritic}/gu,"")
        let dashedName = noAccents.replace(/\s/ig,"-")
        let cleanFinalId = dashedName.replace('""','').replace('(','').replace(')','')
        return cleanFinalId
    }

    let rankListObject = {
        rank: postVariables.rank,
        name: postVariables.name,
        introP: '',
        postNote: `
            <p class="has-ast-global-color-1-background-color has-background;font-size:15px">
                ${postVariables.postNote}
            </p>
        `,
        separator: `
            <hr class="wp-block-separator has-text-color has-ast-global-color-3-color has-alpha-channel-opacity has-ast-global-color-3-background-color has-background is-style-wide" style="margin-top:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50)"/>
        `,
        postContent:`
            <h2 class="wp-block-heading has-ast-global-color-4-color has-ast-global-color-3-background-color has-text-color has-background" id="${createNodeId(postVariables.titleCaseName)}" style="padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px"><b>${postVariables.titleCaseName}</b></h2>
            <div class="wp-block-columns" style="padding:0px;">
                <div class="wp-block-column" style="margin:10px">
                    ${postVariables.iframe}
                </div>
                <div class="wp-block-column" style="margin:10px"> 
                    \n                   
                    <h3 style="font-size:20px">Teléfono ${postVariables.titleCaseName}:</h3>
                 

                    <p>${postVariables.phone.toString().includes('No cuenta')?
                    'Este vivero no cuenta con un teléfono oficial de contacto'
                :
                    `El teléfono oficial de este vivero es ${postVariables.phone}`
                    }</p>
                    <h3 style="font-size:20px">Web/RRSS ${postVariables.titleCaseName}:</h3>
                    <p>${postVariables.web.toString().includes('no disponible')?
                        'Este vivero no cuenta con web oficial disponible'
                    :
                        `<a href="${postVariables.web}">Web de ${postVariables.titleCaseName}</a>`
                    }</p> 
                    <h3 style="font-size:20px">Dirección ${postVariables.titleCaseName}:</h3>
                    <p>La dirección oficial de este vivero es ${postVariables.address}</p>             
                </div>
            </div>
                <p>${spinnedText(comoLlegarArr)}<a href='${postVariables.urlgMaps}'>Mapa del Vivero ${postVariables.titleCaseName}</a></p>  
                <h3>¿En qué horarios está abierto ${postVariables.titleCaseName}?</h3>  
                ${postVariables.horario === 'No se cuenta con horario oficial' ? 
                    `<p>Lamentablemente este vivero no cuenta con horarios publicados oficialmente, posiblemente se deba a que hay variaciones frecuentes o temporales en sus horarios de operación.</p> \n\n <p>En estos casos, lo más recomendable es que cerca de tu fecha de visita, eches un ojo a sus sitios oficiales o los llames directamente (por tel, whatsapp o FB) para constatar horarios vigentes.</p>`
                :
                    `<p>Los horarios oficiales encontrados en las referencias oficiales de ${postVariables.titleCaseName} son los siguientes:</p>                       
                    <ul>
                        <li>${postVariables.lunes}</li>
                        <li>${postVariables.martes}</li>
                        <li>${postVariables.miercoles}</li>
                        <li>${postVariables.jueves}</li>
                        <li>${postVariables.viernes}</li>
                        <li>${postVariables.sabado}</li>
                        <li>${postVariables.domingo}</li>
                    </ul>
                    <p>${spinnedText(aclaracionHorariosArr)}</p>`                                           
                }
                <h3>Calificación promedio de ${postVariables.titleCaseName}</h3>
                <p>Los clientes y visitantes anteriores le han dado a ${postVariables.titleCaseName}  un promedio de ${postVariables.stars} estrellas (de 5 en total). Esta calificación fué obtenida a partir de analizar aproximadamente ${postVariables.cantidadResenas} reseñas públicas encontradas.</p>  
                <hr class="wp-block-separator has-text-color has-ast-global-color-3-color has-alpha-channel-opacity has-ast-global-color-3-background-color has-background is-style-dots" style="margin-top:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50)"/>                 
        `,
    }

    let photoScriptsObj = {
        photoDownloadScript:postVariables.photoDownloadScript,
        photoChangeNameScript: postVariables.fileNameConversionScript,
        canvaRenameScript: postVariables.canvaRenameScript,
    }

    let canvaScriptsObj = {
        placeName: postVariables.titleCaseName,
        state: postVariables.state,
        image: postVariables.photoNewFullFileName,
    }
    
    postVariablesArray.push(postVariables)
    coreContentArray.push(rankListObject)
    photoScripts.push(photoScriptsObj)
    canvaScripts.push(canvaScriptsObj)
    tableOfContent.push(place.titleCaseName)
}

//----------------- Table of contents construction ------------//
let newTOC=[]
tableOfContent.forEach(name =>{
    let stringifiedName = name.toLowerCase()       
    let noAccents = stringifiedName.normalize("NFD").replace(/\p{Diacritic}/gu,"")
    let dashedName = noAccents.replace(/\s/ig,"-")
    let noQuotation = dashedName.replace('""','')
    let noParenthesisOpen = noQuotation.replace('(','')
    let noParenthesisClose = noParenthesisOpen.replace(')','')
    let finalInterlinkingId = noParenthesisClose.replace(/\n/ig,'')
    let htmlEl = `<li><a href='#${finalInterlinkingId}'>${name}</a></li>`
    let htmlElClean = htmlEl.trim()      
    newTOC.push(htmlElClean)       
})

//----------------- final post production ------------//
let finalPost = [{
    place: jsonResults[0].searchedCity,
    type: 'Viveros',
    title: `Viveros en ${jsonResults[0].searchedCity}: Los Mejores Viveros en ${jsonResults[0].searchedCity} ${jsonResults[0].searchedState}y alrededores.`,
    postIntro: `¡Hola y Bienvenid@ a esta Tierra de Plantas!. Si eres alguien amante de las plantas, estás buscando un buen vivero y vives en ${jsonResults[0].searchedCity}, ¡llegaste al lugar indicado!.\n\n
    En este artículo te presentaremos los mejores viveros en ${jsonResults[0].searchedCity}, para que puedas encontrar todo lo que necesitas para tu jardín o huerto. Además, te daremos detalles sobre la ubicación y vías de contacto de cada sitio, así como la calificación promedio que los clientes le han dado a cada uno. Así que prepárate para conocer los mejores viveros de esta ciudad y encontrar todo lo que necesitas para hacer crecer tus plantas con éxito. ¡Comencemos! `,
    tableOfContent: `<h2>Los Mejores viveros de ${jsonResults[0].searchedCity}</h2><ul>${newTOC.join(' ').toString()}</ul>`,
    slug: jsonResults[0].slug,   
    postNote: coreContentArray[0].postNote,
    placeRank1: coreContentArray[0].postContent,
    placeRank2: coreContentArray[1].postContent,
    placeRank3: coreContentArray[2].postContent,
    placeRank4: coreContentArray[3].postContent,
    placeRank5: coreContentArray[4].postContent,
    placeRank6: coreContentArray[5].postContent,
    placeRank7: coreContentArray[6].postContent,
    placeRank8: coreContentArray[7].postContent,
    placeRank9: coreContentArray[8].postContent,
    placeRank10: coreContentArray[9].postContent,
    placeRank11: coreContentArray[10].postContent,
    placeRank12: coreContentArray[11].postContent,
    placeRank13: coreContentArray[12].postContent,
    placeRank14: coreContentArray[13].postContent,
    // placeRank15: coreContentArray[14].postContent,
    // placeRank16: coreContentArray[15].postContent,
    // placeRank17: coreContentArray[16].postContent,
    // placeRank18: coreContentArray[17].postContent,
    // placeRank19: coreContentArray[18].postContent,
    // placeRank20: coreContentArray[19].postContent,
    // placeRank21: coreContentArray[20].postContent,
    // placeRank22: coreContentArray[21].postContent,
    // placeRank23: coreContentArray[22].postContent,
    //placeRank24: coreContentArray[23].postContent,
    outro:`
    <h2 class="wp-block-heading has-ast-global-color-3-color has-text-color" id="mas-informacion-de-viveros-en-mexico">Más información de Viveros En México</h2>
        <p>Esperamos que esta lista de los mejores viveros ${jsonResults[0].searchedCity} te haya sido útil y te ayude a encontrar el mejor sitio para adquirir tus plantas en esta ciudad. Si quieres conocer más viveros de México, no dudes en visitar nuestras listas de los mejores en diferentes ciudades del país. ¡Hasta pronto!</p>
        <p class="has-text-align-center has-ast-global-color-1-background-color has-background"><strong>Otros artículos sobre viveros que podrían interesarte: </strong></p>
        <div class="wp-block-columns">
            <div class="wp-block-column" style="margin:10px;">
                <figure class="wp-block-image size-full"><a href="https://tierradeplantas.com/que-es-un-vivero/"><img src="https://tierradeplantas.com/wp-content/uploads/2023/02/QueesunviveroFEATURED.jpg" alt="qué es un vivero" class="wp-image-672"/></a></figure>
            </div>
            <div class="wp-block-column" style="margin:10px;">
                <figure class="wp-block-image size-full"><a href="https://tierradeplantas.com/viveros/viveros-en-campeche-campeche/"><img src="https://tierradeplantas.com/wp-content/uploads/2023/02/viveros_en_campeche_FEATURED.jpg" alt="viveros en campeche" class="wp-image-773"/></a></figure>
            </div>
            <div class="wp-block-column" style="margin:10px;">
                <figure class="wp-block-image size-full"><a href="https://tierradeplantas.com/viveros/viveros-en-xalapa-veracruz/"><img src="https://tierradeplantas.com/wp-content/uploads/2023/02/viveros_en_xalapa_FEATURED.jpg" alt="viveros en xalapa y coatepec veracruz" class="wp-image-779"/></a></figure>
            </div>    
        <div>
    `,
   
}]

console.log(finalPost)
// console.log(photoScripts)
// console.log(canvaScripts)

//----------------- Excel Files Creation ------------//
const workbook = XLSX.utils.book_new()
let worksheet = XLSX.utils.json_to_sheet(finalPost)
let worksheet2 = XLSX.utils.json_to_sheet(photoScripts) 
let worksheet3 = XLSX.utils.json_to_sheet(canvaScripts) 
XLSX.utils.book_append_sheet(workbook,worksheet,'postContent')
XLSX.utils.book_append_sheet(workbook,worksheet2,'photoScripts')
XLSX.utils.book_append_sheet(workbook,worksheet3,'canvaScripts')
XLSX.writeFile(workbook, wbOutput)

let stream = XLSX.stream.to_csv(worksheet3);
stream.pipe(fs.createWriteStream(csvOutput));
