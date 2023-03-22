const XLSX = require('xlsx');
const fs = require('fs');



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

// `${spinnedText(typeOfPlaceArrlowerCase)}` - 'parque ecoturistico'
// `${placeInfo.stars}` - '4.5'
// `${placeInfo.cantidadResenas}` - '350'
// `${spinnedText(typeofPlaceLowerPlural)}` - 'centros ecoturisticos'
// `${placeInfo.state}` - 'Tabasco'
// `${placeInfo.titleCaseName}` - 'Cascadas de Villa Luz'

const topPlacesFullWB = 'parquesEcoturismoOaxaca.xlsx'
const topPlacesSelectedDataWS = 'Top15_OAX'
const finalBlogFile = 'blogPostReady.xlsx'
const output_csv = 'Canva.csv';


const wb = XLSX.readFile(topPlacesFullWB)
const ws = wb.Sheets[topPlacesSelectedDataWS]
const jsonFromExcel = XLSX.utils.sheet_to_json(ws)
let topPlacesArray = jsonFromExcel


let placesArray=[]
let selectedIntrosArr = []
let textIntrosClean = [
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

    function introSelectedIndex(textIntrosClean){
    let randomIndex = Math.floor(Math.random() * textIntrosClean.length)
    do{
        randomIndex = Math.floor(Math.random() * textIntrosClean.length)
    }while(selectedIntrosArr.includes(randomIndex))

    selectedIntrosArr.push(randomIndex)
    return randomIndex
    }

    for (let place of topPlacesArray){
        let placeObject ={
            rank: place.rank,
            titleCaseName: place.titleCaseName,
            name: place.name,
            cantidadResenas: place.cantidadResenas,
            stars: place.stars,
            state: place.state,
            introIndex: introSelectedIndex(textIntrosClean), 
            introText: textIntrosClean[introSelectedIndex(textIntrosClean)],
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
            photoDownloadScript: place.photoDownloadScript,       
            photoFileName: place.photoFileName,
            photoNewName: place.photoNewName,
            photoNewFullFileName: place.photoNewFullFileName,
            canvaRenameScript: `ren "${place.rank}.jpg" "${place.photoNewFullFilleName}"`,
            photoNewURL: place.photoNewURL,
            fileNameConversionScript: place.fileNameConversionScript,
            slug: place.slug,        
        }
        placesArray.push(placeObject)
    }

    console.log(placesArray)

    function spinnedText(textOptionsArr){
        let selectedText = textOptionsArr[Math.floor(Math.random() * textOptionsArr.length)]
        return selectedText
    }

    let finalPlacesArray = []
    for (let place of placesArray){     

        let textIntros = [
            // OJOOO MIL, LA PRIMERA OPCION NO TENIA BIEN LAS ESTRELLAS-- DECIA 4.5 -- VER SI ALGUNO DE OAXACA CAYO AQUI Y CORREGIR ESTRELLAS
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
        let indexTextIntros = place.introIndex
        let indexText = textIntros[indexTextIntros]    
        
        let finalObject ={
            name : place.titleCaseName,
            state: place.state,
            rank: place.rank,
            photoDownloadScript: place.photoDownloadScript,
            photoChangeNameScript: place.fileNameConversionScript,
            photoCanvaRenameScript: place.canvaRenameScript,
            structuredDataIntro: `
                <p> ¿Estás buscando los mejores parques ecoturísticos en ${place.state}? Entonces ¡estás en el lugar correcto!. \n\n Hoy vamos a mostrarte el resultado de nuestra investigación en torno a los ${spinnedText(typeofPlaceLowerPlural)} mejor evaluados en este estado. Para definir esta lista de los ganadores, realizamos consultas en un montón de fuentes oficiales, redes sociales, rankings e incluso algunas entrevistas directas. Este proceso nos permitió determinar cuáles son y dónde se ubican los ${spinnedText(typeofPlaceLowerPlural)} que mejores experiencias han dado a sus visitantes, y con mayor calificación en ${place.state} durante los últimos años. \n\n Con todo esto como respaldo, hoy te compartimos la lista de los ${spinnedText(typeofPlaceLowerPlural)} mejor calificados en ${place.state} en ${new Date().getFullYear()} junto con su ubicación, calificación promedio del lugar, medios oficiales de contacto, horarios y cómo llegar hasta ellos. \n Prepárate con esto y ¡a disfrutar del ecoturismo en ${place.state}!</p> 
            `, 
            structuredDataContent: `
                <h2><b>${spinnedText(typeOfPlaceArrTitleCase)} ${place.titleCaseName}</b></h2>
                <img src="${place.photoNewURL}" alt="${place.name}">   
                <div>${place.iframe}</div>
                <p>${indexText}</p>
                <h3><b>¿Cómo llegar al ${spinnedText(typeOfPlaceArrTitleCase)} "${place.titleCaseName}"? </b></h3>
                    <p>Este ${spinnedText(typeOfPlaceArrlowerCase)} se ubica en ${place.address}\n ${spinnedText(comoLlegarArr)}<a href='${place.googleMapsLink}'>Mapa del ${spinnedText(typeOfPlaceArrTitleCase)} ${place.titleCaseName}</a></p>
                <h3><b>¿Cuáles son los contactos del ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}?</b></h3>
                    <p>Los contactos disponibles del ${spinnedText(typeOfPlaceArrTitleCase)} ${place.titleCaseName} son: </p>
                    <ul>
                        <li><b>Teléfono:</b> ${place.phone}</li>                                              
                        <li><b>SitioWeb:</b> ${place.web.toString().includes('no disponible')?
                        'No se cuenta con web oficial disponible'
                        :
                        `<a href="${place.web}">Web del ${place.titleCaseName}</a>`
                        }</li>                                
                    </ul>
                <h3><b>¿En qué horarios y días se puede visitar el ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName}?</b></h3>
                    <div>
                    ${place.horario === 'No se cuenta con horario oficial' ? 
                        `<p> Lamentablemente este sitio no cuenta con horarios publicados oficialmente, posiblemente se deba a que hay variaciones frecuentes o temporales en sus horarios de operación.</p> \n <p>En estos casos, lo más recomendable es que cerca de tu fecha de visita, eches un ojo a sus sitios oficiales o los llames directamente (por tel, whatsapp o FB) para preguntar los horarios vigentes.</p>`
                    :
                        `<p>Los horarios oficiales del ${spinnedText(typeOfPlaceArrlowerCase)} ${place.titleCaseName} son los siguientes:</p>                       
                        <ul>
                            <li>${place.lunes}</li>
                            <li>${place.martes}</li>
                            <li>${place.miercoles}</li>
                            <li>${place.jueves}</li>
                            <li>${place.viernes}</li>
                            <li>${place.sabado}</li>
                            <li>${place.domingo}</li>
                        </ul>
                        <p>${spinnedText(aclaracionHorariosArr)}</p>`                                           
                    }</div>
            `,
        }

        finalPlacesArray.push(finalObject)

    }

    console.log('Post Destructuring TextIntro: ', finalPlacesArray)

    const workbook = XLSX.utils.book_new()
    let worksheet = XLSX.utils.json_to_sheet(finalPlacesArray)
    XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
    XLSX.writeFile(workbook, finalBlogFile)

    
    let stream = XLSX.stream.to_csv(worksheet);
    stream.pipe(fs.createWriteStream(output_csv));


