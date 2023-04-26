const XLSX = require('xlsx');
const fs = require('fs');
const puppeteer = require('puppeteer');
//const { domainToASCII } = require('url');

 // -----------download excel to json ----------------------------//

 const wbInput = 'parquesEcoturismoJaliscoB.xlsx'
 const wsInput = 'topFinal_JAL'
 const wbOutput = 'blogPostReady.xlsx'
 const csvOutput = 'Canva.csv';

 const wb = XLSX.readFile(wbInput)
 const ws = wb.Sheets[wsInput]
 const jsonResults = XLSX.utils.sheet_to_json(ws)

 //console.log('jsonResult:', jsonResults)
 // console.log('jsonResult Length:', jsonResults.length)
 // console.log(jsonResults[0].titleCaseName)
 // console.log(jsonResults[0].urlgMaps)

 // --------declaring general variables --------------//

 let postVariablesArray =[]
 let coreContentArray =[]
 let photoScripts =[]
 let canvaScripts = []
 let tableOfContent =[]    

// // --------------------declaring general functions------------- //

function spinnedText(textOptionsArr){
    let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
    return selectedText
}

function h1IntroIndex_RepetitionOk(h1Intros){
    let randomIndex = Math.floor(Math.random() * h1Intros.length)
    return randomIndex
}

let h2IntrosArr = []
function h2IntroIndexArr_NoRepetition(h2Intros){
    let randomIndex = Math.floor(Math.random() * h2Intros.length)
    do{
        randomIndex = Math.floor(Math.random() * h2Intros.length)
    }while(h2IntrosArr.includes(randomIndex))

    h2IntrosArr.push(randomIndex)
    return randomIndex  
}

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

function cleanPhotoName(str){  
    let noAccents = str.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/,/ig,'').replaceAll('.','').replace('-','').replace(/\s\s/ig,' ').replace(/"/ig,'')
    let cleanPhotoName = str.replace(/,/ig,'').replace('(','').replace(')','').replace('"','')

    return cleanPhotoName
}

// let photoNameTest = 'Bosque_de_Arce,_Bosque_de_Maple_92'
// noCommas(photoNameTest)


// -------general arrays to be used w textSpinner - BlogPost Content----- //

    const typeOfPlaceArrTitleCase = [
        'Parque Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Sitio Ecoturístico', 'Centro Ecoturístico','Parque Ecoturístico', 'Parque Natural','Parque Ecoturístico', 'Centro de Ecoturismo', 'Parque de Ecoturismo', 'Centro Ecoturístico', 'Parque de Ecoturismo'
    ]
    const typeOfPlaceArrlowerCase = [
        'parque ecoturístico', 'centro ecoturístico','parque ecoturístico', 'sitio ecoturístico', 'parque ecológico','parque ecoturístico', 'centro ecoturístico', 'parque ecoturístico', 'centro ecoturístico', 'parque natural','parque ecoturístico', 'centro de ecoturismo', 'parque de ecoturismo', 'centro ecoturístico', 'parque ecoturístico' 
    ]
    const typeofPlaceLowerPlural =[
        'parques ecoturísticos', 'centros ecoturísticos','parques ecoturísticos', 'sitios ecoturísticos', 'parques ecológicos','parques ecoturísticos', 'centros ecoturísticos', 'parques naturales','parques ecoturísticos', 'centros de ecoturismo', 'parques de ecoturismo', 'centros ecoturísticos', 'parques ecoturísticos' 
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
        'Para llegar a este lugar, simplemente ingresa la dirección en una app de navegación o utiliza este enlace al ',
        'Si necesitas ir a este sitio manejando puedes apoyarte poniendo la dirección en un navegador tipo waze o googleMaps o siguiendo directamente este ',
        'Para ir llegar a este lugar sólo necesitas poner la dirección en una app tipo googleMaps o irte siguiendo este link del ',
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
    let h1Intros = []

    let h2Intros = []


// ----------------- Blog post construction loop ------------//
 
    for (let place of jsonResults){
    
        h2Intros = [
            `Este ${spinnedText(typeOfPlaceArrlowerCase)} tiene  ${place.stars} estrellas de calificación promedio, a partir de las más de ${place.cantidadResenas} opiniones de sus visitantes... ¿nada mal no?. Es por esto que ${place.titleCaseName} es parte de esta lista de los ${spinnedText(typeofPlaceLowerPlural)} mejor calificados de ${place.state}. Con este respaldo estamos más que seguras(os) que se trata  de un sitio que vas a disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} en ${place.state} es sin duda una gran opción.`,
            `Con una calificación promedio de ${place.stars} estrellas y más de ${place.cantidadResenas} opiniones positivas, ¡ ${place.titleCaseName} en ${place.state} es otra de las alternativas infaltables esta lista de mejores ${spinnedText(typeofPlaceLowerPlural)}!. Si lo tuyo son entornos naturales, no tenemos duda de que este parque te permitirá disfrutar al máximo tu experiencia. Así que no dudes - ${place.titleCaseName} será una excelente elección para hacer ecoturismo en esta región.`,
            `Otra gran opción para tí, si te gusta estar en contacto con la naturaleza y estás buscando lugares para hacer ecoturismo en ${place.state}, es sin duda ${place.titleCaseName}!. Con un promedio de ${place.stars} estrellas evaluadas por al menos ${place.cantidadResenas} visitantes, este ${spinnedText(typeOfPlaceArrlowerCase)} es uno de los favoritos de acá. Así que si ya estás lista(o), prepárate para sumergirte en los paisajes naturales e inolvidables de${place.state} y ¡aventúrate a conocer ${place.titleCaseName}!.`,
            `Siguiendo con esta lista, ahora pasamos a ${place.titleCaseName}. Y es que si eres de quienes ama estar en contacto con la naturaleza y andas por ${place.state}, entonces tienes que considerar la experiencia de visitar el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Con una calificación promedio de ${place.stars} estrellas a partir de reviews de más de ${place.cantidadResenas} presonas, no tenemos duda de es también una gran opcíon. Así que toma nota de todos sus datos y prográmate para sumergirte en los paisajes naturales de ${place.state} y vive el ecoturismo que te ofrece ${place.titleCaseName}.`,
            `El ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} es también parte de esta lista, pues se trata de opción fantástica para tener una aventura natural en ${place.state}. Su calificación promedio es de ${place.stars} estrellas, a partir de la opinión respaldada por más de ${place.cantidadResenas} visitantes. Por ello, no tenemos duda de que este sitio debe pertenecer a la lista de los ${spinnedText(typeofPlaceLowerPlural)} mejor rankeados de  ${place.state}, pues se trata de uno de los atractivos naturales más bonitos en la región. Así que ya sabes... ¿ganas de naturaleza?... pues apúnta todos los datos siguientes, porque el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} es una grandísima opción.`,
            `El ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} es nuestra siguiente recomendación. Una de las opciones inmejorables para vivir la naturaleza en ${place.state}. Con ${place.stars} estrellas y el aval de al menos ${place.cantidadResenas} visitantes con opiniones positivas, este ${spinnedText(typeOfPlaceArrlowerCase)} se ha posicionado como uno de los mejores de por acá, y es un atractivo natural obligado si lo que buscas es un hacer algo de ecoturismo. Entonces, apúntate también todos sus detalles y ponte en ruta a las ${place.titleCaseName}.`,
            `Si te apasiona la naturaleza y andas en busca de aventuras ¡pues no se diga más! porque sin duda el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} es otra de las alternativas en ${place.state} que no debes dejar pasar. Este ${spinnedText(typeOfPlaceArrlowerCase)} tiene una calificación promedio de ${place.stars} estrellas, gracias a que al menos ${place.cantidadResenas} personas distintas lo han evaluado de este modo... motivo por el que forma parte de este rank de los mejores. Así es que... siendo uno de los ${spinnedText(typeofPlaceLowerPlural)} mejores calificados en ${place.state} ¿qué esperas para visitarlo?`,
            `Otra excente opción si andas buscando naturaleza para descansar y salir de lo cotidiano es el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Acá encontrarás algunos de los paisajes más bonitos y naturales de ${place.state}. Este sitio tiene una calificación promedio de 4.5estrellas, y al menos ${place.cantidadResenas} reseñas de visitantes que ya lo han disfrutado. Por esto, es uno de los más concurridos de este estado. Así que nada... sin excusas y ¡a vivir esta experiencia en la naturaleza! en ${place.titleCaseName}.`,
            `Entendemos que si estás aquí, es porque quieres conocer más opciones para conectarte con la naturaleza y disfrutarla a tope en ${place.state}. Y pues bueno... el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}} puede ser la respuesta que buscabas. Este ${spinnedText(typeOfPlaceArrlowerCase)} ha sido evaluado por más de ${place.cantidadResenas} personas con un promedio de calificación de  ${place.stars} estrellas, haciéndolo uno de los ${spinnedText(typeofPlaceLowerPlural)} más recomendados de ${place.state}. Así que nada.. a pasar del pensamiento a la acción y a poner ${place.titleCaseName} en tu ruta de ecoturismo ¡pero ya!.`,
            `Otro de los sitios naturales más memorables de ${place.state} es sin duda alguna el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Este lugar está respaldado por un montón de visitantes previos y más de ${place.cantidadResenas} evaluaciones promedio que rondan las ${place.stars} estrellas, lo que lo hace un favorito de la región. Es por eso que forma parte de esta lista de los mejores ${spinnedText(typeofPlaceLowerPlural)} de ${place.state}, y es por eso también que nos parece una recomendación imperdible para ti.`,
            `${place.titleCaseName} es nuestra siguiente recomendación. Se trata de uno de los sitios naturales más lindos que ${place.state} tiene para ofrecer. Está respaldado por la aprobación de más de ${place.cantidadResenas} opiniones que en promedio le han otorgado ${place.stars} estrellas, haciéndolo un favorito por acá, y volviéndolo una parada obligada en esta lista de los mejores ${spinnedText(typeOfPlaceArrlowerCase)} de ${place.state}.`,
            `Si andas en búsca de experiencias únicas en la naturaleza, entonces el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} en ${place.state} tiene que ser también parte de tu lista. Este es un ${spinnedText(typeOfPlaceArrlowerCase)} con más de ${place.cantidadResenas} opiniones de visitantes y que ha sido de manera consistente calificado con hasta ${place.stars} estrellas, es por eso que aunque pueda tener algunas áreas de mejora, es uno de los mejores lugares para disfrutar de la naturaleza de este estado. Así que no lo pienses mucho más y ¡a visitar ${place.titleCaseName}!`,
            `El ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} el siguiente en esta lista. Este ${spinnedText(typeOfPlaceArrlowerCase)} es una de las joyas naturales que tiene ${place.state} para los aficionados al ecoturismo y la aventura. Se trata de un lugar evaluado en promedio con ${place.stars} estrellas por al menos ${place.cantidadResenas} personas. No podemos dejar de recomendártelo como un una opción importante para la exploración natural de Tabasco ${place.state}. Así que ya sabes, guárdate toda la información logística que vamos a darte a continuación y anímate a visitar este increíble ${spinnedText(typeOfPlaceArrlowerCase)} cuanto antes.`,
            `Si se trata de explorar la belleza natural de ${place.state}, entonces el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} es lo que llamamos un "must". Este ${spinnedText(typeOfPlaceArrlowerCase)} está recomendado por más de ${place.cantidadResenas} opiniones de visitantes que lo han evaluado hasta con ${place.stars} estrellas. Se trata de uno de los espacios naturales más amenos de la región y una alternativa que no debes dejar de visitar si andas por ${place.state} buscando algo de naturaleza.`,
            `Nuestra siguiente gran opción para quienes disfrutan de los paisajes naturales es el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} en ${place.state}. Con más de ${place.cantidadResenas} opiniones de visitantes y una calificación promedio de ${place.stars} estrellas, este lugar es uno de los más valorados en la región, así que toma nota de sus datos a continuación y programa tu visita ¡pero ya!.`,
            `¿Quieres vivir un paseo increible en contacto con la naturaleza? entonces el siguiente lugar en nuestra lista no te va a defraudar. Y es que si andas de visita o vives en ${place.state}, tienes que considerar una vuelta al ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Con una calificación promedio de ${place.stars} estrellas y más de ${place.cantidadResenas} reviews, este lugar es una de las mejores opciones para los amantes del ecoturismo y la aventura en la naturaleza. ¡Toma nota de todo lo requerido para tu visita con la información a continuación!.`,
            `El siguiente destino en esta lista es ${place.titleCaseName}. Si lo que quieres es encontrar un lugar para conectarte con la naturaleza, el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} será una de tus mejores apuestas. Este sitio forma parte de esta lista de los mejores ${spinnedText(typeofPlaceLowerPlural)} de ${place.state} gracias al respaldo y opiniones de más de ${place.cantidadResenas} visitantes que le han otorgado una calificación de más de ${place.stars} estrellas en promedio. Este lugar es sin duda uno de los mejores para disfrutar del entorno natural y paisajes de ${place.state} y practicar el ecoturismo y la aventura en la región.`,
            `Otra súper opción si estás en ${place.state} en búsqueda de algo de ecoturismo y aventura es el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Hemos decidido incluir este ${spinnedText(typeOfPlaceArrlowerCase)} en esta lista de los mejores de ${place.state} gracias al respaldo y opiniones de más de ${place.cantidadResenas} visitantes que lo han evaluado públicamente por lo menos con ${place.stars} estrellas de calificación, así que a tí no se te puede escapar. Chécate todos lo detalles necesarios para tu visita y dale con todo para levantar el ecoturismo en ${place.state} apoyando y disfrutando ${place.titleCaseName}.`,
            `Nuestra siguiente recomendación es ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Si lo que buscas es conectar con la naturaleza de ${place.state}, entonces -sí o sí- toca visitar este lugar. Este es uno de los ${spinnedText(typeofPlaceLowerPlural)} que resultó mejor evaluados en ${place.state} (con ${place.stars} estrellas y más de ${place.cantidadResenas} opiniones públicas de visitantes), lo que lo hace también un favorito de los amantes del ecoturismo y la aventura natural. Si andas en busqueda justo de eso, entonces revisa los detalles siguientes para tener una visita segura y ¡lánzate al parque ${place.titleCaseName}!`,
            `Ok... ¿Te gusta el ecoturismo y andas en ${place.state} buscando algo de aventura natural no? Entonces agrega ya mismo en tu lista al ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Este es un lugar ideal para encontrarte con la naturaleza y disfrutar de paisajes lindos. Es un ${spinnedText(typeOfPlaceArrlowerCase)} que ha sido evaluado por más de ${place.cantidadResenas} personas y tiene un promedio de ${place.stars} estrellas de calificación. Aunque puede que haya algunos detallitos que es posible mejorar, la realidad es que ${place.titleCaseName} es un paso obligado para explorar la naturaleza de ${place.state} y hacer algo de ecoturismo por acá.`,
            `Vamos con el siguiente de esta lista: ${place.titleCaseName}. Si te apasiona el ecoturismo y estas buscando explorar la naturaleza increíble de ${place.state}, la verdad es que no puedes perderte ${place.titleCaseName}. Este ${spinnedText(typeOfPlaceArrlowerCase)} es el sitio ideal para disfrutar paisajes naturales lindos y desconectarte un poco de la urbe. Más de ${place.cantidadResenas} personas lo han evaluado con un promedio de ${place.stars} estrellas. Aunque hay algunos detallitos que se pueden mejorar, definitivamente es una súper opción si lo que buscas es una experiencia cargada de naturaleza.`, 
            `${place.titleCaseName} es el siguiente de los ${spinnedText(typeofPlaceLowerPlural)} más populares de ${place.state}. Este sitio logró un promedio de calificación de ${place.stars} estrellas de más de ${place.cantidadResenas} visitantes, pues se trata de un lugar perfecto para disfrutar el paisaje y los entornos naturales de ${place.state}. Entonces... anótate toda su información para que puedas visitar el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} cuanto antes.`,
            `${place.titleCaseName} es la siguiente parada obligatoria en esta lista de los mejores ${spinnedText(typeOfPlaceArrlowerCase)} para hacer ecoturismo en ${place.state}. Este parque ha recibido un promedio de ${place.stars} estrellas según los ${place.cantidadResenas} visitantes que lo han evaluado públicamente. Nada mal para esta región. Así que no lo pienses mas, conoce todos los detalles para llegar de manera segura y lánzate a disfrutar de sus espacios naturales y paisajes y ¡a vivir el ecoturismo en ${place.state} a tope`, 
            `${place.titleCaseName} es el siguiente destino ideal para quien busca disfrutar del ecoturismo y la naturaleza en ${place.state}. Este lugar cuenta con un promedio de ${place.stars} estrellas según los ${place.cantidadResenas} visitantes que lo han calificado. En este lugar podrás conocer ${place.state} desde una perspectiva diferente, rodeándote de espacios lindos y de opciones para disfrutar la naturaleza. Revisa todos los detalles a continuación y programa tu visita cuanto antes.`,
            `${place.titleCaseName} es el siguiente en esta lista de ${spinnedText(typeofPlaceLowerPlural)} imperdibles de ${place.state}.Este lugar tiene un promedio de ${place.stars} estrellas de calificación, obtenidas con reviews y opiniones de por lo menos ${place.cantidadResenas} visitantes. Se trata de un lugar re-lindo para disfrutar el paisaje y toda la naturaleza de ${place.state}... Otra gran opción para tu lista de lugares para hacer ecoturismo en esta zona del país. Toma nota y lánzate a ${place.titleCaseName}`,
            `El ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} en ${place.state} es la siguiente opción en nuestra lista. Una rre buena alternativa para hacer ecoturismo por acá. Con una calificación promedio de ${place.stars} derivada de reseñas de más de ${place.cantidadResenas} personas, este lugar es considerado uno de los mejores ${spinnedText(typeOfPlaceArrlowerCase)} de la región. Es por eso que forma parte de esta lista. Entonces ya sabes... si la naturaleza y la aventura te motivan, no puedes dejar de visitar ${place.titleCaseName} y sumergirte en los paisajes naturales de ${place.state}.`,
            `Para una gran experiencia de ecoturismo en ${place.state}, está el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}. Decidimos agregar este sitio a la lista de los mejores ${spinnedText(typeofPlaceLowerPlural)} de este estado, gracias al aval de ${place.stars} estrellas que más de ${place.cantidadResenas} visitantes le han dado. Entonces si te gusta estar rodeado de paisajes lindos, y vegetación nativa, etnonces este sitio es una de las opciones perfectas para tí para ti. Ponlo en tu lista ya mismo y aventúrate a conocer la naturalza de ${place.state} visitando ${place.titleCaseName}.`,
            `Si de atractivos naturales hablamos, entonces ${place.titleCaseName} es uno de los principale de ${place.state}. Este parque ecoturístico es una de las opciones imperdibles para conocer la naturaleza de esta región en todo su esplendor. Este ${spinnedText(typeOfPlaceArrlowerCase)} tiene ${place.stars} estrellas de calificación respaldadas por opiniones de hasta ${place.cantidadResenas} visitantes. Es por eso que forma parte de esta lista como uno de los mejores lugares para hacer ecoturismo por acá, y por ese mismo motivo es uno de los ${spinnedText(typeofPlaceLowerPlural)} que -sí o sí- tienes que visitar.`, 
            `Si mueres de curiosidad y ganas de estar en contacto con la naturaleza, entonces tienes que conocer el parque ecoturístico ${place.titleCaseName} en ${place.state}. Este sitio ha sido evaluado con ${place.stars} estrellas en promedio por más de ${place.cantidadResenas} personas, lo que lo hace una opción fantástica para tener una aventura natural si estás por esta zona del país. No lo dudes más y simplemente toma nota de sus datos y ¡lánzate a conocer sus paisajes y vive el ecoturismo a tope!. `,
            `Si quieres escapar de la rutina y disfrutar de la naturaleza a full, el parque ecoturístico ${place.titleCaseName} -si o sí- es una opción que debe estar en tu lista. Este ${spinnedText(typeOfPlaceArrlowerCase)} ha sido evaluado por más de ${place.cantidadResenas} visitantes, quienes lo han posicionado como uno de los mejores de ${place.state}, (con ${place.stars} estrellas en promedio). Es por eso que hemos decidido hacerlo parte de esta lista de los mejores, y dejártelo en las recomendaciones si lo que buscas es respirar naturaleza al máximo. `,
            `¿Quieres disfrutar de la naturaleza en ${place.state} al máximo? Entonces el parque ecoturístico ${place.titleCaseName} es lo que llamamos un "MUST" o una "parada obligada". Este ${spinnedText(typeOfPlaceArrlowerCase)} tiene una calificación promedio de ${place.stars} estrellas y más de ${place.cantidadResenas} opiniones positivas de quienes lo han visitado anteriormente. Por esas razones ${place.titleCaseName} se ha consolidado como uno de los principales atractivos naturales de ${place.state} y uno de los mejores sitios para hacer ecoturismo en esta región.`,
            `Otro lugar ideal si estás buscando un espacio para conectarte con la naturaleza y disfrutarla a lo más es  ${place.titleCaseName}. Esta es una de las mejores opciones de ${place.state}, con más de ${place.cantidadResenas} opiniones positivas de sus visitantes, quienes lo han calificado en promedio como un sitio de ${place.stars} estrellas. Todo esto lo mantiene como uno de los centros ecoturísticos más concurridos de la región. Entonces ya sabes, si andas por ${place.state}, aprovecha la oportunidad y organízate para visitar ${place.titleCaseName}.`,
        ]

        let postVariables = {
            rank: place.rank,
            titleCaseName: place.titleCaseName,
            name: place.name,
            cantidadResenas: place.cantidadResenas,
            stars: place.stars,
            state: place.state,
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
            googleMapsLink: place.urlgMaps,
            iframe: place.iframeMap,
            originalPhoto: place.photoOriginalURL,
            photoCredit: place.photoCredit,
            photoDownloadScript: place.photoDownloadScript,       
            photoFileName: place.photoFileName,
            photoNewName: place.photoNewName,
            photoNewNameNoAccent:cleanPhotoName(place.photoNewNameNoAccent),
            photoNewFullFileName: cleanPhotoName(place.photoNewFullFileName),
            canvaRenameScript: `ren "${place.rank}.jpg" "${cleanPhotoName(place.photoNewFullFileName)}"`,
            photoNewURL: cleanPhotoName(place.photoNewURL),
            //no funciona pq el file converstion script tmb requiere eso pero sin quitar comillas... asi que pff se debe hacer en googleMaps.js
           // fileNameConversionScript: place.fileNameConversionScript,
            fileNameConversionScript: `ren "${place.photoFileName}" "${cleanPhotoName(place.photoNewFullFileName)}`,
            slug: place.slug,  
            h2Intro: h2Intros[h2IntroIndexArr_NoRepetition(h2Intros)],
            postNote: `OJO: Hemos excluido de esta lista a los desarrollos ecoturísticos exclusivamente recreativos (ej. balnearios) que no cuentan con al menos un componente educativo ambiental o cultural (por ej. la posibilidad de contratar un guía local para conocer más sobre el entorno o sus activos naturales y culturales).`
        }

        // function createhtmlNodeId(str){
        //     let placeName = str.toLowerCase()
        //     let noAccents = placeName.normalize("NFD").replace(/\p{Diacritic}/gu,"")
        //     let dashedName = noAccents.replace(/\s/ig,"-")
        //     let cleanFinalId = dashedName.replace('""','').replace('(','').replace(')','')
        //     return cleanFinalId
        // }

        // // <p>${getPhotoCredit(postVariables.urlgMaps)}
        // let rankListObject = {
        //     rank: postVariables.rank,
        //     name: postVariables.name,
        //     postNote: `
        //     <p class="has-background" style="background-color:#af6bb054;font-size:15px">${postVariables.postNote}</p>
        //     `,
        //     postContent: `
        //         <!-- wp:separator {"className":"is-style-dots"} -->
        //         <hr class="wp-block-separator has-alpha-channel-opacity is-style-dots"/>
        //         <!-- /wp:separator -->
        //         <h2 id="${createhtmlNodeId(postVariables.titleCaseName)}"><b>#${postVariables.rank} ${spinnedText(typeOfPlaceArrTitleCase)} ${postVariables.titleCaseName}</b></h2>
        //         <div>
        //             <div class="wp-block-columns" style="padding:0px; margin-bottom:0px">
        //                 <div class="wp-block-column" style="margin:10px">
        //                     <figure class="wp-block-image"><img src="${postVariables.photoNewURL}" alt="${postVariables.name}"/></figure> 
        //                 </div>
        //                 <div class="wp-block-column" style="margin:10px">                      
        //                    ${postVariables.iframe}
        //                 </div>                        
        //             </div>                    
        //             <figcaption style="text-align:center; font-size:13px; margin-top:-30px;padding-bottom:12px;">${postVariables.photoCredit}</figcaption>
        //         </div>
                   
        //             <p>${postVariables.h2Intro}</p>
        //             <h3><b>¿Cómo llegar al ${spinnedText(typeOfPlaceArrTitleCase)} "${postVariables.titleCaseName}"? </b></h3>
        //                 <p>Este ${spinnedText(typeOfPlaceArrlowerCase)} se ubica en ${postVariables.address}\n\n${spinnedText(comoLlegarArr)}<a href='${postVariables.urlgMaps}'>Mapa del ${spinnedText(typeOfPlaceArrTitleCase)} ${postVariables.titleCaseName}</a></p>
        //             <h3><b>¿Cuáles son los contactos del ${spinnedText(typeOfPlaceArrlowerCase)} ${postVariables.titleCaseName}?</b></h3>
        //                 <p>Los contactos disponibles del ${spinnedText(typeOfPlaceArrTitleCase)} ${postVariables.titleCaseName} son: </p>
        //                 <ul>
        //                     <li><b>Teléfono:</b> ${postVariables.phone.toString().includes('No cuenta')?
        //                         'No se identificó ningún contacto oficial (vigente) para este centro ecoturístico.'
        //                         :
        //                         `El teléfono oficial de este centro ecoturístico es ${postVariables.phone}`}
        //                     </li>                                              
        //                     <li><b>SitioWeb:</b> ${postVariables.web.toString().includes('no disponible')?
        //                         'No se cuenta con web oficial disponible'
        //                         :
        //                         `<a href="${postVariables.web}">Web de ${postVariables.titleCaseName}</a>`
        //                     }</li>                                
        //                 </ul>
        //             <h3><b>¿En qué horarios y días se puede visitar el ${spinnedText(typeOfPlaceArrlowerCase)} ${postVariables.titleCaseName}?</b></h3>
        //                 <div>
        //                 ${postVariables.horario === 'No se cuenta con horario oficial' ? 
        //                     `<p> Lamentablemente este sitio no cuenta con horarios publicados oficialmente, posiblemente se deba a que hay variaciones frecuentes o temporales en sus horarios de operación.</p> \n <p>En estos casos, lo más recomendable es que cerca de tu fecha de visita, eches un ojo a sus sitios oficiales o los llames directamente (por tel, whatsapp o FB proporcionados antes) y consultes horarios vigentes en ese momento.</p>`
        //                 :
        //                     `<p>Los horarios oficiales del ${spinnedText(typeOfPlaceArrlowerCase)} ${postVariables.titleCaseName} son los siguientes:</p>                       
        //                     <ul>
        //                         <li>${postVariables.lunes}</li>
        //                         <li>${postVariables.martes}</li>
        //                         <li>${postVariables.miercoles}</li>
        //                         <li>${postVariables.jueves}</li>
        //                         <li>${postVariables.viernes}</li>
        //                         <li>${postVariables.sabado}</li>
        //                         <li>${postVariables.domingo}</li>
        //                     </ul>
        //                     <p>${spinnedText(aclaracionHorariosArr)}</p>`                                           
        //                 }</div>
        //         `,
        // }

        // let photoScriptsObj = {
        //     photoDownloadScript:postVariables.photoDownloadScript,
        //     photoChangeNameScript: postVariables.fileNameConversionScript,
        //     canvaRenameScript: postVariables.canvaRenameScript,
        // }

        // let canvaScriptsObj = {
        //     placeName: postVariables.titleCaseName,
        //     state: postVariables.state,
        //     image: postVariables.photoNewFullFileName,
        // }
        
        postVariablesArray.push(postVariables)
        // coreContentArray.push(rankListObject)
        // photoScripts.push(photoScriptsObj)
        // canvaScripts.push(canvaScriptsObj)
        // tableOfContent.push(place.titleCaseName)
       
    }

// // ---------------- Creating Article Table of Content (TOC) -----------------------------//

//     let finalTOC=[]
//     tableOfContent.forEach(name =>{
//         let stringifiedName = name.toLowerCase()       
//         let noAccents = stringifiedName.normalize("NFD").replace(/\p{Diacritic}/gu,"")
//         let dashedName = noAccents.replace(/\s/ig,"-")
//         let noQuotation = dashedName.replace('""','')
//         let noParenthesisOpen = noQuotation.replace('(','')
//         let noParenthesisClose = noParenthesisOpen.replace(')','')
//         let finalInterlinkingId = noParenthesisClose.replace(/\n/ig,'')
//         let htmlEl = `<li><a href='#${finalInterlinkingId}'>${name}</a></li>`
//         let htmlElClean = htmlEl.trim()      
//         finalTOC.push(htmlElClean)    
//     })

// //---------------- Final Post Creation ------------------------//

//     h1Intros = [
//         `¿Estás buscando opciones para hacer ecoturismo?, ¡llegaste al lugar correcto!, porque hoy vamos a mostrarte los resultados de nuestra investigación acerca de los mejores parques ecoturísticos en ${jsonResults[0].state}. \n\n Para definir esta lista de ganadores, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso algunas entrevistas directas. Este proceso nos permitió determinar cuáles son y en qué parte de ${jsonResults[0].state} se ubican los ${spinnedText(typeofPlaceLowerPlural)} que mejores experiencias han dado a sus visitantes y con mayor calificación durante los últimos años. \n\n Con todo esto como respaldo, hoy te compartimos la lista de los ganadores de este año junto con su ubicación, calificación promedio del lugar, medios oficiales de contacto, horarios y cómo llegar hasta ellos. \n\n Prepárate con esto y ¡a disfrutar del ecoturismo en ${jsonResults[0].state}!.`,
//         `¿Eres entusiasta del ecoturismo y la naturaleza y andas por el sureste de México? Entonces ¡no te arrepentirás de quedarte por acá!. Pues hoy vamos a compartirte información sobre los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}. \n\n Después de una exhaustiva investigación en varias fuentes, incluyendo redes sociales, rankings y entrevistas directas, hicimos una lista de los ${spinnedText(typeofPlaceLowerPlural)} de ${jsonResults[0].state} que más contentos han dejado a sus visitantes. \n\n Esta lista incluye información como la ubicación, calificación promedio del lugar,  medios oficiales de contacto, horarios y cómo llegar hasta allí.\n\n Así que, prepárate para disfrutar del ecoturismo en ${jsonResults[0].state} con la lista de ganadores de este año. ¡No se diga más!...\n\n`,
//         `¿Estás buscando opciones para hacer ecoturismo?, ¡llegaste al lugar correcto!, porque hoy vamos a mostrarte los resultados de nuestra investigación acerca de los mejores parques ecoturísticos en ${jsonResults[0].state}. \n\n Para definir esta lista de ganadores, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso algunas entrevistas directas. Este proceso nos permitió determinar cuáles son y en qué parte de ${jsonResults[0].state} se ubican los ${spinnedText(typeofPlaceLowerPlural)} que mejores experiencias han dado a sus visitantes y con mayor calificación durante los últimos años. \n\n Con todo esto como respaldo, hoy te compartimos la lista de los ganadores de este año junto con su ubicación, calificación promedio del lugar, medios oficiales de contacto, horarios y cómo llegar hasta ellos. \n\n Prepárate con esto y ¡a disfrutar del ecoturismo en ${jsonResults[0].state}!.`,
//         `¿Eres entusiasta del ecoturismo y la naturaleza y andas por el sureste de México? Entonces ¡no te arrepentirás de quedarte por acá!. Pues hoy vamos a compartirte información sobre los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}. \n\n Después de una exhaustiva investigación en varias fuentes, incluyendo redes sociales, rankings y entrevistas directas, hicimos una lista de los ${spinnedText(typeofPlaceLowerPlural)} de ${jsonResults[0].state} que más contentos han dejado a sus visitantes. \n\n Esta lista incluye información como la ubicación, calificación promedio del lugar,  medios oficiales de contacto, horarios y cómo llegar hasta allí.\n\n Así que, prepárate para disfrutar del ecoturismo en ${jsonResults[0].state} con la lista de ganadores de este año. ¡No se diga más!...\n\n`,
//         `¿Estás en ${jsonResults[0].state} y estás list@ para una aventura de ecoturismo a tope? ¡Pues hoy te tenemos cubierto/a!. Nuestro equipo  ha seleccionado los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state} para que no te falten opciones de naturaleza durante tu estancia por esta región.  \n\n Esta lista fué realizada en función de la satisfacción de sus visitantes previos, y la calidad y tipos de experiencia que ofrece cada lugar. \n\n Además de la lista, te compartiremos también detalles de cómo llegar a este lugar, sus horarios oficiales y vías de contacto. Así que ¡Prepárate para sumergirte en la naturaleza con nuestra lista de los ${spinnedText(typeofPlaceLowerPlural)} más destacados de ${jsonResults[0].state}!`,
//         `¡Hola! ¡Qué emoción tenerte por acá con ganas de practicar algo de ecoturismo!... y es que, si estás buscando las mejores opciones para hacer ecoturismo en ${jsonResults[0].state}, entonces ¡has venido al lugar ideal!. \n\n Hemos investigado a fondo para encontrar los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}, o por lo menos los mejor rankeados por sus visitantes. Desde paisajes increíbles hasta experiencias de aprendizaje en la naturaleza, no te faltará nada.  \n\n Además, para ayudarte a planear un viaje seguro, vamos a compartirte la ubicación, horarios, y medios de contacto de cada uno de estos lugares. Así es que sin más...¡Prepárate para explorar la belleza natural de ${jsonResults[0].state}!`,
//         `¿Estás buscando buenas opciones de ecoturismoy naturaleza?, Pues hoy ¡tenemos muchas respuestas para ti!.\n\n  Nuestro equipo preparó una lista con los ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state} con mayor trayectoria y mejor calificación por parte de sus visitantes.  \n\n En esta lista encontrarás no solo las opciones de lugar sino también los detalles de cómo llegar, sus horarios vigentes y contactos oficiales para planear tu visita de manera exitosa.  \n\n Así que nada... si el ecoturismo es lo tuyo entonces ¡no se diga más! a sumergirte en la lista de los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}  y a disfrutar al máximo la naturaleza de esta región.`,
//         `¿Listo para una aventura de ecoturismo sin igual en ${jsonResults[0].state}? ¡pues aterrizaste en el lugar adecuado!. Hoy te vamos a ayudar a identificar los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}, para que no te queden dudas ni pretextos para no salir a la naturaleza estos días. \n\n Esta lista fué preparada haciendo una clasificación detallada de los ${spinnedText(typeofPlaceLowerPlural)} con mejor calificación en redes sociales, medios digitales y testimonios oficiales de visitantes previos. Además de incluir las calificaciones oficiales que han recibido, incluye también las vías de contacto oficial de cada sitio, horarios vigentes y liga a mapas y detalles logísticos para llegar de manera segura a cada uno de ellos. \n\n Asi es que nada... toma nota y empieza a preparar tu visita, estamos seguras(os) de que luego de echar un ojo a esta lista, vas a querer salir a conocer estos ${spinnedText(typeofPlaceLowerPlural)} ¡desde ya!.`,
//         `Si lo tuyo es el ecoturismo, pues llegaste al lugar ideal... porque ¡también es lo nuestro!, Y por eso hoy preparamos una lista bien detallada de las mejores opciones que existen de ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}, para que no te quedes con ganas de salir a explorar los paisajes increíbles de esta región. Hemos investigado a fondo para identificar cuáles han sido los ${spinnedText(typeofPlaceLowerPlural)} mejor evaluados por sus visitantes anteriores a través de redes sociales, testimonios públicos, directorios de negocios y algunas entrevistas también. Además de esto, vamos a compartirte los datos de cada lugar, horarios vigentes, y enlaces a rutas logísticas para llegar fácilmente. ¡Así que no te quedes con las ganas! toma nota y ¡a disfrutar la naturaleza de ${jsonResults[0].state}!.`,
//         `¡Hola hola! ¡Qué gusto tenerte hoy por acá añorando un poquito de naturaleza!. Y es que si estás buscando lugares naturales increíbles, entonces llegaste al lugar ideal. Hoy vamos a compartirte una lista con varios de los mejores ${spinnedText(typeofPlaceLowerPlural)} en ${jsonResults[0].state}, para que si de naturaleza se trata ¡no te falten opciones!. \n\nEsta lista la preparamos con mucha atención, indagando en medios digitales, redes sociales, testimonios públicos y con incluso algunas entrevistas para determinar cuáles han sido los ${spinnedText(typeofPlaceLowerPlural)} que mejor han sido evaluados en ${jsonResults[0].state}.  \n\nAdemás de compartirte la lista final de ganadores, hemos incluido también sus contactos oficiales, horarios vigentes y medios logísticos (ej. mapas) para que puedas encontrar el lugar fácilmente.  \n\nAsí que nada, sin más demora, toma nota y ¡a disfrutar a tope la naturaleza en ${jsonResults[0].state}!.`,
//     ]

//     let finalPost = [{
//         state: jsonResults[0].state,
//         type: 'Parques Ecoturísticos',
//         title: `Parques Ecoturísticos en ${jsonResults[0].state}: 15 Lugares Increibles para hacer Ecoturismo en ${jsonResults[0].state} y sus alrededores.`,
//         postIntro: h1Intros[h1IntroIndex_RepetitionOk(h1Intros)],
//         postTOC: `<H2>Los Mejores Parques Ecoturísticos en ${jsonResults[0].state}</h2><ul>${finalTOC.join(' ').toString()}</ul>`,
//         postNote: coreContentArray[0].postNote,
//         placeRank1: coreContentArray[0].postContent,
//         placeRank2: coreContentArray[1].postContent,
//         placeRank3: coreContentArray[2].postContent,
//         placeRank4: coreContentArray[3].postContent,
//         placeRank5: coreContentArray[4].postContent,
//         placeRank6: coreContentArray[5].postContent,
//         placeRank7: coreContentArray[6].postContent,
//         placeRank8: coreContentArray[7].postContent,
//         placeRank9: coreContentArray[8].postContent,
//         placeRank10: coreContentArray[9].postContent,
//         placeRank11: coreContentArray[10].postContent,
//         placeRank12: coreContentArray[11].postContent,
//         placeRank13: coreContentArray[12].postContent,
//         placeRank14: coreContentArray[13].postContent,
//         placeRank15: coreContentArray[14].postContent,
//         placeRank16: coreContentArray[15].postContent,
//         placeRank17: coreContentArray[16].postContent,
//         placeRank18: coreContentArray[17].postContent,
//         placeRank19: coreContentArray[18].postContent,
//         placeRank20: coreContentArray[19].postContent,
//         placeRank21: coreContentArray[20].postContent,
//         placeRank22: coreContentArray[21].postContent,
//         placeRank23: coreContentArray[22].postContent,
//         //placeRank24: coreContentArray[23].postContent,
//         slug: jsonResults[0].slug,
//     }]

    console.log(postVariablesArray)
   // console.log(finalPost)
    // console.log(photoScripts)
    // console.log(canvaScripts)

    // const workbook = XLSX.utils.book_new()
    // let worksheet = XLSX.utils.json_to_sheet(finalPost)
    // let worksheet2 = XLSX.utils.json_to_sheet(photoScripts) 
    // let worksheet3 = XLSX.utils.json_to_sheet(canvaScripts) 
    // XLSX.utils.book_append_sheet(workbook,worksheet,'postContent')
    // XLSX.utils.book_append_sheet(workbook,worksheet2,'photoScripts')
    // XLSX.utils.book_append_sheet(workbook,worksheet3,'canvaScripts')
    // XLSX.writeFile(workbook, wbOutput)

    // let stream = XLSX.stream.to_csv(worksheet3);
    // stream.pipe(fs.createWriteStream(csvOutput));


