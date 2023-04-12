
const puppeteer = require ('puppeteer');

(async()=>{

    let baseUrl = "https://www.google.com/maps/place/Vivero+nuevo+amanecer+Quer%C3%A9taro/@20.5781906,-100.3889465,17z/data=!3m1!4b1!4m6!3m5!1s0x85d34593da5ec995:0xbbdc54244a6835d!8m2!3d20.5781906!4d-100.3889465!16s%2Fg%2F11q26z770x?authuser=0&hl=es"

    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300,height:900});
    await page.goto(`${baseUrl}`,{waitUntil: 'domcontentloaded'})
    await page.waitForSelector('.DUwDvf.fontHeadlineLarge span') 
    placesData =[]
    const placeSpecifics = await page.evaluate(()=>{
        const placeInfo ={}
        const placename = document.querySelector('h1.DUwDvf.fontHeadlineLarge').textContent
        const missingData= document.querySelectorAll('span.DkEaL')
        const missingDataArr=[]
        for(let dataPoint of missingData) {
                let missingDataList = dataPoint.innerText
                missingDataArr.push(missingDataList)
        };


        function onlyPhoneMissing(array){
            if(array.find(arrEl => arrEl.includes('teléfono'))){
                resultPhone = true
            }else {
                resultPhone = false
            }         
            return resultPhone
        }

        function onlyWebMissing(array){
            if (array.find(arrEl => arrEl.includes('web'))){
                resultWeb = true
            }else{
                resultWeb = false
            }     
            return resultWeb      
        }

        function bothPhAndWebMissing (array){
           let resultPhone = onlyPhoneMissing(array)
           let resultWeb = onlyWebMissing(array)
             
            if (resultPhone && resultWeb){
                bothResults = true
            }else {
                bothResults = false
            }
            return bothResults
        }

        let dataSize = document.querySelectorAll('.Io6YTe.fontBodyMedium').length  
        if(document.querySelector('.Io6YTe.fontBodyMedium') === null){
            phone = 'No cuenta con teléfono'  
            web = 'Web no disponible'              
            address = 'No cuenta con dirección'
            city = 'No cuenta con ciudad'  
        }else if(bothPhAndWebMissing(missingDataArr) === true && dataSize === 1){
            phone = 'No cuenta con teléfono'  
            web = 'Web no disponible'              
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = 'No cuenta con ciudad'  
        }else if(bothPhAndWebMissing(missingDataArr) === true && dataSize === 2){
            phone = 'No cuenta con teléfono'  
            web = 'Web no disponible'              
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent  
        }else if(bothPhAndWebMissing(missingDataArr) === true && dataSize >2){
            phone = 'No cuenta con teléfono'  
            web = 'Web no disponible'              
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent  
            //extra = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent  
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyPhoneMissing(missingDataArr) === true && dataSize === 1){
            phone = 'No cuenta con teléfono'  
            web = document.querySelectorAll('a.CsEnBe')[1].href
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = 'No cuenta con ciudad'
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyPhoneMissing(missingDataArr) === true && dataSize === 2){
            phone = 'no se cuenta con teléfono'
            web = document.querySelectorAll('a.CsEnBe')[1].href
            address = 'No cuenta con dirección'
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyPhoneMissing(missingDataArr) === true && dataSize > 2){
            phone = 'no se cuenta con teléfono'
            web = document.querySelectorAll('a.CsEnBe')[1].href
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyWebMissing(missingDataArr) === true && dataSize === 1){
            phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            web = 'Web no disponible' 
            address = 'No cuenta con dirección'
            city = 'No cuenta con ciudad'
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyWebMissing(missingDataArr) === true && dataSize === 2){
            phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent
            web = 'Web no disponible' 
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = 'No cuenta con ciudad'
        }else if(bothPhAndWebMissing(missingDataArr)===false && onlyWebMissing(missingDataArr) === true && dataSize > 2){
            phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[1].textContent
            web = 'Web no disponible' 
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent
        }else if(onlyWebMissing(missingDataArr) === false && onlyPhoneMissing(missingDataArr) === false && dataSize > 2){
            phone = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent
            web = document.querySelectorAll('a.CsEnBe')[1].href
            address = document.querySelectorAll('.Io6YTe.fontBodyMedium')[0].textContent
            city = document.querySelectorAll('.Io6YTe.fontBodyMedium')[3].textContent
        }

        placeInfo.name= placename
        placeInfo.address = address
        placeInfo.phone= phone
        placeInfo.web = web
        placeInfo.city = city
        //placeInfo.extra = extra
        placeInfo.missingData = missingDataArr.toString()

        return placeInfo

    })
    placesData.push({...placeSpecifics})
    console.log('placeSpecifics: ', placeSpecifics)

    await browser.close()

})()



