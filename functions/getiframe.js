const puppeteer = require ('puppeteer');


(async()=>{
    let pageToExplore = 'https://www.google.com.mx/maps/place/Parque+Nacional+Bernardo+O%27Higgins/data=!4m7!3m6!1s0xbda2ee5c5c6709bb:0xae0424a6180c2ac6!8m2!3d-49.7974965!4d-74.4849485!16zL20vMGd0NGo3!19sChIJuwlnXFzuor0RxioMGKYkBK4?authuser=0&hl=es-419&rclk=1'
    let placeNameSelector = '.DUwDvf.fontHeadlineLarge span'
    //const browser = await puppeteer.launch({headless:false, devtools: true})
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300,height:900});
    await page.goto(`${pageToExplore}`)
    await page.screenshot({path: 'getiframeTest.png'})


    const getData = await page.evaluate(()=>{
        let placeObject ={}
        const placeName = document.querySelectorAll('.DUwDvf.fontHeadlineLarge span')[1].textContent      
        placeObject.name = placeName
       
        return placeObject
    })
    await page.waitForSelector(`button[aria-label="Compartir ${getData.name}"]`)
    await page.click(`button[aria-label="Compartir ${getData.name}"]`)
    await page.waitForNavigation()
    await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
    await page.click('button.zaxyGe.L6Bbsd.YTfrze')
    // await page.waitForNavigation()
    
   
    let selectorB = 'input.yA7sBe'
    await page.waitForSelector(selectorB)
    const iframe = await page.$eval(selectorB, el => el.getAttribute('value'))
   
    console.log(iframe)
    


    
    await browser.close()
})()
 //let selector = '#modal-dialog > div > div.hoUMge > div > div.yFnP6d > div > div > div > div.eNBuZ > div.m5XrEc > input'
    