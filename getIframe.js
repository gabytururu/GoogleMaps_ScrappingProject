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
    let pageToExplore = 'https://www.google.com/maps/place/Reserva+Nacional+Los+Queules/@-35.9492196,-72.6162752,17z/data=!4m6!3m5!1s0x96662be01f453561:0xd9c4364dc190761a!8m2!3d-35.9492196!4d-72.6162752!16s%2Fm%2F0crg7jy?authuser=0&hl=es-419'
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
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
    await page.waitForNavigation()
    await page.waitForSelector('.m5XrEc')

    const iframe= await page.$('.m5XrEc input.yA7sBe').value   
    console.log(iframe) 

    // document.querySelector('.m5XrEc input.yA7sBe').value
  
    // const getIframe = await page.evaluate(()=>{
    //     const iframe = document.querySelector('input.yA7sBe').value
    //     return iframe
    // })
    // console.log(getIframe)

    // const iframe= await page.querySelector('input.yA7sBe').value
    // console.log(iframe)
    
    // const getiframe = await page.evaluate(()=>{
        
    //     const iframeSelector = document.querySelector('.rgIZ6c').childNodes[1]
    //     console.log(iframeSelector)
    //     iframeSelector.click()
    //     const iframe = document.querySelector('input.yA7sBe').value

    //     return iframe
    // })

    // console.log(getiframe)
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

        
   