// async function getiframe(page){
//     let document = page
//     await page.click('img[alt="Compartir"]')
//     await page.waitForSelector('button[aria-label="Insertar un mapa"]')
//     await page.click('button[aria-label="Insertar un mapa"]')
//    // await page.waitForSelector('input.yA7sBe')
//     const iframe = await page.evaluate(()=>{
//         return document.querySelector('input.yA7sBe').value
//     })
//     console.log(iframe)
//     await page.click('button.AmPKde[aria-label="Cerrar"]')
// }


const puppeteer = require ('puppeteer');



(async()=>{
    let pageToExplore = 'https://www.google.com.mx/maps/place/Parque+Nacional+Bernardo+O%27Higgins/data=!4m7!3m6!1s0xbda2ee5c5c6709bb:0xae0424a6180c2ac6!8m2!3d-49.7974965!4d-74.4849485!16zL20vMGd0NGo3!19sChIJuwlnXFzuor0RxioMGKYkBK4?authuser=0&hl=es-419&rclk=1'
    //const browser = await puppeteer.launch({headless:false, devtools: true})
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300,height:900});
    await page.goto(`${pageToExplore}`)
    await page.screenshot({path: 'getiframeTest.png'})
    //const title = await page.title()       
    const getData = await page.evaluate(()=>{
        let placeObject ={}
        const placeName = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[1].textContent      
        placeObject.name = placeName
       // placeObject.iframe = iframe
        return placeObject
    })

    console.log(getData.name) 
    await page.waitForSelector(`button[aria-label="Compartir ${getData.name}"]`)
    await page.click(`button[aria-label="Compartir ${getData.name}"]`)
    await page.waitForNavigation()
    await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
    await page.click('button.zaxyGe.L6Bbsd.YTfrze')
   // await page.waitForNavigation()
    await page.waitForSelector('.hdeJwf.sYmAxe.pane-open')
        .then(()=> console.log('salio el selector'))
    await page.waitForSelector('.eNBuZ')
        .then(()=> console.log('salio el segundo selector'))
    await page.waitForSelector('.m5XrEc')
        .then(()=> console.log('salio el tercer selector'))
    await page.waitForSelector('input.yA7sBe')
        .then(()=>console.log('primer then: salio el ultimo selector: input selector'))
        .then(()=> {
            let input = page.$('.input.ya7sBe')
            console.log('input del segundo then',input)
            return input.innerHTML
        })
        .then(val => console.log('input del tercer then', val))
    
    const finalPageEval = await page.evaluate(()=>{
        let inputPageEval = document.querySelector('.input.ya7sBe')
        console.log('input page eval function:', inputPageEval)
        return inputPageEval

    })
    console.log('finalPageEval Consolelog', finalPageEval)
            // const selector = page.$('.input.yA7sBe')
            // return selector

        // })
       

    // const iframe = await page.$('#modal-dialog > div > div.hoUMge > div > div.yFnP6d > div > div > div > div.eNBuZ > div.m5XrEc > input')

    // document.querySelector('.m5XrEc input.yA7sBe').value
      //     const iframeSelector = document.querySelector('.rgIZ6c').childNodes[1]
   
    //await browser.close()
})()
   
// ------------------ATTEMPTS -----------------------------//
        // await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
        // await page.click('button.zaxyGe.L6Bbsd.YTfrze')

            
        //     const clickIframe = await page.evaluate(()=>{
        //         page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
        //         page.click('button.zaxyGe.L6Bbsd.YTfrze')


        //         page.waitForSelector('input.yA7sBe')
        //         const iframe = document.querySelector('input.yA7sBe').value
        //         console.log(iframe)
        //         return iframe
        
        //     })
        //    console.log(clickIframe)

        //document.querySelector('.rgIZ6c').childNodes[1]
        //data-tooltip="Incorporar un mapa"
        //aria-label="Incorporar un mapa"
        //'button[aria-label="Insertar un mapa"]'

        
   