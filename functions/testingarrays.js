const puppeteer = require('puppeteer');
(async()=>{
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto('https://eidrianf.github.io/rio-negro-costero/')
    
    
    const grabElements = await page.evaluate(()=>{

        const listofElements = document.querySelectorAll('.footer__nav ul li a')
        let elementsArray =[]
        console.log(listofElements)
        listofElements.forEach((element)=>{
            elementsArray.push(element.innerText)
        })
        return elementsArray
    })

    console.log(grabElements)
    await browser.close()
})()