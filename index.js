//------ EXAMPLE 1 -----//
// Creating a new browser, new page, going to a specific website in that page and making a screenshot of such page steps:
    // 0. requiring the puppeteer library (which had to be previously instaled via npm i puppeteer) -- OJO! SI NO LE PONES EL punto y coma FALLA!!! (; at the end) bc it is an IIFE (immediatelly invoked function) it also works OK if the semicolon goes RIGHT BEFORE the first async function (  eg.   ;(async()=>{...etc})()    )
    // 1. creating a browser but setting the headless property to false to b able to see the bot working - it could also run without me seeing it (headless) which is the default way it works. I am changing the default b/c i DONT WANT IT TO BE HEADLESS , i actually want to see it work
    // 2. creating the new page in the browserand assigning a website to this new page
    // 3. taking a pic/screenshot of the page and defining how the pic will be named
    // 4. always telling the browser to close at the end -- si no pongo esta linea lo que ocurre es que el browser nunca se cierra. si tengo headless false puedo ver claramente que la pantalla no se cierra si comento o elimino esta linea de close
    // 5. run it w node js (node index.js) --> make sure you are inthe right folder to run it
    // 6. create a function that EVALUATES the page and accesses the HTML and grabs specific data you wanna scrape. Inside the function you need to put EVERYTHING You want the puppeteer to do and scrape
const puppeteer = require('puppeteer'); //0
(async ()=>{    
    const browser = await puppeteer.launch({headless:false}) //1
    const page = await browser.newPage()
    await page.goto('https://mauriciolores.com.ar/') //2
    await page.screenshot({path: 'mywebsite.png'}) //3

    //------- 6 -------//
    const grabParagraph = await page.evaluate(()=>{
        //ojo - si hay dos o mas clases, debo ligarlas con puntos sin espacios, y solo debo dejar espacios cuando es un elemento DENTRO de otro elemento. por ej para tomar el parrafo DENTRO del div con dos clases  --> querySelector('.classA.classB p')
        const paragraphDiv = document.querySelector('#sobreMi p')
        const dataRetreived ={
            datainhtml: paragraphDiv.innerHTML,
            dataintext: paragraphDiv.innerText,
            } 

        return dataRetreived
    })
    //------- 6 ENDS -------//

    console.log(grabParagraph)
    await browser.close() //4
})();