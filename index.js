const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    }); // default is true
    //const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await listeners(browser, page);
    await page.goto('https://suncork.net');


    const el = await page.evaluate(() => {
        alert('hello');
    });

    
    console.log('EL', el);


    await browser.close();
})();


async function listeners(browser, page) {
    browser.on('targetcreated', async target => {
        const pg = await target.page();
        if (pg) {
            pg.close();
        }
    });

    page.on('console', msg => {
        console.log('PAGE LOG: ', msg);
    });
}