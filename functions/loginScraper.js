// 1. clicking on an item just requires the tag and the attribute of that tag .. eg. ---> 'tag[attribute]'
// 2. to input something we just need to provide the identifier and the input info. If we want to visually see the bot writing those things we can also add a third parameter called delay, and just include how long do we want the proess to delay or slow it e.g. --> //'identifier', 'inputInfo', {delay:time} 
    // setting a delay may be uneffective if you are trying to automate a process to happen a TON of times.. eg millions of logins... but it may actually be handy if you are trying to simulate that you are a huma (which obviously types somewhat slow... and you want to do it so the robots from the site do not realize you are and actual robot)
//3. if i also want to send the instruction to wait for this selector to load (to avoid errors related to the robot trying to click a button that dont exist) the i can also use the .waitForSelector function each time i try to work with something related to the page. 


const puppeteer = require('puppeteer');
(async()=>{
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto('https://quotes.toscrape.com/')


    await page.waitForSelector('a[href="/login"]')
    await page.click('a[href="/login"]') //1
    
    
    await page.waitForSelector('#username')//3
    await page.type("#username", "PedroTEch", {delay:100}) //2
    await page.waitForSelector('#password')//3
    await page.type("#password", "password123",  {delay:100}) //2
    
    
    await page.click('input[value="Login"]') //1
    //await browser.close()
})()