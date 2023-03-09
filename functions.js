
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

let globalVar = 10

function test(){
    let localVar = 10+ globalVar
    return localVar
}
console.log(test())
