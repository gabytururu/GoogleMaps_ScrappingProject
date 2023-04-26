const XLSX = require('xlsx');
const fs = require('fs');
const puppeteer = require('puppeteer');


const wbInput = 'parquesEcoturismoJalisco.xlsx'
const wsInput = 'topFinal_JAL'
// const wbOutput = 'blogPostReady.xlsx'
// const csvOutput = 'Canva.csv';

const wb = XLSX.readFile(wbInput)
const ws = wb.Sheets[wsInput]
const jsonResults = XLSX.utils.sheet_to_json(ws)

//console.log('jsonResult:', jsonResults)


// ----------------------------- PHOTO CREDITS -------------------//

let urlstoGetPhotoCredit=[]
    
for(let i=0; i<jsonResults.length; i++){
    urlstoGetPhotoCredit.push(jsonResults[i].urlgMaps)
}
//console.log(urlstoGetPhotoCredit)

let photoCreditsArr = []
async function getPhotoCredit(urlstoGetPhotoCredit){    
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300,height:900});

    for(let url of urlstoGetPhotoCredit){
        await page.goto(`${url}`, {waitUntil:'domcontentloaded'})
        await page.waitForSelector('button.aoRNLd.kn2E5e.NMjTrf.lvtCsd')
        await page.click('button.aoRNLd.kn2E5e.NMjTrf.lvtCsd')
        await page.waitForSelector('.m6QErb.DxyBCb.kA9KIf.dS8AEf')
        await page.waitForSelector ('.Uf0tqf.loaded')
        await page.click('.Uf0tqf.loaded')[0]
        await page.waitForSelector('span.elqiBd')
        const photoCredit = await page.$eval('span.elqiBd', el => el.innerText)
        await page.waitForSelector('div.SAtV7')
        const photoYear = (await page.$eval('div.SAtV7', el => el.innerText)).replace('Foto - ','')
        await page.waitForSelector('h1.BDkzx span')
        let photoTitle = await page.$eval('h1.BDkzx span', el => el.innerText)
        while(photoTitle.length <= 1 ){ 
            await page.waitForSelector('h1.BDkzx span')
            photoTitle = await page.$eval('h1.BDkzx span', el => el.innerText)
        }
        // const fullPhotoCredit = `Créditos: (1)GoogleMaps, (2)${titleCase(photoCredit)}-${photoYear}, Título: "${photoTitle}"`    
        const fullPhotoCredit = `Créditos: (1)${photoCredit}-${photoYear}, Título: "${photoTitle}", (2)GoogleMaps`    
        
        photoCreditsArr.push(fullPhotoCredit)
        //console.log(photoCreditsArr)
    }
    await browser.close()
    return photoCreditsArr
}

//const photoCreditsArray = getPhotoCredit(urlstoGetPhotoCredit)
getPhotoCredit(urlstoGetPhotoCredit)
    .then((resp) => {    
        for(let i=0; i<jsonResults.length; i++){
            jsonResults[i].photoCredit = resp[i]
        }
        console.log(jsonResults)  
        
        const workbook = XLSX.utils.book_new()
        let worksheet = XLSX.utils.json_to_sheet(jsonResults)
        XLSX.utils.book_append_sheet(workbook,worksheet,'topFinal_JAL')
        XLSX.writeFile(workbook, 'parquesEcoturismoJaliscoB.xlsx')
    })
    

