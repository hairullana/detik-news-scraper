let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

// ambil alamat yang mau di scrap
axios.get('https://news.detik.com/indeks').then((response) => {
    // jika status success
    if (response.status === 200) {
        // ambil data
        const html = response.data;
        // load dengan cheerio
        const $ = cheerio.load(html);
        // buat nyimpen data scrap
        let detikList = [];
        $('#indeks-container .list-content__item').each(function(i,elem){
            detikList[i] = {
                judul: $(this).find('.media__title').text().trim(),
                url: $(this).find('.media__title a').attr('href'),
                published: $(this).find('.media__date span').attr('title')
            }
        });
        const detikListTrim = detikList.filter(n => n != undefined)
        fs.writeFile('data/detik.json',
        JSON.stringify(detikListTrim, null, 4), (err) => {
            console.log('Write Scrapping is Success')
        });
    }
    // handle jika ada error
}), (error) => console.log(err);