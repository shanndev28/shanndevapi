const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const FormData = require('form-data')

// ========== [ SEARCHER ] ========== \\
const stickerpack = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://getstickerpack.com/stickers?query=' + query)
            .then(async ({ data }) => {
                let source = []
                let $ = cheerio.load(data)

                $('div.sticker-pack-cols').each((a, b) => {
                    source.push($(b).find('a').attr('href'))
                })

                await axios.get(source[Math.floor(Math.random() * source.length)])
                    .then(({ data }) => {
                        let url = []
                        $ = cheerio.load(data)

                        $('div.sticker-pack-cols').each((a, b) => {
                            url.push($(b).find('img').attr('src'))
                        })

                        let json = (url.length) ? { status: true, creator: '@shanndev28', result: url } : { status: false, creator: '@shanndev28' }
                        return resolve(json)
                    })
                    .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const pinterest = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios({ method: 'get', url: 'https://id.pinterest.com/search/pins/?autologin=true&q=' + query, headers: { "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0" } })
            .then(({ data }) => {
                let result = []
                let $ = cheerio.load(data)

                $('div > a').get().map(b => {
                    let url = $(b).find('img').attr('src')
                    if (url === undefined || url === 'https://i.pinimg.com/75x75_RS/9e/83/41/9e834154eda275f4d5d56ecde2cbf1ca.jpg') return

                    result.push(url.replace(/236/g, '736'))
                })

                let json = result.length ? { status: true, creator: '@shanndev28', result } : { status: false, creator: '@shanndev28' }
                return resolve(json)
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const wikimedia = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://commons.wikimedia.org/w/index.php?search=' + query + '&title=Special:MediaSearch&go=Go&type=image')
            .then(({ data }) => {
                let result = []
                let $ = cheerio.load(data)

                $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
                    let url = $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                    result.push(url)
                })

                let json = (result.length) ? { status: true, creator: '@shanndev28', result } : { status: false, creator: '@shanndev28' }
                return resolve(json)
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const dafont = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://www.dafont.com/search.php?q=' + query)
            .then(({ data }) => {
                let result = []
                let $ = cheerio.load(data)

                $('.dlbox').get().map(b => {
                    let url = $(b).find('a').attr('href')
                    result.push('https:' + url)
                })

                let json = (result.length) ? { status: true, creator: '@shanndev28', result } : { status: false, creator: '@shanndev28' }
                return resolve(json)
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const wikipedia = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://id.wikipedia.org/wiki/' + query)
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let artikel = $('div.mw-parser-output > p').text()
                let image = 'https:' + ($('.infobox-image > span > a > img').attr('src') || $('.mw-file-description > img').attr('src'))

                if (!image || !artikel) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { image, artikel } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

// ========== [ RANDOM TEXT ] ========== \\
const quotes = async () => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://api.quotable.io/random')
            .then(({ data }) => {
                if (!data || !data.content) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { name: data.author, quote: data.content } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const quotesNime = async () => {
    return new Promise(async (resolve, reject) => {
        let page = Math.floor(Math.random() * 189)
        await axios.get('https://otakotaku.com/quote/feed/' + page)
            .then(({ data }) => {
                let result = []
                let $ = cheerio.load(data)

                $('div.kotodama-list').each((a, b) => {
                    result.push({ name: $(b).find('div.char-name').text().trim(), quote: $(b).find('div.quote').text().trim() })
                })

                let quote = result[Math.floor(Math.random() * result.length)]
                let json = (result.length) ? { status: true, creator: '@shanndev28', result: quote } : { status: false, creator: '@shanndev28' }
                return resolve(json)
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

// ========== [ CONVERTER ] ========== \\
const ssWeb = async ({ width, height, url }) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://webscreenshot.vercel.app/api', { format: 'jpeg', full: false, isTweet: false, scale: 1, width, height, url })
            .then(({ data }) => {
                if (!data || !data.image) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: data.image })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const removeBg = async (image) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://backend.zyro.com/v1/ai/remove-background', { image })
            .then(({ data }) => {
                if (!data || !data.result) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: data.result })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const upscale = async (image) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://upscaler.zyro.com/v1/ai/image-upscaler', { image_data: image })
            .then(({ data }) => {
                if (!data || !data.upscaled) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: data.upscaled })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

// ========== [ DOWNLOADER ] ========== \\
const youtubeDL = async (url) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://video-downloader.optizord.com/wp-json/aio-dl/video-data/', { url, token: 'f46b50094b28d24a8dbb563979b2326e021017d334b972393b10d06c2e1f9344' })
            .then(({ data }) => {
                let result = {}
                if (!data) return resolve({ status: false, creator: '@shanndev28' })

                data.medias.forEach(v => {
                    if (!v || (v.extension !== 'mp4' && !v.audioAvailable)) return
                    result = { quality: v.quality, url: v.url }
                })

                let json = (result) ? { status: true, creator: '@shanndev28', result } : { status: false, creator: '@shanndev28' }
                return resolve(json)
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const tiktokDL = async (url) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://tikmate.cc/analyze?url=' + url)
            .then(({ data }) => {
                if (!data || data.error) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { creator: data.formats.creator, title: data.formats.title, thumbnail: data.formats.thumbnail, video: data.formats.video, audio: data.formats.audio } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const soundcloud = async (url) => {
    return new Promise(async (resolve, reject) => {
        let getToken = await axios.get('https://soundcloudmp3.org/id')
        let $t = cheerio.load(getToken.data)

        let token = $t('form#conversionForm > input[type=hidden]').attr('value')
        if (!token) return resolve({ status: false, creator: '@shanndev28' })

        await axios.post('https://soundcloudmp3.org/converter', { _token: token, url }, { headers: { "content-type": "application/x-www-form-urlencoded;", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36", "Cookie": getToken['headers']['set-cookie'] } })
            .then(({ data }) => {
                let $u = cheerio.load(data)
                let url = $u('#download-btn').attr('href')

                if (!url) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: url })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })

    })
}

const mediafire = async (url) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(url)
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let filetype = $('.filetype').text()
                let url = $('#downloadButton').attr('href')
                let filename = $('.dl-btn-label').attr('title')
                let filesize = $('ul.details > li:nth-child(1) > span').text()
                let uploaded = $('ul.details > li:nth-child(2) > span').text()

                if (!url) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { filesize, filetype, uploaded, filename, url } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const instaDL = async (url) => {
    return new Promise(async (resolve, reject) => {
        let formdata = new URLSearchParams({ url, via: 'form' })
        await fetch('https://snapinsta.world/api/instagram', { method: 'POST', body: formdata })
            .then(async (result) => {
                let json = await result.json()

                if (!json.success) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: json.data.medias })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const y2mate = async (url) => {
    return new Promise(async (resolve, reject) => {
        let formdata = { k_query: url, q_auto: 0, ajax: 1, k_page: 'instagram' }
        await fetch('https://www.y2mate.com/mates/analyzeV2/ajax', { method: 'POST', headers: { accept: "*/*", 'accept-language': "en-US,en;q=0.9", 'content-type': "application/x-www-form-urlencoded; charset=UTF-8" }, body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&') })
            .then(async (result) => {
                let json = await result.json()

                if (json.status !== 'ok') return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { title: json.title, thumbnail: json.thumbnail, video: json.links.video } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const facebook = async (url) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://getmyfb.com/process', { id: url, locale: 'en' })
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let img = $('.results-item-image').attr('src')
                let url = $('ul.results-list > li:nth-child(1) > a').attr('href')

                if (!url) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: { img, url } })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

// ========== [ ARTIFICIAL INTELLIGENCE ] ========== \\
const aiSlogan = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('https://backend.zyro.com/v1/ai/slogans', { keyword })
            .then(({ data }) => {
                if (!data || !data.slogans) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: data.slogans })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

const aiName = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        let keywords = keyword.split(',')
        await axios.post('https://backend.zyro.com/v1/ai/names', { keywords })
            .then(({ data }) => {
                if (!data || !data.names) return resolve({ status: false, creator: '@shanndev28' })
                return resolve({ status: true, creator: '@shanndev28', result: data.names })
            })
            .catch(() => { return resolve({ status: false, creator: '@shanndev28' }) })
    })
}

module.exports = { stickerpack, pinterest, wikimedia, dafont, wikipedia, quotes, quotesNime, ssWeb, removeBg, upscale, youtubeDL, tiktokDL, soundcloud, mediafire, instaDL, y2mate, facebook, aiSlogan, aiName }