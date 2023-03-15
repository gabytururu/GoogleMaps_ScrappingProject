const puppeteer = require('puppeteer');
(async()=>{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://quotes.toscrape.com/')

    const grabQuotes = await page.evaluate(()=>{

        const quotes = document.querySelectorAll('.quote')
        let quotesArr = []
        quotes.forEach(quote =>{
            const actualInfo = quote.querySelectorAll('span')
            const actualQuote = actualInfo[0]
            const authorQuote = actualInfo[1]
            const authorName = authorQuote.querySelector('small') // must go another level bc within the html tag that contains the author, the actual name of the author is withn a small tag instead of just as a plain innertext
            quotesArr.push({
                quote:actualQuote.innerText, 
                author:authorName.innerText
            }) 
        }) 

        return quotesArr
    })
    console.log(grabQuotes)
    await browser.close()
})()