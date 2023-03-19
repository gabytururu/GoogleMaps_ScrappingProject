const XLSX = require('xlsx');
const fs = require('fs')


//----------------------------upload aoa_to_sheet - xlsx ---------------------//
// let munVer = [
// 'Acajete',
// 'Acatlán',
// 'Acayucan',
// 'Actopan',
// 'Acula',
// 'Acultzingo',
// 'Camarón de Tejeda',
// 'Alpatláhuac',
// 'Alto Lucero de Gutiérrez Barrios',
// 'Altotonga',
// 'Alvarado',
// 'Amatitlán',
// 'Naranjos Amatlán',
// 'Amatlán de los Reyes',
// 'Ángel R. Cabada',
// 'La Antigua',
// 'Apazapan',
// 'Aquila',
// 'Astacinga',
// 'Atlahuilco',
// 'Atoyac',
// 'Atzacan',
// 'Atzalan',
// 'Tlaltetela',
// 'Ayahualulco',
// 'Banderilla',
// 'Benito Juárez',
// 'Boca del Río',
// 'Calcahualco',
// 'Camerino Z. Mendoza',
// 'Carrillo Puerto',
// 'Catemaco',
// 'Cazones de Herrera',
// 'Cerro Azul',
// 'Citlaltépetl',
// 'Coacoatzintla',
// 'Coahuitlán',
// 'Coatepec',
// 'Coatzacoalcos',
// 'Coatzintla',
// 'Coetzala',
// 'Colipa',
// 'Comapa',
// 'Córdoba',
// 'Cosamaloapan de Carpio',
// 'Cosautlán de Carvajal',
// 'Coscomatepec',
// 'Cosoleacaque',
// 'Cotaxtla',
// 'Coxquihui',
// 'Coyutla',
// 'Cuichapa',
// 'Cuitláhuac',
// 'Chacaltianguis',
// 'Chalma',
// 'Chiconamel',
// 'Chiconquiaco',
// 'Chicontepec',
// 'Chinameca',
// 'Chinampa de Gorostiza',
// 'Las Choapas',
// 'Chocamán',
// 'Chontla',
// 'Chumatlán',
// 'Emiliano Zapata',
// 'Espinal',
// 'Filomeno Mata',
// 'Fortín',
// 'Gutiérrez Zamora',
// 'Hidalgotitlán',
// 'Huatusco',
// 'Huayacocotla',
// 'Hueyapan de Ocampo',
// 'Huiloapan de Cuauhtémoc',
// 'Ignacio de la Llave',
// 'Ilamatlán',
// 'Isla',
// 'Ixcatepec',
// 'Ixhuacán de los Reyes',
// 'Ixhuatlán del Café',
// 'Ixhuatlancillo',
// 'Ixhuatlán del Sureste',
// 'Ixhuatlán de Madero',
// 'Ixmatlahuacan',
// 'Ixtaczoquitlán',
// 'Jalacingo',
// 'Xalapa',
// 'Jalcomulco',
// 'Jáltipan',
// 'Jamapa',
// 'Jesús Carranza',
// 'Xico',
// 'Jilotepec',
// 'Juan Rodríguez Clara',
// 'Juchique de Ferrer',
// 'Landero y Coss',
// 'Lerdo de Tejada',
// 'Magdalena',
// 'Maltrata',
// 'Manlio Fabio Altamirano',
// 'Mariano Escobedo',
// 'Martínez de la Torre',
// 'Mecatlán',
// 'Mecayapan',
// 'Medellín',
// 'Miahuatlán',
// 'Las Minas',
// 'Minatitlán',
// 'Misantla',
// 'Mixtla de Altamirano',
// 'Moloacán',
// 'Naolinco',
// 'Naranjal',
// 'Nautla',
// 'Nogales',
// 'Oluta',
// 'Omealca',
// 'Orizaba',
// 'Otatitlán',
// 'Oteapan',
// 'Ozuluama de Mascareñas',
// 'Pajapan',
// 'Pánuco',
// 'Papantla',
// 'Paso del Macho',
// 'Paso de Ovejas',
// 'La Perla',
// 'Perote',
// 'Platón Sánchez',
// 'Playa Vicente',
// 'Poza Rica de Hidalgo',
// 'Las Vigas de Ramírez',
// 'Pueblo Viejo',
// 'Puente Nacional',
// 'Rafael Delgado',
// 'Rafael Lucio',
// 'Los Reyes',
// 'Río Blanco',
// 'Saltabarranca',
// 'San Andrés Tenejapan',
// 'San Andrés Tuxtla',
// 'San Juan Evangelista',
// 'Santiago Tuxtla',
// 'Sayula de Alemán',
// 'Soconusco',
// 'Sochiapa',
// 'Soledad Atzompa',
// 'Soledad de Doblado',
// 'Soteapan',
// 'Tamalín',
// 'Tamiahua',
// 'Tampico Alto',
// 'Tancoco',
// 'Tantima',
// 'Tantoyuca',
// 'Tatatila',
// 'Castillo de Teayo',
// 'Tecolutla',
// 'Tehuipango',
// 'Álamo Temapache',
// 'Tempoal',
// 'Tenampa',
// 'Tenochtitlán',
// 'Teocelo',
// 'Tepatlaxco',
// 'Tepetlán',
// 'Tepetzintla',
// 'Tequila',
// 'José Azueta',
// 'Texcatepec',
// 'Texhuacán',
// 'Texistepec',
// 'Tezonapa',
// 'Tierra Blanca',
// 'Tihuatlán',
// 'Tlacojalpan',
// 'Tlacolulan',
// 'Tlacotalpan',
// 'Tlacotepec de Mejía',
// 'Tlachichilco',
// 'Tlalixcoyan',
// 'Tlalnelhuayocan',
// 'Tlapacoyan',
// 'Tlaquilpa',
// 'Tlilapan',
// 'Tomatlán',
// 'Tonayán',
// 'Totutla',
// 'Tuxpan',
// 'Tuxtilla',
// 'Úrsulo Galván',
// 'Vega de Alatorre',
// 'Veracruz',
// 'Villa Aldama',
// 'Xoxocotla',
// 'Yanga',
// 'Yecuatla',
// 'Zacualpan',
// 'Zaragoza',
// 'Zentla',
// 'Zongolica',
// 'Zontecomatlán de López y Fuentes',
// 'Zozocolco de Hidalgo',
// 'Agua Dulce',
// 'El Higo',
// 'Nanchital de Lázaro Cárdenas del Río',
// 'Tres Valles',
// 'Carlos A. Carrillo',
// 'Tatahuicapan de Juárez',
// 'Uxpanapa',
// 'San Rafael',
// 'Santiago Sochiapan',
// ]

// let munVerClean =[];

// munVer.forEach(mun => {
//    munVerClean.push(`viveros en ${mun}`)   
//    munVerClean.push(`viveros ${mun}`)   
// })

// console.log(munVerClean)
// let veracruzString = munVerClean.toString()

// const wb = XLSX.utils.book_new()
// const ws = XLSX.utils.aoa_to_sheet(veracruzString)
// XLSX.utils.book_append_sheet(wb,ws,'munVer')
// XLSX.writeFile(wb, 'munVer')


//----------------------download sheet to json - xlsx ---------------------//




let textIntrosIndexArr =[]
let selectedIntrosArr =[]

let textIntros = [
`Este parque ecoturistico tiene 4.5estrellas de calificación promedio, a partir de las más de 350 opiniones de sus visitantes... ¿nada mal no?. Es por esto que Cascadas de Villa Luz es parte de esta lista de los centros ecoturisticos mejor calificados de Tabasco. Con este respaldo estamos más que seguras(os) que se trata  de un sitio que vas a disfrutar al Máximo. Así que ya sabes, si lo que buscas es naturaleza, el parque ecoturistico Cascadas de Villa Luz en Tabasco es sin duda una gran opción`,
`Con una calificación promedio de 4.5 estrellas y más de 350 opiniones positivas, ¡Cascadas de Villa Luz en Tabasco es sin duda parte del selecto grupo de los mejores centros ecoturísticos! Estamos seguros que si lo tuyo son entornos naturales este parque te permitirá disfrutar al máximo tu experiencia. Así que no dudes - Cascadas de Villa Luz sería la excelente elección para vivir el contacto directo con la naturaleza.`,
`Si te gusta estar en contacto con la naturaleza y estás buscando lugares para hacer ecoturismo en Tabasco entonces ¡tienes que conocer las Cascadas de Villa Luz!. Con un promedio de 4.5 estrellas evaluadas por al menos 350 visitantes, es posible decir que este parque ecoturistico es uno de los favoritos de aquí. Así que si ya estás lista(o)... prepárate para sumergirte en los paisajes naturales e inolvidables de esta región y ¡aventúrate a conocer las Cascadas de Villa Luz!`,
`Bueno pues si eres de quienes ama estar en contacto con la naturaleza y andas por Tabasco, entonces no puedes perderte la experiencia de visitar el parque ecoturistico Cascadas de Villa Luz. Con una calificación promedio de 4.5 estrellas de más de 350 visitantes, no tenemos duda de que se trata de un favorito de esta región. Así que nada...prepárate para sumergirte y disfrutar a tope de los paisajes naturales de Tabasco y Lánzate a Cascadas de Villa Luz`,
`El parque ecoturistico Cascadas de Villa Luz es una opción fantástica para tener una aventura natural en Tabasco. Su calificación promedio es de 4.5estrellas respaldada por más de 350 visitantes, así que no tenemos duda de que este lugar pertenece a la lista de los centros ecoturisticos mejor rankeados de de Tabasco y que se trata de uno de los principales atractivos naturales en la región. Así que ya sabes... ¿ganas de naturaleza?... pues entonces el parque ecoturistico Cascadas de Villa Luz es una grandísima opción`,
`El parque ecoturistico Cascadas de Villa Luz es una de las opciones inmejorables para vivir la naturaleza en Tabasco. Con 4,5 estrellas y el aval de al menos 350 visitantes con opiniones positivas, este parque ecoturístico se ha posicionado como uno de los mejores de este lugar y es sin duda un atractivo natural obligado si lo que buscas es un hacer algo de ecoturismo. Así que ya sabes... toma nota de sus detalles y ponte en ruta a las Cascadas De Vila Luz.`,
`Si te apasiona la naturaleza y andas en busca de aventuras ¡pues no se diga más! porque sin duda el parque ecoturistico Cascadas de Villa Luz es una opción en Tabasco que no debes dejar pasar. Este parque ecoturistico tiene una calificación promedio de 4.5estrellas, basada en las opiniones de más de 350 visitantes, motivo por el que forma parte de este rank. Así es que... siendo uno de los centros ecoturisticos mejores calificados en Tabasco  ¿qué esperas para visitarlo?`,
`Bueno... pues ya que andas buscando salir de lo cotidiano... ¿Qué tal disfrutar de algunos de los paisajes más bonitos y naturales de Tabasco?. Pues eso es lo que parque ecoturistico Cascadas de Villa Luz te ofrece. Este sitio tiene una calificación promedio de 4.5estrellas, a partir de opiniones de al menos 350 visitantes previos a ti, y es por eso que se considera uno de los top de este estado. Así que nada... sin excusas y ¡a vivir esta experiencia en la naturaleza!`,
`Entendemos que si estás aquí, es porque estás buscando un buen lugar en Tabasco para conectarte con la naturaleza y disfrutarla a tope. Y nada... que el parque ecoturistico Cascadas de Villa Luz} es sin duda alguna una de tus mejores opciones para lograrlo. Este parque ecoturistico ha sido evaluada por más de 350 visitantes, que le otorgan en promedio una calificación de 4.5estrellas, haciéndolo uno de los centros ecoturisticos más recomendados de Tabasco. Así que nada.. a pasar del pensamiento a la acción y a poner Cascadas de Villa Luz en tu ruta de ecoturismo ¡pero ya!`,
`Uno de los sitios naturales más memorables de Tabasco es sin duda alguna el parque ecoturistico Cascadas de Villa Luz. Este lugar está respaldado por un montón de visitantes previos y más de 350 evaluaciones promedio que rondan las 4.5estrellas, lo que lo hace un favorito de esta región. Es por eso que forma parte de esta lista de los mejores centros ecoturisticos de Tabasco, y es por eso también que nos parece una recomendación imperdible para ti.`,
`El Parque Ecoturístico Cascadas de Villa Luz es uno de los sitios naturales más lindos que Tabasco tiene para ofrecer. Está respaldado por la aprobación de más de 350 opiniones que en promedio le han otorgado 4.5 estrellas, haciéndolo un favorito de la región y un imperdible en nuestra lista de los mejores centros ecoturísticos de Tabasco.`,
`Si andas en búsca de experiencias únicas en la naturaleza, entonces el parque ecoturistico Cascadas de Villa Luz en Tabasco tiene que ser parte de tu lista. Este es un parque ecoturistico con más de 350 opiniones de visitantes y que ha sido de manera consistente calificado con hasta 4.5estrellas, es por eso que aunque pueda tener algunas áreas de mejora, es sin duda uno de los mejores lugares para disfrutar de la naturaleza en la región. Así que no lo pienses mucho más y ¡a visitar Cascadas de Villa Luz!`,
`El parque ecoturistico Cascadas de Villa Luz es una de las joyas naturales que tiene Tabasco. Se trata de un lugar evaluado en promedio con 4.5estrellas por al menos 350 personas. Es por esto que no podemos dejar de recomendártelo como uno de los favoritos para los amantes de la naturaleza en Tabasco. Así que ya sabes, guárdate toda la información logística que vamos a proporcionarte y anímate a visitar este increíble parque ecoturistico cuanto antes.`,
`Si se trata de explorar la belleza natural de Tabasco, entonces el parque ecoturistico Cascadas de Villa Luz es lo que llamamos un "must". Este centro ecoturístico está recomendado por más de 350 opiniones de visitantes que lo han evaluado hasta con 4.5estrellas. Se trata de uno de los espacios naturales más amenos de la región y por eso una alternativa que no debes dejar de visitar si andas por Tabasco buscando algo natural.`,
`Si eres de los que disfrutan de los paisajes naturales, entonces tienes que visitar el parque ecoturistico Cascadas de Villa Luz en Tabasco. Con más de 350 opiniones de visitantes y una calificación promedio de 4.5estrellas, este lugar es uno de los más valorados en la región.`,
`¿Quieres vivir un paseo increible en contacto con la naturaleza? entonces no puedes dejar de considerar una visita al parque ecoturistico Cascadas de Villa Luz en Tabasco. Con una calificación promedio de 4.5estrellas y más de 350 opiniones de visitantes, este lugar es una de las mejores opciones para los amantes del ecoturismo en esta región. Así es que ¡toma nota  de todo lo requerido para tu visita a continuación!.`,
`Si estás en busca de un lugar para conectarte con la naturaleza, el parque ecoturistico Cascadas de Villa Luz es una de tus mejores apuestas. Este sitio forma parte de esta lista de los mejores centros ecoturisticos de Tabasco gracias al respaldo y opiniones de más de 350 visitantes y que le han otorgado una calificación de más de 4.5estrellas en promedio. Este lugar es sin duda uno de los mejores para disfrutar del entorno natural y paisajes de Tabasco y practicar el ecoturismo y la aventura en la región`,
`Si estás en Tabasco en búsqueda de algo de ecoturismo y aventura entonces el parque ecoturistico Cascadas de Villa Luz no se te puede escapar. Hemos decidido incluir este parque ecoturistico en esta lista de los mejores de Tabasco gracias al respaldo y opiniones de más de 350 visitantes que lo han evaluado públicamente por lo menos con 4.5estrellas de calificación (de las más altas para este estado del país). Así que chécate todos lo detalles necesarios para tu visita y ¡no se diga más! ¡a vivir el ecoturismo en Tabasco en Cascadas de Villa Luz!`,
`Si lo que buscas es conectar con la naturaleza de Tabasco, entonces -sí o sí- tienes que programarte para una visita al parque ecoturistico Cascadas de Villa Luz. Este es uno de los centros ecoturisticos mejor calificados de Tabasco (con 4.5estrellas y más de 350 opiniones públicas de visitantes), lo que lo hace un favorito de los amantes del ecoturismo y la aventura natural. Si andas en busqueda justo de eso, entonces revisa los detalles siguientes para tener una visita segura y ¡lánzate al parque Cascadas de Villa Luz!`,
`¿Te gusta el ecoturismo o andas en Tabasco buscando algo de aventura natural? Entonces pon ya mismo en tu lista al parque ecoturistico Cascadas de Villa Luz. Este es un lugar ideal para encontrarte con la naturaleza y disfrutar de paisajes lindos. Es un parque ecoturistico que ha sido evaluado por más de 350 personas y tiene un promedio de 4.5estrellas de calificación. Aunque puede que haya algunos detallitos que es posible mejorar, la realidad es que Cascadas de Villa Luz es un paso obligado si lo que estás buscando es ecoturismo y naturaleza en Tabasco`,
`Si te apasiona el ecoturismo y estas buscando explorar la naturaleza increíble de Tabasco, ¡no puedes perderte Cascadas de Villa Luz!. Este parque natural es el sitio ideal para disfrutar paisajes hermosos. Más de 350 personas lo han evaluado con un promedio de 4.5 estrellas. Aunque hay algunos detallitos que se pueden mejorar, definitivamente es una súper opción si lo que buscas es una experiencia cargada de naturaleza.`, 
`Cascadas de Villa Luz es uno de los destinos turísticos más populares para aquellos que desean disfrutar de la naturaleza y el ecoturismo. Con un promedio de 4.5 estrellas de más de 350 visitantes, este parque es un lugar perfecto para disfrutar el paisaje y los entornos naturales de Tabasco... así que toma nota de toda su información y a visitar Cascadas de VillaLuz.`,
`Cascadas de Villa Luz es una parada obligatoria para quienes buscan disfrutar del ecoturismo y la naturaleza en Tabasco. Este parque ofrece a sus visitantes un promedio de 4.5 estrellas, según los 350 visitantes que lo han evaluado. Así que no lo pienses mas y lánzate a disfrutar de sus entornos naturales y paisajes, y a vivir el ecoturismo a tope.`, 
`Cascadas de Villa Luz es el destino perfecto para aquellos que buscan disfrutar del ecoturismo y la naturaleza en Tabasco. Este lugar uenta con un promedio de 4.5 estrellas según los 350 visitantes que lo han calificado, ofreciendo a sus visitantes una experiencia única. Aquí vas a disfrutar de hermosos paisajes y entornos naturales para que saques el máximo provecho en tu estadía.`,
`Cascadas de Villa Luz es uno de los destinos turísticos más populares para aquellos que desean disfrutar de la naturaleza y el ecoturismo. Con un promedio de 4.5 estrellas de más de 350 visitantes, este parque es un lugar perfecto para disfrutar el paisaje y los entornos naturales de Tabasco... así que toma nota de toda su información y a visitar Cascadas de VillaLuz.`,
`El parque ecoturístico Cascadas de Villa Luz en Tabasco es una re buena opción si lo que buscas es ecoturismo. Con una calificación promedio de 4.5 estrellas basada en las opiniones de más de 350 visitantes, este parque es considerado uno de los mejores centros ecoturísticos de la región. Es por eso que si la naturaleza y la aventura te motivan, no puedes dejar de visitar Cascadas de Villa Luz y sumergirte en los paisajes naturales de Tabasco. `,
`Si estás buscando una experiencia de ecoturismo en Tabasco, no te puedes perder el parque ecoturístico Cascadas de Villa Luz. Decidimos agregar este sitio a la lista de los mejores centros ecoturísticos de la Tabasco, gracias al aval de 4.5 estrellas que más de 350 visitantes le han dado. Entonces si te gusta estar rodeado de paisajes lindos, y vegetación nativa, etnonces este parque es una de las opciones perfetas para tí para ti. Así que ponlo en tu lista ya mismo y aventúrate a conocer el parque ecoturístico Cascadas de Villa Luz.`,
`Si de atractivos naturales hablamos, entonces Cascadas de Villa Luz es uno de los principales de Tabasco. Este parque ecoturístico es una de las opciones imperdibles para conocer la naturaleza de esta región en todo su esplendor. Este parque ecoturistico tiene 4.5 estrellas de calificación respaldadas por opiniones de hasta 350 visitantes. Es por eso que forma parte de esta lista como uno de los mejores lugares para hacer ecoturismo en esta región.`, 
`Si mueres de curiosidad y ganas de estar en contacto con la naturaleza, entonces tienes que conocer el parque ecoturístico Cascadas de Villa Luz en Tabasco. Este sitio ha sido evaluado con 4.5 estrellas en promedio por más de 350 personas, lo que lo hace una opción fantástica para tener una aventura natural en Tabasco. `,
`Si quieres escapar de la rutina y disfrutar de la naturaleza a tope, el parque ecoturístico Cascadas de Villa Luz -si o sí- una opción que debe estar en tu lista. Este parque ecoturistico ha sido evaluado por más de 350 visitantes, quienes lo han posicionado como uno de los mejores de Tabasco, (con 4.5 estrellas en promedio). Es por eso que hemos decidido hacerlo parte de esta lista de los mejores, y dejártelo en las recomendaciones si lo que buscas es respirar naturaleza al máximo. `,
`¿Quieres disfrutar de la naturaleza en Tabasco al máximo? Entonces el parque ecoturístico Cascadas de Villa Luz es lo que llamamos un "MUST". Este parque ecoturístico tiene una calificación promedio de 4.5 estrellas y más de 350 opiniones positivas por quienes lo han visitado anteriormente. Por esas razones Cascadas de Villa Luz se ha consilidado como uno de los principales atractivos naturales de Tabasco y uno de los mejores sitios para hacer ecoturismo en esta región.`,
`Si estás buscando un lugar para conectarte con la naturaleza y disfrutarla a lo más, entonces  Cascadas de Villa Luz es una de las mejores opciones para tí. Este parque ecoturístico de Tabasco, tiene más de 350 opiniones positivas de sus visitantes, quienes lo han calificado en promedio como un sitio de 4.5 estrellas, lo que lo mantiene como uno de los centros ecoturísticos más concurridos de la región. Entonces ya sabes, si andas por Tabasco, aprovecha la oportunidad y organízate para visitar las Cascadas de Villa Luz.`,
]

let i = Math.floor(Math.random() * textIntros.length)

function spinnedTextNoRepetition(textIntros){          
    do{            
        i = Math.floor(Math.random() * textIntros.length)          
    }while(textIntrosIndexArr.includes(i))
        
    textIntrosIndexArr.push(i) 
    let selectedIntro = textIntros[i]
    selectedIntrosArr.push(selectedIntro)
    
    return selectedIntro
} 

const wb = XLSX.readFile('uploadingTest.xlsx')
const ws = wb.Sheets['Hoja1']
const sheettoJson = XLSX.utils.sheet_to_json(ws)
//console.log(sheettoJson[0])



let bestPlacesArray = sheettoJson.map(el => {
    let placeIntroSpinned = spinnedTextNoRepetition(textIntros)
    let newObject = {placeIntroSpinned, ... el}
    return newObject
})

console.log(bestPlacesArray)

// for (let place of bestPlacesArray){    
//     let i = Math.floor(Math.random() * textIntros.length)

//     function spinnedTextNoRepetition(textIntros){  
        
//             do{            
//                 i = Math.floor(Math.random() * textIntros.length)          
//             }while(textIntrosIndexArr.includes(i))
                
//             selectedIntrosArr.push(textIntros[i])
//             textIntrosIndexArr.push(i) 
         

//          return selectedIntrosArr 
//     } 

//     spinnedTextNoRepetition(textIntros)
// }


// console.log('indexArray FINAL: ',textIntrosIndexArr)
// console.log('finalArray FINAL: ',selectedIntrosArr)