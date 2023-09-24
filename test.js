const axios = require('axios')
const cheerio = require('cheerio')

const manga = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://www.anime-planet.com/manga/all?name=' + query)
            .then(({ data }) => {
                let result = []
                let $ = cheerio.load(data)

                $('.cardDeck > li').each((a, b) => {
                    let url = $(b).find('a').attr('href')
                    let thumb = $(b).find('img').attr('src')
                    let title = $(b).find('.cardName').text().trim()

                    if (thumb === '/inc/img/card-load.svg') return
                    result.push({ title, url: 'https://www.anime-planet.com' + url, thumb })
                })

                console.log(result)
            })
    })
}

manga('Naruto')